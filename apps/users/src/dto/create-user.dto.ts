import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { EUserRoles } from "@events/shared";


@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
  @Field(type => EUserRoles)
  @IsEnum(EUserRoles, { message: 'Role must be either USER or ADMIN' })
  role: EUserRoles;
}
