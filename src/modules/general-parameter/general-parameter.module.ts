import { Module } from '@nestjs/common';
import { GeneralParameterService } from './general-parameter.service';
import { GeneralParameterResolver } from './general-parameter.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralParameter } from './entities/general-parameter.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';

@Module({
  providers: [GeneralParameterResolver, GeneralParameterService, UtilsProvider],
  imports: [TypeOrmModule.forFeature([GeneralParameter])],
})
export class GeneralParameterModule {}
