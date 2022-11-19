import { CreateGeneralParameterInput } from './create-general-parameter.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGeneralParameterInput extends PartialType(
  CreateGeneralParameterInput,
) {
  id: number;
  name?: string;
  value?: string;
  description?: string;
}
