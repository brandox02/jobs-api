import { FindOptionsOrder } from 'typeorm';

export type FindAllInput<T> = {
  page: number;
  where: T;
  perPage: number;
  order: FindOptionsOrder<T>;
  context?: any;
};
