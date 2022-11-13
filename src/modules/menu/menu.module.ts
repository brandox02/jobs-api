import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuResolver, MenuService, UtilsProvider],
})
export class MenuModule {}
