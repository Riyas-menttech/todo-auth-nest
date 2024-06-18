import { Injectable } from "@nestjs/common";
import { CreateTodoInput } from "./dto/create-todo.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}
  async create(createTodoInput: CreateTodoInput) {
    const { title }: any = createTodoInput;

    const newTodo = await this.todoRepo.create({ title });
    // console.log(newTodo, title, 'koooihgtihtu');

    await this.todoRepo.save(newTodo);
    return newTodo;
  }

  async findAll() {
    return await this.todoRepo.find();
  }

  async findOne(id: number) {
    return await this.todoRepo.findOneBy({ id });
  }

  async update(id: number, createTodoInput: CreateTodoInput) {
    const { title } = createTodoInput;
    const todo = await this.todoRepo.findOneBy({ id });
    if (todo) {
      await this.todoRepo.update({ id: id }, { title: title });
      const newTodo = await this.todoRepo.findOneBy({ id });
      return newTodo;
    } else {
      console.log("Id not matching..");
    }
  }

  async remove(id: number) {
    return await this.todoRepo.delete(id);
  }
}
