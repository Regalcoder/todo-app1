# Todo Application

A feature-rich todo application built with React, React Router, and Axios, featuring CRUD operations, search/filter capabilities, and responsive design.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete todos
- **Pagination**: Browse todos with 10 items per page
- **Search & Filter**:
  - Real-time search by title
  - Filter by completion status (All/Completed/Incomplete)
- **Error Handling**:
  - Custom error boundary
  - 404 page for undefined routes
- **Responsive Design**: Works on mobile, tablet, and desktop
- **UI Features**:
  - Loading states
  - Skeleton loaders
  - Status toggling
  - Toast notifications

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Open http://localhost:3000 in your browser.

Available Scripts
npm start: Runs the app in development mode

npm test: Launches the test runner

npm run build: Builds the app for production

npm run eject: Ejects from Create React App (irreversible)

Technology Stack
Frontend
React 18: Component-based architecture

React Router v6: Client-side routing

Axios: HTTP client for API requests

React Icons: SVG icons

CSS Modules: Component-scoped styling

Backend (Mock API)
JSONPlaceholder: Free fake API for testing

LocalForage: Client-side caching

Architecture Decisions
Functional Components: With React hooks

Container/Presentational Pattern: Separates logic and UI

Responsive-First Design: Mobile-optimized UI

Error Boundary: Catches component tree errors

API Documentation
The app uses these endpoints from JSONPlaceholder:

Endpoint	Method	Description
/todos	GET	Fetch all todos
/todos/:id	GET	Fetch single todo
/todos	POST	Create new todo
/todos/:id	PUT	Update todo
/todos/:id	DELETE	Delete todo
Pagination Parameters:

?_start=0&_limit=10 - Gets first 10 todos

Screenshots & Demos
Key Features
Feature	Screenshot
Todo List	https://./screenshots/list-view.png
Todo Detail	https://./screenshots/detail-view.png
Mobile View	https://./screenshots/mobile-view.png
Error Boundary	https://./screenshots/error-view.png
View full demo video

Known Issues
API Limitations:

JSONPlaceholder doesn't persist changes

Pagination requires fetching all todos first

Performance:

Large todo lists may impact rendering

No debounce on search input

Browser Support:

Limited testing on legacy browsers

Future Improvements
Enhanced Features:

Due dates and priority levels

Drag-and-drop reordering

Tags and categories

Technical Improvements:

Implement Redux for state management

Add proper backend with user authentication

Implement service workers for offline support

UX Improvements:

Undo/redo functionality

Bulk operations

Dark mode toggle

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

text

### Recommended File Structure for Assets:
project-root/
├── public/
├── src/
├── screenshots/
│ ├── list-view.png
│ ├── detail-view.png
│ ├── mobile-view.png
│ └── error-view.png
├── demos/
│ └── app-demo.mp4
├── README.md
└── LICENSE

text
