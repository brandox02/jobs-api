import { ObjectType } from '@nestjs/graphql';
import { Paginate } from 'src/common/paginate-types';
import { PaginatedMetadata } from 'src/modules/user/dto/index.output';
import { Application } from '../entities/application.entity';

@ObjectType()
export class PaginatedApplication implements Paginate<Application> {
  items: Application[];
  metadata: PaginatedMetadata;
}
