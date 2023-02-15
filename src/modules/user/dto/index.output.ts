import { ObjectType } from '@nestjs/graphql';
import { Paginate, PaginatedMetadata } from '../../../common/paginate-types';
import { User } from '../entities/user.entity';

@ObjectType()
export class GetUserInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  imageUrl?: string;
}

@ObjectType()
export class PaginatedUser implements Paginate<User> {
  items: User[];
  // metadata: PaginatedMetadata;
}

@ObjectType()
export class UpdateUser {
  accessToken: string;
  user: User;
}
