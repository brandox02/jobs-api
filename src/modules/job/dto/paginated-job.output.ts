import { ObjectType } from '@nestjs/graphql';
import { Paginate } from 'src/common/paginate-types';
// import { PaginatedMetadata } from 'src/common/paginate-types';
import { PaginatedMetadata } from 'src/modules/user/dto/index.output';

import { Job } from '../entities/job.entity';
// import { Paginate } from '../job.service';

@ObjectType()
export class PaginatedJob implements Paginate<Job> {
  items: Job[];
  metadata: PaginatedMetadata;
}
