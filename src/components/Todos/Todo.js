import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

const Todo = ({ todo, onChange, onDelete, onEdit }) => {
    const [isHovering, setIsHovering] = React.useState(false);

    return (<div style={{cursor: 'pointer', marginBottom: '4px'}} onMouseOver={() => {setIsHovering(true)}} onMouseOut={() => {setIsHovering(false)}}>
        <label style={{cursor: 'pointer'}}>
            <input type="checkbox" checked={todo.done} onChange={onChange} style={{marginRight: '8px'}} />
            <span style={{textDecoration: todo.done ? 'line-through' : 'none'}}>{todo.title}</span>
        </label>
        <FontAwesomeIcon style={{display: isHovering ? 'inline-block' : 'none'}} onClick={onDelete} icon={faTrash} className="ml-2" color="#757575" />
        <FontAwesomeIcon style={{display: isHovering ? 'inline-block' : 'none'}} onClick={onEdit} icon={faEdit} className="ml-2" color="#757575" />
    </div>)
}

export default Todo;