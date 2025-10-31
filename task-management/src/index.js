const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.use('/', require('./routes/tasks'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
