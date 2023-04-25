import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Alert } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../../config";
import TodoService from '../../services/todo.service';

const CreateOrUpdateTodo = ({todo, onDone, modal, setModal}) => {
  const [value, setValue] = useState(todo?.title || null);
  const [state, setState] = useState({
      loading: false,
      error: null
  });
  const toggle = () => {
    setValue(null);
    setModal(!modal);
  }

  const { getAccessTokenSilently } = useAuth0();
    const { apiOrigin = "http://localhost:3001", audience } = getConfig();
 
   
  const createTodo = async () => {
    setState({
      loading: true,
      error: null
    })
    try {
      const payload = {
        title: value,
        done: false
      }
      const responseData = await new TodoService(apiOrigin).create(payload)
      setValue(null);
      toggle();
      onDone(responseData.data);
      setState({
        error: null,
        loading: false
      })

    } catch(e) {
      setState({
        error: e.message || 'unable to create todos',
        loading: false
      })
    }
  }

  const updateTodo = async () => {
    try {
      const response =  await new TodoService(apiOrigin).update({...todo, title: value})
      onDone(response.data);
      setState({
        error: null,
        loading: false
      });
    } catch (e) {
      setState({
        error: e.message || 'unable to create todos',
        loading: false
      })
    }
    
  }

  const onAction = () => {
    if(todo) {
      updateTodo();
    } else {
      createTodo();
    }
  }
  
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{todo ? 'Update Todo' : 'Add new todo' }</ModalHeader>
        <ModalBody>
            {state.error && <Alert color="danger">{state.error}</Alert>}
            <Input type="text" placeholder="" value={value} disabled={state.loading} onChange={(e) => setValue(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={state.loading || !value} onClick={onAction}>
            {todo && todo.id ? 'Update' : 'Add'}
          </Button>{' '}
          <Button color="secondary" disabled={state.loading} onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateOrUpdateTodo;