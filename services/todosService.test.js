const todosRepository = require('todosRepository');
const todosService = require('../services/todosService');
const { isTodoTitleUnique } = require('../helpers/todosHelper');

jest.mock('todosRepository'); // Mock todosRepository module

describe('Todos Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTodo', () => {
    it('should create a new todo when title is unique', async () => {
      const existingTodos = []; // Empty existing todos array
      todosRepository.getAllTodos.mockResolvedValue(existingTodos);
      todosRepository.createTodo.mockResolvedValue({ id: 1, title: 'New Todo', description: 'Todo description' });

      const createdTodo = await todosService.createTodo('New Todo', 'Todo description');

      expect(todosRepository.getAllTodos).toHaveBeenCalled();
      expect(todosRepository.createTodo).toHaveBeenCalledWith('New Todo', 'Todo description');
      expect(createdTodo).toEqual({ id: 1, title: 'New Todo', description: 'Todo description' });
    });

    it('should throw an error when title already exists', async () => {
      const existingTodos = [{ id: 1, title: 'Existing Todo', description: 'Todo description' }];
      todosRepository.getAllTodos.mockResolvedValue(existingTodos);

      await expect(todosService.createTodo('Existing Todo', 'Todo description')).rejects.toThrow('Todo with such title already exists.');
      expect(todosRepository.getAllTodos).toHaveBeenCalled();
      expect(todosRepository.createTodo).not.toHaveBeenCalled();
    });
  });

  describe('getTodoById', () => {
    it('should return a todo when it exists', () => {
      const existingTodo = { id: 1, title: 'Existing Todo', description: 'Todo description' };
      todosRepository.getTodoById.mockReturnValue(existingTodo);

      const todo = todosService.getTodoById(1);

      expect(todosRepository.getTodoById).toHaveBeenCalledWith(1);
      expect(todo).toEqual(existingTodo);
    });

    it('should throw an error when todo does not exist', () => {
      todosRepository.getTodoById.mockReturnValue(null);

      expect(() => {
        todosService.getTodoById(1);
      }).toThrow('Todo does not exist.');
      expect(todosRepository.getTodoById).toHaveBeenCalledWith(1);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo when it exists', async () => {
      const existingTodo = { id: 1, title: 'Existing Todo', description: 'Todo description' };
      todosRepository.getTodoById.mockResolvedValue(existingTodo);
      todosRepository.updateTodo.mockResolvedValue({ id: 1, title: 'Updated Todo', description: 'Updated description', completed: true });

      const updatedTodo = await todosService.updateTodo(1, 'Updated Todo', 'Updated description', true);

      expect(todosRepository.getTodoById).toHaveBeenCalledWith(1);
      expect(todosRepository.updateTodo).toHaveBeenCalledWith(1, 'Updated Todo', 'Updated description', true);
      expect(updatedTodo).toEqual({ id: 1, title: 'Updated Todo', description: 'Updated description', completed: true });
    });

    it('should throw an error when todo does not exist', async () => {
      todosRepository.getTodoById.mockResolvedValue(null);

      await expect(todosService.updateTodo(1, 'Updated Todo', 'Updated description', true)).rejects.toThrow('Todo for update does not exist.');
      expect(todosRepository.getTodoById).toHaveBeenCalledWith(1);
      expect(todosRepository.updateTodo).not

.toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo when it exists', async () => {
      const existingTodo = { id: 1, title: 'Existing Todo', description: 'Todo description' };
      todosRepository.getTodoById.mockResolvedValue(existingTodo);
      todosRepository.deleteTodo.mockResolvedValue(existingTodo);

      const deletedTodo = await todosService.deleteTodo(1);

      expect(todosRepository.getTodoById).toHaveBeenCalledWith(1);
      expect(todosRepository.deleteTodo).toHaveBeenCalledWith(1);
      expect(deletedTodo).toEqual(existingTodo);
    });

    it('should throw an error when todo does not exist', async () => {
      todosRepository.getTodoById.mockResolvedValue(null);

      await expect(todosService.deleteTodo(1)).rejects.toThrow('Todo for deletion does not exist.');
      expect(todosRepository.getTodoById).toHaveBeenCalledWith(1);
      expect(todosRepository.deleteTodo).not.toHaveBeenCalled();
    });
  });
});

