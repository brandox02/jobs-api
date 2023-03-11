import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Requirement {
  id: string;
  name: string;
}
