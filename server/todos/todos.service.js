
let { data } = require('./data');
const { v4: uuidv4 } = require('uuid');

const getAllTodos = () => {
  return data;
}

const updateTodo = (todo) => {
  const updatedTodos = data.map((t) => {
    if(todo.id === t.id) {
      return todo;
    } 
    return t;
  });
  data = updatedTodos;
  return {
   message: 'updated successfully',
   data: todo 
  }
}

const deleteTodo = (id) => {
  const filteredTodos  = data.filter(t => t.id !== id);
  data = filteredTodos;
  return {
    message: 'deleted successfully',
    data: null
  }
}

const createTodo = (todo) => {
  const newTodo = {
    ...todo,
    id: uuidv4()
  }
  data.push(newTodo);
  return {
    message: 'created successfully',
    data: newTodo
  }
}

module.exports = {
  getAllTodos,
  updateTodo,
  deleteTodo,
  createTodo
};
