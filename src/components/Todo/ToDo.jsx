import React from 'react';
import styles from './task.module.css';
import Task from '../Task';
import idGenerator from '../../utils/idGenerator';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';


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
            {
                _id: idGenerator(),
                text: 'ccccccccccccccccccccccccccccccc'
            },
            {
                _id: idGenerator(),
                text: 'ddddddddddddddddddddddddddd'
            },
            {
                _id: idGenerator(),
                text: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            },
            {
                _id: idGenerator(),
                text: 'ffffffffffffffffffffffffff'
            }
        ],
        inputValue: '',
        removeTasks: new Set(),
        isChecked: false
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            inputValue: value
        })
    }
    handleAddTask = ({ type, key }) => {
        const { inputValue, tasks } = this.state;
        if (type === 'keydown' && !key === 'Enter') return;
        if (!inputValue) return;

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
    // handleKeyDown = (e) => {
    // enter ov avelacnel task
    //     const { inputValue, tasks } = this.state;
    //     const { key } = e;
    //     if (key !== 'Enter') return;
    //     const tasksCopy = [...tasks];
    //     tasksCopy.push({
    //         _id: idGenerator(),
    //         text: inputValue
    //     })
    //     this.setState({
    //         tasks: tasksCopy,
    //         inputValue: ''
    //     })

    // }

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
            removeTasks: new Set()
        });
    }
    setIsChecked = () => {
        console.log(this.state.removeTasks.size)
        this.setState({
            isChecked: !!this.state.removeTasks.size
        })
    }
    render() {
        const { inputValue, tasks, isChecked } = this.state
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
            )
        })
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={12} lg={10} xl={8}>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text"
                                onChange={this.handleChange}
                                value={inputValue}
                                placeholder="New Tast"
                                onKeyDown={this.handleAddTask}
                                disabled={!!isChecked}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-primary"
                                    type="button"
                                    value="Add Task"
                                    onClick={this.handleAddTask}
                                    disabled={!inputValue ||  !!isChecked}
                                >
                                    Button
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    {tasksJSX}
                </Row>

                <Row className="justify-content-center">
                    <Button
                        variant="outline-danger"
                        onClick={this.handleRemoveCheckedTasks}
                    >
                        Remove Checked Tasks
                    </Button>
                </Row>
            </Container>
        )
    }
}

export default ToDo