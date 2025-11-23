const express = require('express');
const taskRouter = require('./src/routes/tasks');

const app = express();

app.use(express.json()); // For reading JSON bodies

app.use('/tasks', taskRouter); // Connect tasks routes at /tasks

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server runs on http://localhost:' + PORT);
});