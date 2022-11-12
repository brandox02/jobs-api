import { FindOptionsWhere } from 'typeorm';

export type FindAllInput<T> = {
  skip: number;
  where: FindOptionsWhere<T>;
  take: 12;
};
