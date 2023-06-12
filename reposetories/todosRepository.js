const db = require('../db');
const { getTodoAsModel } = require('../helpers/todosHelper');
const Todo = require('../models/todo');

const getAllTodos = async () => {
  try {
    const query = 'SELECT * FROM todos';
    const result = await db.query(query);
    const todos = result.rows.map(row => getTodoAsModel(row));
    return todos;
  } catch (error) {
    throw new Error('Failed to get todos');
  }
};

const createTodo = async (title, description) => {
  try {
    const query = 'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *';
    const values = [title, description];
    const result = await db.query(query, values);
    const todo = getTodoAsModel(result.rows[0]);
    return todo;
  } catch (error) {
    throw new Error('Failed to create todo');
  }
};

const getTodoById = async (id) => {
  try {
    const query = 'SELECT * FROM todos WHERE id = $1';
    const values = [id];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      const todo = getTodoAsModel(result.rows[0]);
      return todo;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Failed to get todo by ID');
  }
};

const updateTodo = async (id, title, description, completed) => {
  try {
    const query = 'UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *';
    const values = [title, description, completed, id];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      const todo = getTodoAsModel(result.rows[0]);
      return todo;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Failed to update todo');
  }
};

const deleteTodo = async (id) => {
  try {
    const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      const todo = getTodoAsModel(result.rows[0]);
      return todo;
    } else {
      throw new Error('Todo not found');
    }
  } catch (error) {
    throw new Error('Failed to delete todo');
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};