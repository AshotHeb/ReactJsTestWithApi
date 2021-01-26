import styles from './task.module.css';
import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

class Task extends React.Component {
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
        // if (true){
        //     throw new Error('fffd');
        // }
        const { task, handleDeleteTask, isChecked } = this.props;
        const { checked } = this.state;
        return (
            <div className={`${styles.card} ${checked ? styles.checked : ''}`}>
                <Card style={{ margin: '0 auto' }}>
                    <input
                        type="checkbox"
                        onClick={this.onCheck}
                    />
                    <Card.Body>
                        <Card.Title>{task.text.slice(2)}</Card.Title>
                        <Card.Text>
                            {task.text}
                        </Card.Text>
                        <Button
                            disabled={!!isChecked}
                            variant="danger"
                            onClick={() => handleDeleteTask(task._id)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                            disabled={!!isChecked}
                            variant="warning"
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