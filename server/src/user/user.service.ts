/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import { UpdateUserInput } from './dto/update-user.input';
const secret = "MyScret";
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}
  async create(createUserInput: CreateUserInput) {
    const { Email, Password } = createUserInput;
    const user = await this.UserRepo.findOneBy({ Email: Email });
    // console.log(user, 'user');

    if (user) {
      return {
        user,
        message: "User with this email already exists",
        status: 201,
      };
    }
    try {
      const hashPassword = await bcrypt.hash(Password, 10);
      // console.log(hashPassword, 'passwordishere');

      // const newUserSinge: any = {
      //   Email,
      //   Password: hashPassword,
      // };
      // console.log(newUserSinge, 'log isheere');
      if (hashPassword) {
        const newuser = await this.UserRepo.create({
          Email: Email,
          Password: hashPassword,
        });
        await this.UserRepo.save(newuser);

        return {
          user: newuser,
          message: "User successfully created",
          status: 200,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException("Failed to create user");
    }
  }

  async loginUser(createUserInput: CreateUserInput) {
    const { Email, Password } = createUserInput;
    const user = await this.UserRepo.findOneBy({ Email });
    console.log(user, "user is herer");

    if (user == null) {
      const oldUser = {
        Email,
        Password,
      };

      return {
        user: oldUser,
        message: "User Not Existed",
        status: 400,
        token: "",
      };
    }
    const comparePassword = await bcrypt.compare(Password, user.Password);
    if (!comparePassword) {
      return {
        user,
        message: "Password Incorrect",
        status: 400,
        token: "",
      };
    }

    const token: any = await jwt.sign({ email: user.Email }, secret, {
      expiresIn: "24h",
    });

    return { user: user, message: "Successfully logedIn", status: 200, token };
  }
  findAll() {
    return this.UserRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
