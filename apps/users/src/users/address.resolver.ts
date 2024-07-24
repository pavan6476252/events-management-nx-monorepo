import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { AddressService } from "./address.service";
import { AddressEntity } from "@events/shared";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";
import { Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Resolver(() => AddressEntity)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => [AddressEntity])
  getAllAddresses() {
    return this.addressService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AddressEntity])
  async getUserAddresses(@Request() req) {
    const { userId } = req.user;
    return this.addressService.findAllByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => AddressEntity)
  async getUserAddress(@Request() req, @Args("id") id: string) {
    const { userId } = req.user;
    return this.addressService.findOneByUser(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AddressEntity)
  createAddress(
    @Request() req,
    @Args("createAddressDto") createAddressDto: CreateAddressDto
  ) {
    const { userId } = req.user;
    return this.addressService.createAddress(userId, createAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AddressEntity)
  updateAddress(
    @Request() req,
    @Args("id", { type: () => ID }) id: string,
    @Args("updateAddressDto") updateAddressDto: UpdateAddressDto
  ) {
    const { userId } = req.user;
    return this.addressService.updateAddress(userId, id, updateAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  removeAddress(@Request() req, @Args("id", { type: () => ID }) id: string) {
    const { userId } = req.user;
    this.addressService.remove(userId, id);
    return true;
  }
}
