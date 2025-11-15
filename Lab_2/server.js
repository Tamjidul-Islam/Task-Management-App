const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();

app.use(express.json()); // Parses application/json

app.use('/', taskRouter); // Mount router at root so paths in tasks.js work

// Hello message for main page
app.get('/', (req, res) => {
  res.send('Hello!');
});

// GET /health - Show server status and uptime
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server runs on http://localhost:' + PORT);
});