import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CompanyProfile } from './entities/company-profile.entity';
import { Application } from '../application/entities/application.entity';
import { CandidateProfile } from './entities/candidate-profile.entity';
import { Gender } from 'src/entities/Gender.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CompanyProfile, Application, CandidateProfile, Gender]),
    forwardRef(() => AuthModule),
    CloudinaryModule,
  ],
  providers: [UserService, UtilsProvider, UserResolver],
  exports: [UserService],
})
export class UserModule { }
