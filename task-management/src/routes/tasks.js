const express = require('express');
const router = express.Router();

const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date() },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high', createdAt: new Date() },
  { id: 3, title: 'Read Express docs', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 4, title: 'Write README', completed: false, priority: 'low', createdAt: new Date() },
  { id: 5, title: 'Test with Postman', completed: false, priority: 'medium', createdAt: new Date() }
];

router.get('/tasks', (req, res) => {
  const { priority } = req.query;
  if (priority) {
    const filtered = tasks.filter(t => t.priority === priority);
    return res.json(filtered);
  }
  res.json(tasks);
});

router.get('/task/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

module.exports = router;
