# SyncBoard Client

SyncBoard is a dark-themed collaborative task management client built as the static front-end skeleton for Assignment 01. It provides a responsive Kanban workspace with mock data and client-side interactions that demonstrate the planned user experience before back-end integration.

## Assignment

**Assignment 01 - Static Front-End Skeleton**

Repository: [https://github.com/Kaveeshan7/SyncBoard](https://github.com/Kaveeshan7/SyncBoard)

## Team

| Member | GitHub Username | Role |
| --- | --- | --- |
| Kaveeshan | [Kaveeshan7](https://github.com/Kaveeshan7) | Full-Stack Developer - application structure, authentication screens, dashboard, and board features |
| Minaga | [MYethmin](https://github.com/MYethmin) | Full-Stack Developer - UI components, navigation views, testing, and documentation |

Both members should make commits using their own GitHub accounts so their contributions appear in the repository history.

## Features

- Dark, responsive landing page
- Mock login and registration flows
- Protected dashboard experience using local browser state
- Dashboard overview with task and progress summaries
- Multiple Kanban boards and board switching
- Custom board creation with configurable columns
- Task creation, search, details, and deletion
- Calendar view for task due dates
- Team member and collaboration view
- Project analytics and task distribution summaries
- Notifications with read and unread states
- Personal and workspace settings
- User profile modal with assigned-task information

## Pages And Views

- `/` - Landing page
- `/login` - Sign-in page
- `/register` - Account registration page
- `/dashboard` - Authenticated workspace
- Dashboard
- Boards
- Calendar
- Teams
- Analytics
- Notifications
- Settings
- Profile

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Browser localStorage for mock authentication

## Getting Started

### Prerequisites

Install the following software:

- [Node.js](https://nodejs.org/) 18 or later
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Kaveeshan7/SyncBoard.git
cd SyncBoard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

## Build For Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Using The Static Client

1. Open the landing page.
2. Select **Get Started** to register or **Sign In** to use the login form.
3. Enter valid form values. The current static client accepts mock credentials and stores the user in localStorage.
4. Use the dashboard sidebar to open Dashboard, Boards, Calendar, Teams, Analytics, Notifications, or Settings.
5. Open Boards to create boards and tasks.
6. Select the user area in the header or sidebar to view the profile.

## Project Structure

```text
src/
|-- components/       Reusable board, modal, navigation, and dashboard views
|-- data/             Static mock board and user data
|-- pages/            Landing, authentication, and dashboard pages
|-- types/            Shared TypeScript interfaces
|-- utils/            Shared utility functions
|-- App.tsx           Application routes
|-- index.css         Tailwind import and global styles
`-- main.tsx          React application entry point
```

## Current Scope

This repository contains a static front-end skeleton. Authentication, social sign-in, invitations, real-time synchronization, REST API calls, database persistence, and server-side authorization are represented by UI or local mock behavior and will require back-end integration in later milestones.

## Git Workflow

Create a feature branch before making changes:

```bash
git checkout -b feature/your-feature-name
```

Commit and push the changes:

```bash
git add .
git commit -m "feat: describe your change"
git push -u origin feature/your-feature-name
```

Open a pull request on GitHub and merge it into `main` after review.

## Assignment Tag

After both members' commits are merged into `main`, create and publish the assignment tag:

```bash
git checkout main
git pull origin main
git tag -a assignment-01-static-frontend-skeleton -m "Assignment 01 - Static Front-End Skeleton"
git push origin assignment-01-static-frontend-skeleton
```

## License

This project was created for academic coursework.