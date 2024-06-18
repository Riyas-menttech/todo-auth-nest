import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "todoclient" })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  Email: string;

  @Column()
  @Field()
  Password: string;

  @Field()
  message: string;

  @Field()
  status: number;

  @Field()
  token?: string;
}
