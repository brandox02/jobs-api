import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Entity } from 'typeorm';

@Entity({ name: 'test' })
@ObjectType()
export class Job extends BaseEntity {}
