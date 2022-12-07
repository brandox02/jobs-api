import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // const isProd = configService.get('NODE_ENV') === 'PROD';
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          database: configService.get('DB_DATABASE'),
          password: configService.get('DB_PASSWORD'),
          username: configService.get('DB_USERNAME'),
          port: +configService.get('DB_PORT'),
          synchronize: true,
          autoLoadEntities: true,
          entities: ['dist/**/**.entity{.ts,.js}'],
          ...(configService.get('DB_LOGGING') === 'true'
            ? { logging: true }
            : {}),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
