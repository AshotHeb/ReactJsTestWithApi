import styles from './task.module.css';
import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

class Task extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            isOneTaskChecked: this.props.isChecked
        }

    }
    onCheck = () => {

        const { task, handleCheck } = this.props;
        handleCheck(task._id);
        this.setState({
            checked: !this.state.checked
        })
    }
    render() {
        const { task, handleDeleteTask, isChecked, handleOpenEditTaskModal } = this.props;
        const { checked } = this.state;
        return (
            <div className={`${styles.card} ${checked ? styles.checked : ''}`}>
                <Card style={{ margin: '0 auto'}}>
                    <input
                        type="checkbox"
                        onClick={this.onCheck}
                    />
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>
                            Description :{task.description}
                        </Card.Text>
                        <Card.Text>
                            Date :{task.date.slice(0,10)}
                        </Card.Text>
                        <Card.Text>
                            Created_AT: {task.created_at.slice(0,10)}
                        </Card.Text>

                        <Button
                            disabled={!!isChecked}
                            variant="danger"
                            onClick={() => handleDeleteTask(task._id)}
                            className="mr-5"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                            disabled={!!isChecked}
                            variant="warning"
                            onClick={() => handleOpenEditTaskModal(task)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};
export default Task;