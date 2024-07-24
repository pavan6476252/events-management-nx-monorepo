import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { AddressEntity } from "./address.entity";
import { AuthProviderEntity } from "./authProvider.entity";
import { AuthEntity } from "../../auth/entities/auth.entity";

export enum EUserRoles {
  Admin= "Admin",
  User= "User",
}

registerEnumType(EUserRoles, {
  name: "EUserRoles",
});

export const allowedUserRolesResolver: Record<
  keyof typeof EUserRoles,
  string
> = {
  Admin: "Admin",
  User: "User",
};

@ObjectType()
@Entity("user")
export class UserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field()
  @Column({ default: false })
  isVerified: boolean;

  @Field(() => EUserRoles)
  @Column({type:'enum', enum: EUserRoles, default: EUserRoles.User })
  role: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [AddressEntity], { nullable: true })
  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @Field(() => [AuthProviderEntity], { nullable: true })
  @OneToMany(
    () => AuthProviderEntity,
    (authProviderEntity) => authProviderEntity.user
  )
  authProviders: AuthProviderEntity[];

  @Field(() => [AuthEntity], { nullable: true })
  @OneToMany(
    () => AuthEntity,
    (authEntity) => authEntity.user
  )
  authEntities: AuthEntity[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
