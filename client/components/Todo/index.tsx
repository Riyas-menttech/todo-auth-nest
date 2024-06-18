'use client'
import { CREATETODO, GETTODOS } from '@/Graphql/Schema';
import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [title, setTitle] = useState('');
    const [CreateTodo] = useMutation(CREATETODO);
    const { data, loading, error ,refetch} = useQuery(GETTODOS);
    
    const [todos, setTodos]: any = useState([{title:'',id:''}])
    
      useEffect(() => {
        if (data) {
          setTodos(data?.findAll);
        }
      }, [data, todos]);

    if (loading) {
        return  <h1>Loadingg...</h1>
    }
    
    if (error) {
        return error;
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const { data } = await CreateTodo({
              variables: {
                createTodoInput: { title },
              },
            });
            console.log(data, 'ishere');
            refetch()
            setTodos([{ ...todos, title: data.createTodo.title,id:data.createTodo.id }]);
            
        } catch (error) {
            console.log(error);
            
        }
    }
  
  return (
    <div>
      <h1>Create Todo</h1>
      <form>
        <input
          type="text"
          className="text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Create</button>
      </form>
      {todos?.map((todo:any, index:number) => (
        <div key={index} className='text-white'>
          <h1>id---{todo.id}</h1>
          <h1>{todo.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default Todo
