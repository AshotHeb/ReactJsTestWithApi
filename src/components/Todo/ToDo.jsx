import React from 'react';
import Task from '../Task';
import idGenerator from '../../utils/idGenerator';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTaskForm from '../AddTask';
import Confirm from '../Confirm';

class ToDo extends React.Component {
    state = {
        tasks: [
            {
                _id: idGenerator(),
                text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            },
            {
                _id: idGenerator(),
                text: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
            },
        ],
        removeTasks: new Set(),
        isChecked: false,
        isConfirmWindowOpen: false
    }

    handleAddTask = ({ type, key }, inputValue, clearInputValue) => {
        if (type === 'keydown' && !key === 'Enter') return;
        if (!inputValue) return;
        const { tasks } = this.state;
        if (
            (type === 'keydown' && key === 'Enter') ||
            type === 'click'
        ) {

            const tasksCopy = [...tasks];
            tasksCopy.push({
                _id: idGenerator(),
                text: inputValue
            })
            this.setState({
                tasks: tasksCopy,
                inputValue: ''
            }, () => {
                clearInputValue();
            })
        } else {
            return;
        }

    }
    handleDeleteTask = (taskId) => {
        const { tasks } = this.state;
        let tasksCopy = [...tasks];
        tasksCopy = tasksCopy.filter(task => task._id !== taskId);
        this.setState({
            tasks: tasksCopy
        });
    }
    toggleOpenConfirmWindow = () => {
        this.setState({
            isConfirmWindowOpen: !this.state.isConfirmWindowOpen
        })
    }

    handleCheck = (taskId) => {
        const removeTasks = new Set(this.state.removeTasks);
        if (removeTasks.has(taskId))
            removeTasks.delete(taskId);
        else
            removeTasks.add(taskId);

        this.setState({
            removeTasks
        }, () => {
            this.setIsChecked();
        });
    }
    handleRemoveCheckedTasks = () => {
        let tasks = [...this.state.tasks];
        const removeTasks = this.state.removeTasks;
        tasks = tasks.filter(task => !removeTasks.has(task._id));
        this.setState({
            tasks,
            removeTasks: new Set(),
            isConfirmWindowOpen:false
        });
    }
    setIsChecked = () => {
        console.log(this.state.removeTasks.size)
        this.setState({
            isChecked: !!this.state.removeTasks.size
        })
    }
    render() {
        const { tasks, isChecked, isConfirmWindowOpen  ,removeTasks} = this.state;



        const tasksJSX = tasks.map(task => {
            return (
                <Col
                    key={task._id}
                    xs={12}
                    ms={6}
                    md={4}
                    className="mt-5"

                >
                    <Task
                        task={task}
                        handleDeleteTask={this.handleDeleteTask}
                        handleCheck={this.handleCheck}
                        isChecked={isChecked}
                        toggleChecked={this.toggleChecked}
                    />
                </Col>
            );
        });
        return (
            <>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={12} lg={10} xl={8}>
                            <AddTaskForm
                                isChecked={isChecked}
                                handleAddTask={this.handleAddTask}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        {tasksJSX}
                    </Row>

                    <Row className="justify-content-center">
                        <Button
                            variant="outline-danger"
                            disabled={!isChecked}
                            onClick={this.toggleOpenConfirmWindow}
                        >
                            Remove Checked Tasks
                    </Button>
                    </Row>
                </Container>
                { isConfirmWindowOpen && <Confirm
                    toggleOpenConfirmWindow={this.toggleOpenConfirmWindow}
                    handleRemoveCheckedTasks={this.handleRemoveCheckedTasks}
                    removeTasksCount={removeTasks.size}
                />
                }
            </>
        )
    }
}

export default ToDo