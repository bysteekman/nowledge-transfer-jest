const Todo = require("../models/todo")

const getTodoAsModel = (todo) => {
  return new Todo(todo.id, todo.title, todo.description, todo.completed);
}

const isTodoTitleUnique = (title, existingTodos) => {
	return existringTodos.filter(td => td.title === title).length > 0;
}

module.exports = {
  getTodoAsModel,
	isTodoTitleUnique
};