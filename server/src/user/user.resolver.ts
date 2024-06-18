/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { Req } from "@nestjs/common";
// import { UpdateUserInput } from './dto/update-user.input';
const jwt = require("jsonwebtoken");

const secret = "MyScret";
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async SignupUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    try {
      const { user, message, status }: any =
        await this.userService.create(createUserInput);
      if (user) {
        const { Email, Password }: User = user;

        return { Email, Password, message, status };
      }
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => User)
  async LoginUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    const { user, message, status, token }: any =
      await this.userService.loginUser(createUserInput);
    if (user) {
      const { Email, Password }: User = user;
      return { Email, Password, message, status, token };
    }
  }

  @Query(() => [User])
  async getUsers(@Context() context, @Req() request: Request) {
    const { token } = context;
    if (token) {
      const newToken = token.slice(7); // Split by space;
      const user = await jwt.verify(newToken, secret);
      if (user) {
        return this.userService.findAll();
      } else {
        return;
      }
    }
  }

  @Query(() => User)
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
