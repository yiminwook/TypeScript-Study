import React from 'react';
import { Todo } from '../models/todo.model';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  todoDeleteHandler: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, todoDeleteHandler }) => {
  return (
    <div>
      <ul>
        {todos.length > 0 &&
          todos.map(todo => (
            <div>
              <li key={todo.id}>
                <span>{todo.text}</span>
                <button onClick={() => todoDeleteHandler(todo.id)}>DEL</button>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
