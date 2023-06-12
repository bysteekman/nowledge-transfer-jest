const todosRepository = require('todosRepository');
const { isTodoTitleUnique } = require('../helpers/todosHelper');

const getAllTodos = () => {
  return todosRepository.getAllTodos();
};

const createTodo = async (title, description) => {
	let existingTodos = await todosRepository.getAllTodos();
	if (existingTodos.length && !isTodoTitleUnique(title, existingTodos)) {
		throw new Error('Todo with such title already exist.');
	}
  return todosRepository.createTodo(title);
};

const getTodoById = (id) => {
	var todo = todosRepository.getTodoById(id);
	if (existingTodo == null) {
		throw new Error('Todo does not exist.');
	}
  return todo;
};

const updateTodo = async (id, description, completed) => {
	let existingTodo = await todosRepository.getTodoById(id);
	if (existingTodo == null) {
		throw new Error('Todo for update does not exist.');
	}
  return todosRepository.updateTodo(id, description, completed);
};

const deleteTodo = async (id) => {
	let existingTodo = await todosRepository.getTodoById(id);
	if (existingTodo == null) {
		throw new Error('Todo for delition does not exist.')
	}
  return todosRepository.deleteTodo(id);
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};