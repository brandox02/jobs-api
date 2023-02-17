import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('languages')
@ObjectType()
export class Language extends BaseEntity {
  @Column()
  name: string;
}
