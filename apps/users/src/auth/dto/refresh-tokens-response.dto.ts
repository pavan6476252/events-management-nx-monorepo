import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RefreshTokenResponseDto {
  @Field()
  refreshToken: string;
  @Field()
  accessToken: string;
}
