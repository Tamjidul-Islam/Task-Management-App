const express = require('express');
const router = express.Router();
const winston = require('winston');

const db = require('../../config/db');

// Setup for saving errors in file
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' })
  ]
});

// GET all tasks with page, limit, search, hide deleted
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (limit > 50) {
      return res.status(400).json({ error: 'Limit max 50' });
    }

    const start = (page - 1) * limit;
    const search = `%${req.query.q || ''}%`;

    const [total] = await db.query('SELECT COUNT(*) AS count FROM tasks WHERE title LIKE ? AND deleted_at IS NULL', [search]);
    const totalTasks = total[0].count;
    const totalPages = Math.ceil(totalTasks / limit);

    const [rows] = await db.query('SELECT * FROM tasks WHERE title LIKE ? AND deleted_at IS NULL ORDER BY created_at DESC LIMIT ? OFFSET ?', [search, limit, start]);

    res.json({
      totalTasks,
      totalPages,
      currentPage: page,
      limit,
      data: rows
    });
  } catch (err) {
    logger.error(err); // Save error in file
    res.status(500).json({ error: 'Database error' });
  }
});

// POST add a new task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    const [result] = await db.query(sql, [title, description || null]);
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (err) {
    logger.error(err); // Save error in file
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT change a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updates = [];
    const values = [];
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (status !== undefined) { updates.push('status = ?'); values.push(status); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (err) {
    logger.error(err); // Save error in file
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE mark as deleted
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('UPDATE tasks SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    logger.error(err); // Save error in file
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// GET see deleted tasks
router.get('/deleted', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC');
    res.json(rows);
  } catch (err) {
    logger.error(err); // Save error in file
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT bring back deleted task (restore)
router.put('/:id/restore', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('UPDATE tasks SET deleted_at = NULL WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const [restored] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(restored[0]);
  } catch (err) {
    logger.error(err); // Save error in file
    res.status(500).json({ error: 'Failed to restore task' });
  }
});

module.exports = router;