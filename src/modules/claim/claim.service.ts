import { Injectable } from '@nestjs/common';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateClaimInput } from './dto/create-claim.input';
import { WhereClaimInput } from './dto/where-claim.input';
import { Claim } from './entities/claim.entity';
import * as dayjs from 'dayjs';
import { omit } from 'lodash';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { Paginate } from '../order/order.service';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UpdateClaimInput } from './dto/update-claim.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClaimService {
  private readonly relations: string[] = [
    'order',
    'order.user',
    'order.user.department',
  ];
  constructor(
    @InjectRepository(Claim) private readonly repo: Repository<Claim>,
    private readonly utils: UtilsProvider,
  ) {}
  async create(input: CreateClaimInput): Promise<Claim> {
    const claim = await this.repo.save(this.repo.create(input));
    return claim;
  }

  async findAll(where: WhereClaimInput = {}): Promise<Claim[]> {
    let copyWhere: any = { ...where };

    const serverMinutesDiff = new Date().getTimezoneOffset();
    if (copyWhere?.fromDate && copyWhere?.toDate) {
      copyWhere.fromDate = dayjs(copyWhere.fromDate)
        .subtract(serverMinutesDiff, 'minutes')
        .toDate();
      copyWhere.toDate = dayjs(copyWhere.toDate)
        .add(serverMinutesDiff, 'minutes')
        .add(1, 'day')
        .toDate();

      copyWhere[
        copyWhere?.filterDateByDelivered ? 'deliverDate' : 'createdAt'
      ] = Between(copyWhere.fromDate, copyWhere.toDate);

      copyWhere = omit(copyWhere, [
        'fromDate',
        'toDate',
        'filterDateByDelivered',
      ]);

      delete copyWhere.filterDateByDelivered;
    }

    const items = await this.repo.find({
      where: this.utils.removeNullFields(copyWhere),
      relations: this.relations,
      order: { createdAt: 'DESC' },
    });

    return items;
  }

  async find({
    page,
    perPage,
    where,
    order,
  }: FindAllInput<WhereClaimInput>): Promise<Paginate<Claim>> {
    let copyWhere: any = { ...where };
    const serverMinutesDiff = new Date().getTimezoneOffset();

    if (copyWhere?.fromDate && copyWhere?.toDate) {
      copyWhere.fromDate = dayjs(copyWhere.fromDate)
        .subtract(serverMinutesDiff, 'minutes')
        .toDate();
      copyWhere.toDate = dayjs(copyWhere.toDate)
        .add(serverMinutesDiff, 'minutes')
        .add(1, 'day')
        .toDate();
      if (copyWhere?.filterDateByClaimDate) {
        copyWhere['createdAt'] = Between(copyWhere.fromDate, copyWhere.toDate);
      } else {
        copyWhere.order = {};
        copyWhere.order.createdAt = Between(
          copyWhere.fromDate,
          copyWhere.toDate,
        );
      }

      copyWhere = omit(copyWhere, [
        'fromDate',
        'toDate',
        'filterDateByClaimDate',
      ]);
    }

    if (copyWhere?.name) {
      copyWhere.user = {};
      copyWhere.user.firstnama = copyWhere.order = {};
    }

    if ('noOrder' in copyWhere) {
      if ('order' in copyWhere) {
        copyWhere.order.noOrder = ILike(`%${copyWhere.noOrder}%`);
      } else {
        copyWhere.order = {};
        copyWhere.order.noOrder = ILike(`%${copyWhere.noOrder}%`);
      }
      delete copyWhere.noOrder;
    }

    const totalItems = await this.repo.count({
      where: this.utils.removeNullFields(copyWhere),
    });

    // const items = await this.repo
    //   .createQueryBuilder()
    //   .where(...this.utils.buildWhere('claim', copyWhere, []))
    //   .skip(perPage * page)
    //   .take(perPage)
    //   .addOrderBy('id', 'DESC')
    //   .getMany();

    return {
      items: await this.repo.find({
        where: this.utils.removeNullFields(copyWhere),
        skip: perPage * page,
        take: perPage,
        relations: this.relations,
        order,
      }),
      metadata: {
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
      },
    };
  }

  async findOne(where: FindOptionsWhere<Claim>): Promise<Claim> {
    const withoutNull = this.utils.removeNullFields(where);
    if (!where || Object.keys(withoutNull).length == 0) {
      throw NotFoundException('Claim');
    }

    const item = await this.repo.findOne({
      where: withoutNull,
      relations: this.relations,
    });

    if (!item) {
      throw NotFoundException('Claim');
    }
    return item;
  }

  async update(input: UpdateClaimInput): Promise<Claim> {
    await this.repo.save(this.repo.create(input), { transaction: true });
    return this.findOne({ id: input.id });
  }
}
