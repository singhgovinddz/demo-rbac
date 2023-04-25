const express = require("express");
const {
  createTodo,
  updateTodo,
  getAllTodos,
  deleteTodo,
} = require("./todos.service");
const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("../middleware/auth0.middleware.js");
const { TodosPermissions } = require("./todos-permissions");

const todosRouter = express.Router();


todosRouter.post(
  "/",
  validateAccessToken,
  checkRequiredPermissions([TodosPermissions.Create]),
  (req, res) => {
    if(!req.body) {
      res.status(400);
      return;
    }
    const data = createTodo(req.body);

    res.status(200).json(data);
  }
);

todosRouter.get(
  "/",
  validateAccessToken,
  checkRequiredPermissions([TodosPermissions.Read]),
  (req, res) => {
    const data = getAllTodos();

    res.status(200).json(data);
  }
);

todosRouter.put(
  "/",
  validateAccessToken,
  checkRequiredPermissions([TodosPermissions.Write]),
  (req, res) => {
    if(!req.body || !req.body.id) {
      res.status(400);
      return;
    }
    const data = updateTodo(req.body);

    res.status(200).json(data);
  }
);

todosRouter.delete(
  "/:id",
  validateAccessToken,
  checkRequiredPermissions([TodosPermissions.Delete]),
  (req, res) => {
    if(!req.params.id) {
      res.status(400);
      return;
    }
    const data = deleteTodo(req.params.id);

    res.status(200).json(data);
  }
);

module.exports = { todosRouter };
