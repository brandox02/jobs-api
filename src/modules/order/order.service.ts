import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import {
  DataSource,
  EntityManager,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderWhereInput } from './dto/order-where.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  private readonly relations = [
    'details',
    'user',
    'user.company',
    'user.department',
    'status',
  ];
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(orderInput: CreateOrderInput): Promise<Order> {
    const orderInputCopy = {
      ...orderInput,
      noOrder: await this.generateNoOrder(orderInput.userId),
      seq: await this.getLastSeq(),
    };

    const order = await this.repo.save(this.repo.create(orderInputCopy));

    return order;
  }

  async findAll(where: FindOptionsWhere<Order> = {}): Promise<Order[]> {
    return await this.repo.find({
      where,
      relations: this.relations,
      order: { createdAt: 'DESC' },
    });
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

  async find({
    page,
    perPage,
    where,
    order,
  }: FindAllInput<OrderWhereInput>): Promise<Order[]> {
    return this.repo.find({
      where: this.utils.removeNullFields(where),
      skip: perPage * page,
      take: perPage,
      relations: this.relations,
      order,
    });
  }

  async update(orderInput: UpdateOrderInput): Promise<Order> {
    setTimeout(() => {
      console.log('klk bro');
    }, 5000);

    await this.dataSource.transaction(async (txn: EntityManager) => {
      const repo = txn.getRepository(Order);
      await repo.save(this.repo.create(orderInput), { transaction: true });
    });
    return this.findOne({ id: orderInput.id });
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
