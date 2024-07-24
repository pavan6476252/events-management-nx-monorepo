import { AddressEntity } from "@events/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto
  ): Promise<AddressEntity> {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  async updateAddress(
    id: string,
    updateAddressDto: UpdateAddressDto
  ): Promise<AddressEntity> {
    await this.addressRepository.update(id, updateAddressDto);
    return this.addressRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<AddressEntity[]> {
    return this.addressRepository.find({ relations: ["user"] });
  }

  async findOne(id: string): Promise<AddressEntity> {
    return this.addressRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async remove(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
