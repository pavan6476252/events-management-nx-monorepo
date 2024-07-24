import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { AuthEntity } from "@events/shared";
import { UserEntity } from "@events/shared";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/register-user.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RefreshTokenResponseDto } from "./dto/refresh-tokens-response.dto";
import { JWTPayload } from "@events/shared";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}
  async getAuthEntities() {
    const x = await this.authRepository.find({ relations: ["user"] });
    console.log(x);
    return x;
  }
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password, ...rest } = registerUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    return await this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const { email, password, device, details } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "1d" });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

    let authEntry = await this.authRepository.findOne({
      where: {
        user,
        device,
      },
    });

    if (authEntry) {
      authEntry.refreshToken = refreshToken;
      authEntry.details = details;
    } else {
      authEntry = this.authRepository.create({
        ...loginUserDto,
        user,
        refreshToken,
        device,
        details,
      });
    }

    await this.authRepository.save(authEntry);

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    const payload = await this.jwtService.decode(refreshToken);

    await this.authRepository.delete({
      user: { id: payload.userId },
      refreshToken,
    });
  }
  async logoutFromAllExceptCurrent(refreshToken: string): Promise<void> {
    const payload: any = this.jwtService.decode(refreshToken);
    await this.authRepository.delete({
      user: { id: payload.userId },
      refreshToken: Not(refreshToken),
    });
  }
  async logoutFromAll(refreshToken: string): Promise<void> {
    const payload: any = this.jwtService.decode(refreshToken);
    await this.authRepository.delete({
      user: { id: payload.userId },
    });
  }

  async refreshTokens(refreshToken: string): Promise<RefreshTokenResponseDto> {
    const authEntry = await this.authRepository.findOne({
      where: { refreshToken },
      relations: ["user"],
    });
    if (!authEntry) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    const payload = {
      userId: authEntry.user.id,
      email: authEntry.user.email,
      role: authEntry.user.role,
    };
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: "15m" });
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

    authEntry.refreshToken = newRefreshToken;

    await this.authRepository.save(authEntry);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async createAuthEntry(createAuthDto: CreateAuthDto): Promise<AuthEntity> {
    const { userId, ...rest } = createAuthDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const authEntry = this.authRepository.create({
      user,
      ...rest,
    });

    return await this.authRepository.save(authEntry);
  }

  async updateAuthEntry(
    id: string,
    updateAuthDto: UpdateAuthDto
  ): Promise<AuthEntity> {
    const authEntry = await this.authRepository.findOne({ where: { id } });
    if (!authEntry) {
      throw new Error("Auth entry not found");
    }

    Object.assign(authEntry, updateAuthDto);
    return await this.authRepository.save(authEntry);
  }
}
