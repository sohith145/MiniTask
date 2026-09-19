# MiniTask

MiniTask is a full-stack task and file management application built with React, Node.js, Express, and MongoDB. It allows users to securely manage tasks and files through a responsive web interface backed by a RESTful API.

## Features

### Task Management

* Create, view, update, and delete tasks
* Task priority management: Low, Medium, and High
* Task completion tracking
* Due dates
* Estimated hours
* Search tasks
* Filter tasks
* Sort tasks
* Pagination

### File Management

* Upload files
* View file details
* Search files
* Paginate files
* Download files
* Delete files
* File ownership
* File type validation
* Maximum upload size of 5 MB

### User Management

* User registration
* User login
* Secure logout
* Profile management
* Protected user-specific resources

### Dashboard

* User information
* Task statistics
* Recent tasks
* Recent files
* Global search

## Authentication & Security

MiniTask implements several security practices:

* JWT-based authentication
* Secure HTTP-only cookies
* Bearer token authentication
* Password hashing with bcrypt
* Zod request validation
* Input sanitization
* Helmet security headers
* CORS configuration
* Rate limiting
* Protected API routes
* User ownership checks
* File upload validation
* Centralized error handling
* MongoDB indexes for improved query performance

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Sonner
* CSS

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcrypt
* Zod
* Multer
* Helmet
* CORS

### Development Tools

* Git
* GitHub
* Postman
* Nodemon

## Project Structure

```text
MiniTask/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## API Overview

The backend provides RESTful API endpoints for:

### Users

```text
POST   /api/users
POST   /api/users/login
POST   /api/users/logout
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/:id/tasks
```

### Tasks

```text
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Files

```text
GET    /api/files
POST   /api/files/upload
GET    /api/files/:id
GET    /api/files/:id/download
DELETE /api/files/:id
```

Authentication is required for protected endpoints.

## Frontend

The React frontend provides a user-friendly interface for interacting with the MiniTask API.

Main sections include:

* Landing page
* Login
* Registration
* Dashboard
* All Tasks
* My Files
* Settings

The frontend communicates with the backend through Axios and uses authentication state to protect private routes.

## Environment Variables

### Backend

Create a `.env` file inside the backend directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use your own values for the environment variables.

**Do not commit `.env` files or secrets to GitHub.**

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/sohith145/MiniTask.git
cd MiniTask
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file in the backend directory and add the required environment variables.

### 4. Start the backend

For development:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

Open the local frontend URL provided by Vite in your browser.

## API Testing

The backend API can be tested using Postman.

Authentication-protected requests can use either:

* HTTP-only authentication cookies
* Bearer tokens

## Future Improvements

Possible future improvements include:

* Production deployment
* Automated testing
* CI/CD pipeline
* Improved file storage architecture
* Advanced task filtering and reporting
* Additional user preferences
* Improved monitoring and logging

## Project Status

MiniTask is a completed full-stack learning project covering frontend development, REST API development, authentication, security, database operations, file management, Git/GitHub workflow, and deployment.

## License

This project is intended for learning and portfolio purposes.
