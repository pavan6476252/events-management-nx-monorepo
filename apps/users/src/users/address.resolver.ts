import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { AddressService } from "./address.service"; 
import { AddressEntity } from "@events/shared";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";

@Resolver(() => AddressEntity)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => [AddressEntity])
  getAllAddresses() {
    return this.addressService.findAll();
  }

  @Query(() => AddressEntity)
  getAddress(@Args('id', { type: () => ID }) id: string) {
    return this.addressService.findOne(id);
  }

  @Mutation(() => AddressEntity)
  createAddress(@Args('createAddressDto') createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Mutation(() => AddressEntity)
  updateAddress(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateAddressDto') updateAddressDto: UpdateAddressDto
  ) {
    return this.addressService.updateAddress(id, updateAddressDto);
  }

  @Mutation(() => Boolean)
  removeAddress(@Args('id', { type: () => ID }) id: string) {
    this.addressService.remove(id);
    return true;
  }
}
