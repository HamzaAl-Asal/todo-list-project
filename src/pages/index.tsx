import { useEffect, useState } from 'react';
import { ITodo } from '../models/ITodo';

export default function index() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    console.log('res', res);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async () => {
    if (editingId !== null) {
      await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id: editingId, Description: description, Category: category }),
      });
      setEditingId(null);
    } else {
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Description: description, Category: category }),
      });
    }
    setDescription('');
    setCategory('');
    fetchTodos();
  };

  const handleEdit = (todo: ITodo) => {
    setEditingId(todo.Id);
    setDescription(todo.Description);
    setCategory(todo.Category);
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Id: id }),
    });
    fetchTodos();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.Id}>
            <strong>{todo.Description}</strong> - {todo.Category}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.Id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
