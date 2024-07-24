import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthDto } from "./create-auth.dto";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @Field()
  refreshToken?: string;
}
