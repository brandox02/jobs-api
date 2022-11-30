import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateClaimInput {
  description: string;
  name: string;
  orderId: number;
}
