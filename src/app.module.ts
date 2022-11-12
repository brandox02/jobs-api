import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { RoleModule } from './modules/role/role.module';
import { DepartmentModule } from './modules/department/department.module';
import { RequestModule } from './modules/request/request.module';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { OrderModule } from './modules/order/order.module';
import { ClaimModule } from './modules/claim/claim.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphqlModule,
    DatabaseModule,
    RoleModule,
    CompanyModule,
    DepartmentModule,
    UserModule,
    RequestModule,
    GraphqlModule,
    OrderModule,
    ClaimModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
