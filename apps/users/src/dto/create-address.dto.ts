import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  recipientName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  houseNoAndStreetName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  locality: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  townOrCity: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  state: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  pinCode: string;
}
