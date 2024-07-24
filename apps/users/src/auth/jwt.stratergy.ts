import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JWTPayload, UserEntity } from "@events/shared";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: "my-scret-key",
//     });
//   }

//   async validate(payload: JWTPayload) {
//     const { userId } = payload;
//     const user = await this.userRepository.findOne({ where: { id: userId } });

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return user;
//   }
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "my-secret-key",
    });
  }

  async validate(payload: any) {
    const { userId } = payload;
    return { userId };
  }
}
