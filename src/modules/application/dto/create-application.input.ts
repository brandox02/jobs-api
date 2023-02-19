import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateApplicationInput {
  userId: number;
  jobId: number;
}
