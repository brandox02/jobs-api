import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { User } from '../user/entities/user.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { ApplicationService } from './application.service';
import { ApplicationResolver } from './application.resolver';
import { ApplicationStatus } from 'src/entities/AplicationStatus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, User, ApplicationStatus])],
  providers: [ApplicationResolver, ApplicationService, UtilsProvider],
})
export class ApplicationModule { }
