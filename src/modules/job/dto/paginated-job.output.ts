import { ObjectType } from '@nestjs/graphql';
import { PaginatedMetadata } from 'src/common/paginate-types';

import { Job } from '../entities/job.entity';
import { Paginate } from '../job.service';

@ObjectType()
export class PaginatedJob implements Paginate<Job> {
  items: Job[];
  metadata: PaginatedMetadata;
}
