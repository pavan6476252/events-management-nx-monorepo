import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";
import {
  AddressEntity,
  allowedUserRolesResolver,
  AuthProviderEntity,
  UserEntity,
} from "@events/shared";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: "admin",
      password: "root",
      database: "events_db",
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        // path: "../graphql/",
        federation: 2,
      },
      buildSchemaOptions: {
        // orphanedTypes: [UserEntity, AddressEntity, AuthProviderEntity],
      },
      resolvers: {
        EUserRoles: allowedUserRolesResolver,
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
