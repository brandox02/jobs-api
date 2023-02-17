import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('aplication_status')
@ObjectType()
export class AplicationStatus extends BaseEntity {
  @Column()
  name: string;
}
