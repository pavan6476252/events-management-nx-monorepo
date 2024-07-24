import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType, ID } from "@nestjs/graphql";
import { UserEntity } from "./user.entity";

@ObjectType()
@Entity('authprovider')
export class AuthProviderEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  provider: string;

  @Field()
  @Column()
  providerId: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.authProviders)
  user: UserEntity;
}
