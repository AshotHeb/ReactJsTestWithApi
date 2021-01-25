import styles from './task.module.css';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Task = ({ task, handleDeleteTask, handleCheck }) => {
    return (
        <Card style={{ margin: '0 auto' }}>
            <input
                type="checkbox"
                onClick={() => handleCheck(task._id)}
            />
            <Card.Body>
                <Card.Title>{task.text.slice(2)}</Card.Title>
                <Card.Text>
                    {task.text}
                </Card.Text>
                <Button
                    variant="danger"
                    onClick={() => handleDeleteTask(task._id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    variant="warning"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </Card.Body>
        </Card>
    );
};
export default Task;