import { EUserRoles, UserEntity } from "@events/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { role, ...rest } = createUserDto;
    const user = this.userRepository.create({
      ...rest,
      role: role ? EUserRoles[role] : EUserRoles.User,
    } as DeepPartial<UserEntity>);
    await this.userRepository.save(user);
    return user;
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { role, ...rest } = updateUserDto;
    const user = await this.userRepository.preload({
      id,
      ...rest,
      role: role ? EUserRoles[role] : undefined,
    } as DeepPartial<UserEntity>);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return this.userRepository.save(user);
  }
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ["addresses", "authProviders","authEntities"],
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
      relations: ["addresses", "authProviders","authEntities"],
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
