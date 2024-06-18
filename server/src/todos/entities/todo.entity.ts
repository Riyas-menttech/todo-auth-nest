import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "todooose" })
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id?: number;
  @Column()
  @Field()
  title: string;
}
