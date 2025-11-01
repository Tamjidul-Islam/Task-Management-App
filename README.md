# Task Management API

A simple REST API built with Express.js for managing tasks with priorities and completion status.

## 📋 Table of Contents
- [🚀 Setup and Installation](#-setup-and-installation)
- [🧩 API Endpoints](#-api-endpoints)
- [🛠️ Built With](#️-built-with)
- [📝 License](#-license)

---

## 🚀 Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/Tamjidul-Islam/Task-Management-App.git
cd Task-Management-App/task-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start running on `http://localhost:3000`

## � API Endpoints

### Health Check
- **GET** `/health`
  - Check if the API is running
  - Response: `{ "status": "ok" }`

### Task Operations
- **GET** `/`
  - Response: The Task MAnagement API is Running

- **GET** `/tasks`
  - Retrieve all tasks
  - Response: Array of task objects

- **POST** `/tasks`
  - Create a new task
  - Request body: `{ "title": "string", "description": "string", "priority": "low|medium|high" }`

- **GET** `/task/:id`
  - Get a specific task by ID
  - Response: Task object

- **PUT** `/task/:id`
  - Update a specific task
  - Request body: `{ "title": "string", "description": "string", "priority": "low|medium|high", "completed": boolean }`

- **DELETE** `/task/:id`
  - Delete a specific task
  - Response: Success message

## 🛠️ Built With
- Node.js
- Express.js

## 📝 License
This project is licensed under the MIT License.
Author: Tamjidul-Islam
