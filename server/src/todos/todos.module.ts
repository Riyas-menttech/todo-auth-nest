import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosResolver } from "./todos.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
