import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  Float,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderWhereInput } from './dto/order-where.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order])
  async orderList(
    @Args('where', { defaultValue: {} }) where: OrderWhereInput,
  ): Promise<Order[]> {
    return this.orderService.findAll(where);
  }

  @Query(() => Order)
  async order(@Args('where') where: OrderWhereInput): Promise<Order> {
    return this.orderService.findOne(where);
  }

  @Query(() => [Order])
  async orders(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: OrderWhereInput,
  ): Promise<Order[]> {
    return this.orderService.find({
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('input') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.update(updateOrderInput);
  }

  @Query(() => Float)
  async moneyAccumulatedMonth(@Context() context: any): Promise<number> {
    return this.orderService.moneyAccumulatedMonth(context.req.user.id);
  }
}
