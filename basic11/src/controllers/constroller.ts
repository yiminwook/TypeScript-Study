import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const todos: Todo[] = [];

export const getController: RequestHandler = (req, res, next) => {
  try {
    return res.status(200).json({ mesage: 'ok', todos: todos });
  } catch (err) {
    next(err);
  }
};

export const postController: RequestHandler = (req, res, next) => {
  try {
    const text = req.body.text as string;
    if (!req.body.text) throw new Error('Require todo Text');
    const newTodo = new Todo(Math.random().toString(), text);
    todos.push(newTodo);
    return res
      .status(201)
      .json({ mesage: 'Created todo', createdTodo: newTodo });
  } catch (err) {
    next(err);
  }
};

export const patchController: RequestHandler<{ id: string }> = (
  req,
  res,
  next,
) => {
  try {
    const id = req.params.id;
    const text = req.body.text as string;
    if (!req.body.text) throw new Error('Require todo Text');
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex < 0) throw new Error('Could not find todo');
    todos[todoIndex] = new Todo(id, text);
    return res
      .status(201)
      .json({ mesage: 'Updated todo', updatedTodo: todos[todoIndex] });
  } catch (err) {
    next(err);
  }
};

export const deleteController: RequestHandler<{ id: string }> = (
  req,
  res,
  next,
) => {
  try {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex < 0) throw new Error('Could not find todo');
    const splicedTodo = todos.splice(todoIndex, 1)[0];
    return res
      .status(200)
      .json({ mesage: 'Deleted todo', deletedTodo: splicedTodo });
  } catch (err) {
    next(err);
  }
};

const controller = {
  getController,
  postController,
  patchController,
  deleteController,
};

export default controller;
