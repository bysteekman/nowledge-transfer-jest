const express = require('express');
const todosController = require('todosController');

const router = express.Router();

// Get all todos
router.get('/', todosController.getAllTodos);

// Create a new todo
router.post('/', todosController.createTodo);

// Get a specific todo
router.get('/:id', todosController.getTodoById);

// Update a todo
router.put('/:id', todosController.updateTodo);

// Delete a todo
router.delete('/:id', todosController.deleteTodo);

module.exports = router;