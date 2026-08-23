import { Board, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Kaveeshan',
    email: 'kaveeshan@syncboard.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kaveeshan',
  },
  {
    id: '2',
    name: 'Minaga',
    email: 'minaga@syncboard.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minaga',
  },
];

export const mockBoard: Board = {
  id: 'board-1',
  title: 'SyncBoard Project',
  columns: [
    {
      id: 'col-1',
      title: 'To Do',
      tasks: [
        {
          id: 'task-1',
          title: 'Set up project repository',
          description: 'Initialize the GitHub repository with proper branch structure and README documentation.',
          assignee: '1',
          priority: 'high',
          tags: ['setup', 'devops'],
          createdAt: '2024-01-15',
        },
        {
          id: 'task-2',
          title: 'Design database schema',
          description: 'Create the MongoDB schema for users, boards, columns, and tasks.',
          assignee: '2',
          priority: 'medium',
          dueDate: '2024-01-20',
          tags: ['backend', 'database'],
          createdAt: '2024-01-15',
        },
        {
          id: 'task-3',
          title: 'Create wireframes',
          description: 'Design low-fidelity wireframes for all main pages of the application.',
          priority: 'medium',
          tags: ['design', 'ui'],
          createdAt: '2024-01-16',
        },
      ],
    },
    {
      id: 'col-2',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-4',
          title: 'Build authentication system',
          description: 'Implement login and registration functionality with JWT tokens.',
          assignee: '1',
          priority: 'high',
          tags: ['auth', 'backend'],
          createdAt: '2024-01-14',
        },
        {
          id: 'task-5',
          title: 'Create board component',
          description: 'Develop the main Kanban board with drag-and-drop functionality.',
          assignee: '2',
          priority: 'medium',
          dueDate: '2024-01-25',
          tags: ['frontend', 'react'],
          createdAt: '2024-01-14',
        },
      ],
    },
    {
      id: 'col-3',
      title: 'Review',
      tasks: [
        {
          id: 'task-6',
          title: 'API documentation',
          description: 'Document all REST API endpoints using OpenAPI/Swagger.',
          assignee: '1',
          priority: 'low',
          tags: ['documentation', 'api'],
          createdAt: '2024-01-10',
        },
      ],
    },
    {
      id: 'col-4',
      title: 'Done',
      tasks: [
        {
          id: 'task-7',
          title: 'Project planning',
          description: 'Define project requirements, tech stack, and timeline.',
          assignee: '1',
          priority: 'high',
          tags: ['planning'],
          createdAt: '2024-01-01',
        },
        {
          id: 'task-8',
          title: 'Set up development environment',
          description: 'Configure Vite, TypeScript, and Tailwind CSS.',
          assignee: '2',
          priority: 'medium',
          tags: ['setup', 'devops'],
          createdAt: '2024-01-02',
        },
      ],
    },
  ],
};
