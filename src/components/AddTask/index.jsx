import styles from './addTask.module.css';
import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
class AddTask extends React.Component {
    state = {
        inputValue: ''
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            inputValue: value
        })
    }
    clearInputValue = () =>{
        this.setState({
            inputValue:''
        })
    }
    render() {
        const { inputValue } = this.state;
        const { isChecked, handleAddTask } = this.props;
        return (
            <div className={styles.addTaskForm}>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        onChange={this.handleChange}
                        value={inputValue}
                        placeholder="New Tast"
                        onKeyDown={(event) => handleAddTask(event, inputValue ,this.clearInputValue)}
                        disabled={!!isChecked}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-primary"
                            type="button"
                            value="Add Task"
                            onClick={(event) => handleAddTask(event, inputValue ,this.clearInputValue)}
                            disabled={!inputValue || !!isChecked}
                        >
                            Add Task
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    };
}

export default AddTask;