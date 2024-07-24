import { UserEntity } from "@events/shared";
import { Field, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity("auth")
export class AuthEntity extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.authEntities, {
    eager: true,
    onDelete: "CASCADE",
  })
  user: UserEntity;

  @Field()
  @Column()
  refreshToken: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  device: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  details: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ipAddress: string;

  // @Field({ nullable: true })
  // @Column({ nullable: true })
  // userAgent: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // @Field()
  // @Column()
  // expirationDate: Date;
}
