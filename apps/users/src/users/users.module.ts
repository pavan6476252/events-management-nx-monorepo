import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { UserResolver } from "./user.resolver";
import { AddressEntity, AuthProviderEntity, UserEntity } from "@events/shared";
import { AddressResolver } from "./address.resolver";
import { AddressService } from "./address.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity, AuthProviderEntity]),
    
  ],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, AddressService, AddressResolver],
  exports: [UsersService, AddressService],
})
export class UsersModule {}
