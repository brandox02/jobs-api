import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateApplicationInput {
  id: number;
  userId: number;
  jobId: number;
  statusId: number;
}
