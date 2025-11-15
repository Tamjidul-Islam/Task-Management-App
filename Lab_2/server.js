const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();

// In-memory storage (will be replaced by MySQL in LAB 3)
const tasks = [
  { id: 1, title: 'Sample Task', completed: false }
];

app.locals.tasks = tasks; // Attach to app for route access

app.use(express.json()); // Parses application/json

app.use('/tasks', taskRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server runs on http://localhost:' + PORT);
});