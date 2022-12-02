import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  Float,
} from '@nestjs/graphql';
import { OrderService, Paginate } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderWhereInput } from './dto/order-where.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { PaginatedOrder } from './dto/paginated-order.output';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  @Mutation(() => Boolean)
  async markAsDeliveredToday(): Promise<boolean> {
    return this.orderService.markAsDeliveredToday();
  }

  @Query(() => [Order])
  async orderList(
    @Args('where', { defaultValue: {} }) where: OrderWhereInput,
    @Context() context: any,
  ): Promise<Order[]> {
    return this.orderService.findAll(where, context);
  }

  @Query(() => Order)
  async order(@Args('where') where: OrderWhereInput): Promise<Order> {
    return this.orderService.findOne(where);
  }

  @Query(() => PaginatedOrder)
  async orders(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: OrderWhereInput,
    @Context() context: any,
  ): Promise<Paginate<Order>> {
    return this.orderService.find({
      context,
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

  @Query(() => Float)
  async moneyAccumulatedMonthCompany(@Context() context: any): Promise<number> {
    return this.orderService.moneyAccumulatedMonthCompany(
      context.req.user.company.id,
    );
  }
}
