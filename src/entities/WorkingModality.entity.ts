import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('working_modalities')
@ObjectType()
export class WorkingModality extends BaseEntity {
  @Column()
  name: string;
}
