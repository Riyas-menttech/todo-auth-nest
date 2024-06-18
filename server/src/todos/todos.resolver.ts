import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TodosService } from "./todos.service";
import { Todo } from "./entities/todo.entity";
import { CreateTodoInput } from "./dto/create-todo.input";
// import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  async createTodo(@Args("createTodoInput") createTodoInput: CreateTodoInput) {
    return await this.todosService.create(createTodoInput);
  }

  @Query(() => [Todo])
  async findAll() {
    return await this.todosService.findAll();
  }

  @Query(() => Todo)
  async findOne(@Args("id", { type: () => Int }) id: number) {
    return await this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  async updateTodo(@Args("createTodoInput") createTodoInput: CreateTodoInput) {
    const res = await this.todosService.update(
      createTodoInput.id,
      createTodoInput,
    );
    return res;
  }

  @Mutation(() => Todo)
  async removeTodo(@Args("id", { type: () => Int }) id: number) {
    return await this.todosService.remove(id);
  }
}
