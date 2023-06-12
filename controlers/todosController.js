const todosService = require('../services/todosService');

// Get all todos
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todosService.getAllTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Create a new todo
const createTodo = async (req, res, next) => {
  const { title } = req.body;
  try {
    const newTodo = await todosService.createTodo(title);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// Get a specific todo
const getTodoById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await todosService.getTodoById(id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Update a todo
const updateTodo = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  try {
    const updatedTodo = await todosService.updateTodo(id, title, completed);
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// Delete a todo
const deleteTodo = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const deletedTodo = await todosService.deleteTodo(id);
    res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
