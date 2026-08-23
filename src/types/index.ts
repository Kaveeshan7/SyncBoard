export interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags: string[];
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
