import { InputType } from '@nestjs/graphql';

@InputType()
export class ApplicationWhereInput {
  id?: number;
  userId?: number;
  createdUserId?: number;
  jobId?: number;
}
