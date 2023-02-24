import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('educations')
@ObjectType()
export class Education extends BaseEntity {
  @Column()
  name: string;
}
