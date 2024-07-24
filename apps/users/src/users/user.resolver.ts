import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserEntity } from "@events/shared";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserEntity])
  getUsers() {
    return this.usersService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async getUser(@Request() req) {
    const { userId } = req.user;
    return this.usersService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @Request() req,
    @Args("updateUserDto") updateUserDto: UpdateUserDto
  ) {
    const { userId } = req.user;
    return this.usersService.updateUser(userId, updateUserDto);
  }

  // @Mutation(() => UserEntity)
  // createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Mutation(() => Boolean)
  // removeUser(@Args('id', { type: () => ID }) id: string) {
  //   this.usersService.remove(id);
  //   return true;
  // }
}
