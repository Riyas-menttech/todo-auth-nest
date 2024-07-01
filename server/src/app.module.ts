import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { TodosModule } from "./todos/todos.module";
import { ConfigModule } from "@nestjs/config";
import { Todo } from "./todos/entities/todo.entity";

@Module({
  imports: [
    // ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "src/schema.gql",
      context: ({ req }) => {
        return { token: req.headers.authorization };
      },
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "mydatabase",
      entities: [User, Todo],
      synchronize: true,
      host: "postgresData",
      port: 5432,
      username: "apple",
      password: "mypassword",
      autoLoadEntities: true, 
    }),
    UserModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
