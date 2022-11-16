import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('general_parameters')
export class GeneralParameter extends BaseEntity {
  @Column()
  name: string;
  @Column()
  value: string;
  @Column({ nullable: true })
  description: string;
}
