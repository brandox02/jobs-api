import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('application_status')
@ObjectType()
export class ApplicationStatus extends BaseEntity {
  @Column()
  name: string;
}
