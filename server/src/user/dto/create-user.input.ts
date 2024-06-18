import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class CreateUserInput {
  @Field()
  Email: string;

  @Field()
  Password: string;
}
