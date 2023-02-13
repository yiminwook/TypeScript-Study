import React, { useRef } from 'react';
import './NewTodo.css';

interface NewTodoProps {
  todoAddHandler: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ todoAddHandler }) => {
  //useRef DOM에 접근해서 value를 가져온다 매번 랜더링 되지않음
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    todoAddHandler(enteredText);
  };

  return (
    <div>
      <form onSubmit={todoSubmitHandler}>
        <div className="form-control">
          <label htmlFor="todo-text">Todo Text</label>
          <div className="form-input">
            <input type="text" id="todo-text" ref={textInputRef}></input>
            <button type="submit">ADD</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
