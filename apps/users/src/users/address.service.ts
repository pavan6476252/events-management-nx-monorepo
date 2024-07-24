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
    userId: string,
    createAddressDto: CreateAddressDto
  ): Promise<AddressEntity> {
    const address = this.addressRepository.create({
      user: { id: userId },
      ...createAddressDto,
    });
    return this.addressRepository.save(address);
  }

  async updateAddress(
    userId: string,
    id: string,
    updateAddressDto: UpdateAddressDto
  ): Promise<AddressEntity> {
    await this.addressRepository.update(
      { id, user: { id: userId } },
      updateAddressDto
    );
    return this.addressRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<AddressEntity[]> {
    return this.addressRepository.find({ relations: ["user"] });
  }
  async findAllByUser(userId: string): Promise<AddressEntity[]> {
    return this.addressRepository.findBy({
      user: { id: userId },
    });
  }

  async findOneByUser(userId: string, id: string): Promise<AddressEntity> {
    return this.addressRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ["user"],
    });
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.addressRepository.delete({ id, user: { id: userId } });
  }
}
