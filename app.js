const express = require('express');
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/todos', todosRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(3000, () => {
  console.log('Todo list API server is running on port 3000');
});