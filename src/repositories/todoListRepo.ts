import { ITodo } from "../models/ITodo";
import { getTodoListAppDbConnection } from "../todoListAppConnectionPool/todoListAppConnection";
import { DateTime } from "mssql";

export async function getAllTodos(): Promise<ITodo[]> {
    const connectionPool = await getTodoListAppDbConnection();
    console.log('connectionPool', connectionPool);
    const result = await connectionPool.request().query('SELECT * FROM Todos');

    return result.recordset;
}

export async function addTodo(todoObj: ITodo): Promise<void> {
    console.log('todoObj', todoObj)
    const connectionPool = await getTodoListAppDbConnection();

    const description = todoObj.Description;
    const category = todoObj.Category;
    const createdAt = DateTime();

    await connectionPool.request()
    .input('description', description)
    .input('category', category)
    .input('createdAt', createdAt)
    .query('INSERT INTO Todos (Description), (Category), (CreatedAt) VALUES (@description), (@category), (@createdAt)');
}

export async function updateTodo(id: number, title: string, completed: boolean): Promise<void> {
    const connectionPool = await getTodoListAppDbConnection();

    await connectionPool.request()
        .input('id', id)
        .input('title', title)
        .input('completed', completed)
        .query('UPDATE Todos SET Title = @title, Completed = @completed WHERE Id = @id');
}

export async function deleteTodo(id: number): Promise<void> {
    const connectionPool = await getTodoListAppDbConnection();

    await connectionPool.request().input('id', id).query('DELETE FROM Todos WHERE Id = @id');
}
