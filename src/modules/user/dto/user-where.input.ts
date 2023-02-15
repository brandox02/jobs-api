import { InputType } from '@nestjs/graphql';

@InputType()
export class UserWhereInput {
  id?: number;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
}
