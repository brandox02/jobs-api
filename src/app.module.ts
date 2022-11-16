import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { AuthModule } from './modules/auth/auth.module';
import { GeneralParameterModule } from './modules/general-parameter/general-parameter.module';
import { DataSource, Repository } from 'typeorm';
import { Order } from './modules/order/entities/order.entity';
import dayjs from 'dayjs';
import { GeneralParameter } from './modules/general-parameter/entities/general-parameter.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    RoleModule,
    CompanyModule,
    DepartmentModule,
    UserModule,
    RequestModule,
    OrderModule,
    ClaimModule,
    MenuModule,
    GeneralParameterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(c: DataSource) {
    // async function execute() {
    //   const result = await c
    //     .getRepository(GeneralParameter)
    //     .findOne({ where: { id: 1 } });

    //   // const sqlQuery = `update orders set status_id = 3 where now() > created_at + interval '${result.value} minute' and status_id = 2;`;
    //   // await c.query(sqlQuery);
    //   const resultQuery = await c.query(
    //     `select * from orders where now() > created_at + interval '${result.value} minute' and status_id = 2`,
    //   );
    // }
    // this is for fix the delay time of posgresql
    const driver = c.driver as any;
    driver.postgres.defaults.parseInputDatesAsUTC = true;
    driver.postgres.types.setTypeParser(
      1114,
      (str: any) => new Date(str + 'Z'),
    );

    // execute();

    // const orderRepo: Repository<Order> = driver.getRepository(Order);

    // orderRepo.find({where: { statusId: 2 }})
    //   .then(result => {
    //     result.forEach((order) => {
    //       const  minutesToWaitToConfirmOrder  = 1;
    //       const r = dayjs(order.createdAt).add(minutesToWaitToConfirmOrder, 'minutes');

    //       console.log("tu quieres que te hable mal");
    //     })
    //   });
  }
}
