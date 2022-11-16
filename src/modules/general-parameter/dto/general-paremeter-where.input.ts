import { InputType } from '@nestjs/graphql';

@InputType()
export class GeneralParameterWhereInput {
  id?: number;
}
