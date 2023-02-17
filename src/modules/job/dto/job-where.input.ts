import { InputType } from '@nestjs/graphql';

@InputType()
export class JobWhereInput {
  id?: number;
  createdUserId?: number;
}
