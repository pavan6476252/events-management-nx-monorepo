import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthEntity } from "@events/shared";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { UserEntity } from "@events/shared";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RefreshTokenResponseDto } from "./dto/refresh-tokens-response.dto";
import { Query } from "@nestjs/graphql";

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => [AuthEntity])
  getAuthEntities() {
    return this.authService.getAuthEntities();
  }
  @Mutation(() => UserEntity)
  async register(
    @Args("registerUserDto") registerUserDto: RegisterUserDto
  ): Promise<UserEntity> {
    return this.authService.register(registerUserDto);
  }

  @Mutation(() => LoginResponseDto)
  async login(
    @Args("loginUserDto") loginUserDto: LoginUserDto
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginUserDto);
  }

  @Mutation(() => Boolean)
  async logout(@Args("refreshToken") refreshToken: string): Promise<boolean> {
    await this.authService.logout(refreshToken);
    return true;
  }
  @Mutation(() => Boolean)
  async logoutFromAllExceptCurrent(
    @Args("refreshToken") refreshToken: string
  ): Promise<boolean> {
    await this.authService.logoutFromAllExceptCurrent(refreshToken);
    return true;
  }

  @Mutation(() => Boolean)
  async logoutFromAll(
    @Args("refreshToken") refreshToken: string
  ): Promise<boolean> {
    await this.authService.logoutFromAll(refreshToken);
    return true;
  }

  @Mutation(() => RefreshTokenResponseDto)
  async refreshTokens(
    @Args("refreshToken") refreshToken: string
  ): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshTokens(refreshToken);
  }
  @Mutation(() => AuthEntity)
  async updateAuthEntry(
    @Args("id") id: string,
    @Args("updateAuthDto") updateAuthDto: UpdateAuthDto
  ): Promise<AuthEntity> {
    return this.authService.updateAuthEntry(id, updateAuthDto);
  }
}
