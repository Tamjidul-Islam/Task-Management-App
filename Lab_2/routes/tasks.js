const express = require('express');
const router = express.Router();

// GET /tasks - Retrieve all tasks
router.get('/', (req, res) => {
  const tasks = req.app.locals.tasks;
  res.status(200).json({
    success: true,
    data: tasks
  });
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
  try {
    const { title } = req.body;

    // Input validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Title is required and must be a non-empty string'
      });
    }

    const newTask = {
      id: Date.now(), // Simple ID (replace with auto-increment in DB)
      title: title.trim(),
      completed: false,
      priority: 'medium',  // Default priority
      createdAt: new Date()  // Current date
    };

    const tasks = req.app.locals.tasks;
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

// New: GET /tasks/:id - Get one task by ID
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);  // Turn ID to number
  const tasks = req.app.locals.tasks;
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