import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';
import { CreateAddressDto } from './create-address.dto';

@InputType()
export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @Field ()
    recipientName: string;
  
    @Field()
    houseNoAndStreetName: string;
  
    @Field()
    locality: string;
  
    @Field()
    townOrCity: string;
  
    @Field()
    state: string;
  
    @Field()
    pinCode: string;
}
