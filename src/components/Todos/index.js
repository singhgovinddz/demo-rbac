import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../../config";
import Todo from "./Todo";
import { Button, Alert } from "reactstrap";
import CreateOrUpdateTodo from "./CreateOrUpdateTodo";
import TodoService from "../../services/todo.service";

const TodoContainer = () => {
  const [modal, setModal] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState(null);
  const [todos, setTodos] = React.useState([]);
  const [state, setState] = React.useState({
    loading: false,
    error: null,
  });

  const { getAccessTokenSilently } = useAuth0();
  const { apiOrigin = "http://localhost:3001" } = getConfig();
  let todoService = new TodoService(apiOrigin);

  React.useEffect(() => {
    async function init() {
      const token = await getAccessTokenSilently();
      TodoService.token = token;
      loadTodos();
    }
    init();
  }, []);

  const loadTodos = async () => {
    setState({ loading: true, error: null });
    try {
      const responseData = await todoService.getAll();
      setTodos(responseData);
      setState({ error: null, loading: false });
    } catch (e) {
      setState({ error: e.message || 'unable to fetch todos', loading: false });
    }
  }

  const updateTodo = async (todo, isChecked) => {
    setState({loading: true, error: null});
    try {
      const { data } = await todoService.update({ ...todo, done: isChecked })
      setState({error: null,loading: false});

      setTodos(todos.map(t => {
        if (t.id === data.id) {
          return data
        }
        return t
      }))
    } catch (e) {
      setState({error: e.message || 'unable to udpate todo',loading: false});
    }
  }

  const deleteTodo = async (id) => {
    setState({ loading: true, error: null });
    try {
      await todoService.delete(id)
      setState({ error: null, loading: false });
      setTodos(todos.filter(t => t.id !== id));
    } catch (e) {
      setState({ error: e.message || 'unable to delete todo', loading: false });
    }
  }

  const onEdit = (todo) => {
    setSelectedTodo(todo);
    setModal(true);
  }

  const onDone = (todo) => {
    if (selectedTodo) {
      const udpatedTodos = todos.map(t => {
        if (t.id === todo.id) {
          return todo
        }
        return t
      });
      setTodos(udpatedTodos);

    } else {
      setTodos([...todos, todo]);
    }

    setSelectedTodo(null);
    setModal(false);
  }


  if (state.loading) return <Fragment>Loading...</Fragment>

  return (
    <Fragment>
      {modal && <CreateOrUpdateTodo modal={modal} todo={selectedTodo} setModal={() => {
        setModal(false);
        setSelectedTodo(null);
      }} onDone={onDone} />}
      <h6>
        Todo List <Button color="primary" onClick={() => setModal(true)}>Add New</Button>
      </h6>
      {state.error && <Alert color="danger"><p>{state.error}</p></Alert>}
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onChange={(e) => { updateTodo(todo, e.target.checked) }}
          onDelete={() => deleteTodo(todo.id)}
          onEdit={() => onEdit(todo)} />
      ))}

    </Fragment>
  );
}

export default TodoContainer;