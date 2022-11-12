import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';
import GraphQLJSON from 'graphql-type-json';

@Entity('menu')
@ObjectType()
export class Menu extends BaseEntity {
  @Column()
  name: string;

  @Column({ precision: 10, scale: 2, type: 'decimal', name: 'day_dish_price' })
  dayDishPrice: number;

  @Column({ type: 'jsonb' })
  @Field(() => GraphQLJSON)
  json: typeof GraphQLJSON;
}
