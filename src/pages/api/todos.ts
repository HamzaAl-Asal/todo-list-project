import type { NextApiRequest, NextApiResponse } from 'next';
import * as todoListService from '@/services/todoListService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      console.log('inside', req);
      const todos = await todoListService.getTodos();
      console.log('todos', todos);
      return res.status(200).json(todos);
    }

    case 'POST': {
      await todoListService.createTodo(req.body);
      return res.status(201).json({ message: 'Created' });
    }

    case 'PUT': {
      const { Id, Description, Category } = req.body;
      await todoListService.modifyTodo(Id, Description, Category);
      return res.status(200).json({ message: 'Updated' });
    }

    case 'DELETE': {
      const { Id } = req.body;
      await todoListService.removeTodo(Id);
      return res.status(200).json({ message: 'Deleted' });
    }

    default:
      return res.status(405).end();
  }
}
