import { ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
// import { PaginatedMetadata } from '.././../../common/paginate-types';

@ObjectType()
export class GetUserInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  imageUrl?: string;
}

@ObjectType()
export class PaginatedMetadata {
  totalItems: number;
  perPage: number;
  totalPages: number;
}

@ObjectType()
export class PaginatedUser {
  items: User[];
  metadata: PaginatedMetadata;
}

@ObjectType()
export class UpdateUser {
  accessToken: string;
  user: User;
}
