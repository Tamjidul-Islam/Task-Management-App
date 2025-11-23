const db = require('./config/db');

async function seed() {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM tasks');
    if (rows[0].count > 0) {
      console.log('Already have tasks, skip.');
      process.exit(0);
    }

    const exampleTasks = [
      { title: 'Buy groceries', description: 'Get milk, bread, and eggs from the store', status: 'pending' },
      { title: 'Finish homework', description: 'Complete math problems for class', status: 'in-progress' },
      { title: 'Call mom', description: 'Check in and talk about the week', status: 'completed' },
      { title: 'Clean room', description: 'Pick up clothes and dust the shelves', status: 'pending' },
      { title: 'Exercise', description: 'Go for a 30-minute run', status: 'in-progress' },
      { title: 'Read book', description: 'Finish the last chapter of the novel', status: 'completed' },
      { title: 'Pay bills', description: 'Send payment for electricity and internet', status: 'pending' },
      { title: 'Cook dinner', description: 'Make pasta with tomato sauce', status: 'in-progress' },
      { title: 'Watch movie', description: 'Relax with a comedy film', status: 'completed' },
      { title: 'Study code', description: 'Learn JavaScript loops', status: 'pending' },
      { title: 'Walk dog', description: 'Take Spot to the park for 20 minutes', status: 'in-progress' },
      { title: 'Shop online', description: 'Order new shoes from the website', status: 'completed' },
      { title: 'Fix bike', description: 'Pump air in the tires', status: 'pending' },
      { title: 'Visit friend', description: 'Hang out at the cafe', status: 'in-progress' },
      { title: 'Plant flowers', description: 'Put seeds in the garden pot', status: 'completed' }
    ];

    for (const task of exampleTasks) {
      await db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [task.title, task.description, task.status]);
    }

    console.log('Added 15 example tasks.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seed();