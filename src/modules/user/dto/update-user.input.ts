import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  id: number;
  email?: string;
  // password?: string;
  firstname?: string;
  lastname?: string;
  image?: string;
  imageUrl?: string;
}
