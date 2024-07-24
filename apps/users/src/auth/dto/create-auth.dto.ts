import { UserEntity } from "@events/shared";
import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsOptional, IsNotEmpty, IsDate, IsUUID } from "class-validator";
@InputType()
export class CreateAuthDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @Field()
  @IsString()
  @IsOptional()
  device?: string;

  @Field()
  @IsString()
  @IsOptional()
  details?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @Field()
  @IsString()
  @IsOptional()
  userAgent?: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  expirationDate: Date;
}
