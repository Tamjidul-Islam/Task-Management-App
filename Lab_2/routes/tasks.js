const express = require('express');
const router = express.Router();

// In-memory storage (moved from server.js)
const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date() },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high', createdAt: new Date() },
  { id: 3, title: 'Read Express docs', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 4, title: 'Write README', completed: false, priority: 'low', createdAt: new Date() },
  { id: 5, title: 'Test with Postman', completed: false, priority: 'medium', createdAt: new Date() }
];

// GET /tasks - Get all tasks
router.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks
  });
});

// POST /tasks - Add a new task
router.post('/tasks', (req, res) => {
  try {
    const { title } = req.body;

    // Check if title is good
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Title is required and must be a non-empty string'
      });
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /task/:id - Get one task by ID with error handling
router.get('/task/:id', (req, res) => {
  const idParam = req.params.id;
  const taskId = parseInt(idParam);

  // New check for bad ID format
  if (isNaN(taskId)) {
    return res.status(400).json({
      error: 'Invalid ID format'
    });
  }

  const task = tasks.find(t => t.id === taskId);

  if (task) {
    res.status(200).json({
      success: true,
      data: task
    });
  } else {
    res.status(404).json({
      error: 'Task not found'
    });
  }
});

module.exports = router;