import { Resolver } from '@nestjs/graphql';
// import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Resolver(() => Role)
export class RoleResolver {}
