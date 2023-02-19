import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { User } from '../user/entities/user.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { ApplicationService } from './application.service';
import { ApplicationResolver } from './application.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Application, User])],
  providers: [ApplicationResolver, ApplicationService, UtilsProvider],
})
export class ApplicationModule {}
