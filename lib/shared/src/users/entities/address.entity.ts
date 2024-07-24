import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, ID } from "@nestjs/graphql";
import { UserEntity } from "./user.entity";

@ObjectType()
@Entity('address')
export class AddressEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => UserEntity,{nullable:true})
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;

  @Field()
  @Column()
  recipientName: string;

  @Field()
  @Column()
  houseNoAndStreetName: string;

  @Field()
  @Column()
  locality: string;

  @Field()
  @Column()
  townOrCity: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  pinCode: string;
}
