import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('categories')
@ObjectType()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'classname_icon', nullable: true })
  classnameIcon?: string;

  count?: number;
}
