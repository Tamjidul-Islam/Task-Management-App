const express = require('express');
const app = express();
const port = 3000;
const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date() },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high', createdAt: new Date() },
  { id: 3, title: 'Test with PostMan', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 4, title: 'Complete all 5 Assignments', completed: false, priority: 'low', createdAt: new Date() },
  { id: 5, title: 'Push into GitHub Individually', completed: false, priority: 'medium', createdAt: new Date() }
];

app.get('/', (req, res) => {
       res.send('Task Management API is running!');
});
app.get('/tasks', (req, res) => {
       res.json(tasks);
});
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(port, () => {
       console.log(`Server running at http://localhost:${port}`);
});

