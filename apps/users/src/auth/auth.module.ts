import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "@events/shared"; 
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UserEntity } from "@events/shared";
import { UsersService } from "../users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.stratergy";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: "my-scret-key",
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  providers: [AuthService, AuthResolver, UsersService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
