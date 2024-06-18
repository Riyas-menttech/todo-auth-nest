import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateTodoInput {
  @Field({ nullable: true })
  id?: number;
  @Field()
  title: string;
}
