import React, { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { Todo } from './models/todo.model';
import './App.css';

//class일경우 ClassicComponent
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    const id = Math.random().toString();
    const todo: Todo = { id, text };
    //prevTodos 최신화를 보장
    setTodos(prevTodos => [...prevTodos, todo]);
  };
  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      const filteredTodos = prevTodos.filter(todo => todo.id !== todoId);
      return filteredTodos;
    });
  };
  return (
    <div className="App">
      <NewTodo todoAddHandler={todoAddHandler} />
      <TodoList todos={todos} todoDeleteHandler={todoDeleteHandler} />
    </div>
  );
};

export default App;
