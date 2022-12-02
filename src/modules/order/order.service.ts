import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import {
  Between,
  DataSource,
  EntityManager,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { GeneralParameter } from '../general-parameter/entities/general-parameter.entity';
import { User } from '../user/entities/user.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderWhereInput } from './dto/order-where.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { omit } from 'lodash';

export interface Paginate<T> {
  items: T[];
  metadata: {
    totalItems: number;
    perPage: number;
    totalPages: number;
  };
}

@Injectable()
export class OrderService {
  private readonly relations = [
    'details',
    'user',
    'user.company',
    'user.department',
    'status',
    'type',
    'claims',
  ];
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async trigger(order: { id?: number; statusId?: number }) {
    if (order.statusId === 2) {
      const parameter = await this.dataSource
        .getRepository(GeneralParameter)
        .findOne({ where: { id: 1 } });
      const minutes = parseInt(parameter.value);
      const timeInMilliseconds = minutes * 60000;
      await this.repo.update({ id: order.id }, { createdAt: dayjs().toDate() });
      setTimeout(async () => {
        const orderResult = await this.repo.findOne({
          where: { id: order.id },
        });
        // it is for not update if the order was canceled in the timeout process queque
        if (orderResult.statusId === 2) {
          await this.repo.update({ id: order.id }, { statusId: 3 });
        } else {
          console.log(`Order ${order.id} was cancelled`);
        }
      }, timeInMilliseconds);
    }
  }

  async create(orderInput: CreateOrderInput): Promise<Order> {
    const orderInputCopy = {
      ...orderInput,
      noOrder: await this.generateNoOrder(orderInput.userId),
      seq: await this.getLastSeq(),
    };

    const order = await this.repo.save(this.repo.create(orderInputCopy));
    this.trigger(order);
    return order;
  }

  async findAll(where: OrderWhereInput = {}, context: any): Promise<Order[]> {
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

    if ('statusIds' in copyWhere) {
      copyWhere.statusId = In(copyWhere.statusIds);
      delete copyWhere.statusIds;
    }

    if (context.req.user.role.id !== 3) {
      copyWhere.user = {};
      copyWhere.user.companyId = context.req.user.company.id;
    }

    const items = await this.repo.find({
      where: this.utils.removeNullFields(copyWhere),
      relations: this.relations,
      order: { createdAt: 'DESC' },
    });

    return items;
  }

  async find({
    context,
    page,
    perPage,
    where,
    order,
  }: FindAllInput<OrderWhereInput>): Promise<Paginate<Order>> {
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

      // delete copyWhere.filterDateByDelivered;
    }

    if ('statusIds' in copyWhere) {
      copyWhere.statusId = In(copyWhere.statusIds);
      delete copyWhere.statusIds;
    }

    if ('noOrder' in copyWhere) {
      copyWhere.noOrder = ILike(`%${copyWhere.noOrder}%`);
    }

    if (context.req.user.role.id !== 3) {
      copyWhere.user = {};
      copyWhere.user.companyId = context.req.user.company.id;
    }

    const totalItems = await this.repo.count({
      where: this.utils.removeNullFields(copyWhere),
    });

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

  async findOne(where: FindOptionsWhere<Order>): Promise<Order> {
    const withoutNull = this.utils.removeNullFields(where);
    if (!where || Object.keys(withoutNull).length == 0) {
      throw NotFoundException('Order');
    }

    const item = await this.repo.findOne({
      where: withoutNull,
      relations: this.relations,
    });

    if (!item) {
      throw NotFoundException('Order');
    }
    return item;
  }

  async update(orderInput: UpdateOrderInput): Promise<Order> {
    await this.dataSource.transaction(async (txn: EntityManager) => {
      const repo = txn.getRepository(Order);
      await repo.save(this.repo.create(orderInput), { transaction: true });

      this.trigger(orderInput);
    });
    return this.findOne({ id: orderInput.id });
  }

  async moneyAccumulatedMonth(userId: number) {
    const month: number = dayjs().get('month') + 1;
    const orders = await this.repo
      .createQueryBuilder('order')
      .where(
        'extract(month from order.created_at) = :month and order.user_id = :userId and status_id = :statusId',
        { month, userId, statusId: 4 },
      )
      .getMany();
    const sum = orders.reduce(
      (acc, curr) => acc + parseFloat(curr.total.toString()),
      0,
    );

    return sum;
  }

  async moneyAccumulatedMonthCompany(companyId: number) {
    const month: number = dayjs().get('month') + 1;
    // and order.user.company_id = :companyId
    const orders = await this.repo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where(
        'extract(month from order.created_at) = :month and status_id = :statusId and user.company_id = :companyId',
        { month, companyId, statusId: 4 },
      )
      .getMany();
    const sum = orders.reduce(
      (acc, curr) => acc + parseFloat(curr.total.toString()),
      0,
    );

    return sum;
  }

  async markAsDeliveredToday(): Promise<boolean> {
    try {
      const serverMinutesDiff = new Date().getTimezoneOffset();
      const todayDateFrom = dayjs()
        .subtract(serverMinutesDiff, 'minutes')
        .toDate();

      const todayDateTo = dayjs()
        .add(serverMinutesDiff, 'minutes')
        .add(1, 'day')
        .toDate();

      const orders = await this.repo.find({
        where: {
          createdAt: Between(todayDateFrom, todayDateTo),
          statusId: 3,
        },
      });

      const payload = orders.map((order) => ({ id: order.id, statusId: 4 }));
      await this.repo.save(this.repo.create(payload));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async generateNoOrder(userId: number): Promise<string> {
    const year: string = dayjs().get('years').toString().substring(2, 4);
    const seq = await this.getLastSeq();
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { company: true },
    });
    if (!user) {
      throw NotFoundException('User');
    }
    const { acronym } = user.company;

    function generateSeq(size: number, count: number) {
      const breakpoint = size - count.toString().length;
      const result =
        [...Array(breakpoint)].map(() => '0').join('') + count.toString();
      return result;
    }

    return `${acronym}-${generateSeq(5, seq)}-${year}`;
  }

  // return the last seq number
  private async getLastSeq(): Promise<number> {
    const lastItem = await this.repo.find({ order: { seq: 'DESC' } });
    return lastItem.length ? lastItem[0].seq + 1 : 1;
  }
}
