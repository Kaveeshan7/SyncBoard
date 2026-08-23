# SyncBoard Client

SyncBoard is a dark-themed collaborative task management client built as the static front-end skeleton for Assignment 01. It provides a responsive Kanban workspace with mock data and client-side interactions that demonstrate the planned user experience before back-end integration.

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
