import { gql } from "@apollo/client";

export const CHECKUSER = gql`
  mutation LoginUser($createUserInput: CreateUserInput!) {
    LoginUser(createUserInput: $createUserInput) {
      Email
      Password
      message
      status
      token
    }
  }
`;

export const REGISTERUSER = gql`
  mutation RegisterUser($createUserInput: CreateUserInput!) {
    SignupUser(createUserInput: $createUserInput) {
      Email
      Password
      message
      status
    }
  }
`;

export const GETUSERS = gql`
  query {
    getUsers {
      id
      Email
    }
  }
`;

export const GETTODOS = gql`
  query {
    findAll {
      id
      title
    }
  }
`;
export const GETSINGLETODO = gql`
query findOne($id:Int!){
findOne(id:$id){
id,title
}
}
`;
export const UPDATE = gql`
  mutation updateTodo($createTodoInput: CreateTodoInput!) {
    updateTodo(createTodoInput: $createTodoInput){
    title,id
    }
  }
`;
export const DELETE = gql`
  mutation deleteTodo($id: id) {
    removeTodo(id:$id){
    id,todo
    }
  }
`;
export const CREATETODO = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      title
      id
    }
  }
`;
