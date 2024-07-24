import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class LoginUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field({ nullable: true })
  @IsString()
  device: string;

  @Field({ nullable: true })
  @IsString()
  details: string;

  @Field({ nullable: true })
  @IsString()
  ipAddress: string;
}
