export type TodoItem = {
  userId: number;
  id: number;
  title: string;
  description?: string;
  status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
  createdAt?: string;
};

export type CreateTodoItem = {
  title: string;
  description?: string;
  status?: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
};
