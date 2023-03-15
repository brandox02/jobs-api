import { InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  email: string;
  oldPassword: string;
  newPassword: string;
  copyNewPassword: string;
}
