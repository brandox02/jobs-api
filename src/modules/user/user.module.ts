import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService, UtilsProvider, UserResolver],
  exports: [UserService],
})
export class UserModule {}
