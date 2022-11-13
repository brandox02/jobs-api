import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  accessToken: string;
}
