import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      inject: [ConfigService],
      driver: ApolloDriver,
      async useFactory(configService: ConfigService) {
        const isProd = configService.get('NODE_ENV') === 'PRODUCTION';
        const plugins = isProd
          ? []
          : [ApolloServerPluginLandingPageLocalDefault];

        return {
          autoSchemaFile: true,
          playground: false,
          plugins,
        };
      },
    }),
  ],
})
export class GraphqlModule {}
