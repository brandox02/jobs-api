import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateClaimInput {
  id?: number;
  description?: string;
  name?: string;
  orderId?: number;
  done?: boolean;
}
