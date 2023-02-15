import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class LoginOutput {
  accessToken: string;
  user: User;
}
