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
                text: 'dsfddddd dffffffffffff dffffffff'
            },
            {
                _id: idGenerator(),
                text: 'dsfddddd dffffffffffff dffffffff'
            },
            {
                _id: idGenerator(),
                text: 'dsfddddd dffffffffffff dffffffff'
            },
            {
                _id: idGenerator(),
                text: 'dsfddddd dffffffffffff dffffffff'
            },
            {
                _id: idGenerator(),
                text: 'dsfddddd dffffffffffff dffffffff'
            },
            {
                _id: idGenerator(),
                text: 'dsfddddd dffffffffffff dffffffff'
            }
        ],
        inputValue: '',
        removeTasks: new Set()
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
        });
    }
    render() {
        const { inputValue, tasks } = this.state
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
                            />
                            <InputGroup.Append>
                                <Button variant="outline-primary"
                                    type="button"
                                    value="Add Task"
                                    onClick={this.handleAddTask}
                                    disabled={!inputValue}
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
            </Container>
        )
    }
}

export default ToDo