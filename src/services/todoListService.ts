
import { ITodo } from '@/models/ITodo';
import * as todoListRepo from '../repositories/todoListRepo';

export const getTodos = async () => await todoListRepo.getAllTodos();

export const createTodo = async (todoObj: ITodo) => await todoListRepo.addTodo(todoObj);

export const modifyTodo = async (id: number, title: string, completed: boolean) =>
  await todoListRepo.updateTodo(id, title, completed);

export const removeTodo = async (id: number) => await todoListRepo.deleteTodo(id);
