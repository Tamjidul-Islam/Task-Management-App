const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();

// In-memory storage (will be replaced by MySQL in LAB 3)
const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date() },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high', createdAt: new Date() },
  { id: 3, title: 'Read Express docs', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 4, title: 'Write README', completed: false, priority: 'low', createdAt: new Date() },
  { id: 5, title: 'Test with Postman', completed: false, priority: 'medium', createdAt: new Date() }
];

app.locals.tasks = tasks; // Attach to app for route access

app.use(express.json()); // Parses application/json

app.use('/tasks', taskRouter);

// Add this new route for the main page
app.get('/', (req, res) => {
  res.send('Hello!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server runs on http://localhost:' + PORT);
});