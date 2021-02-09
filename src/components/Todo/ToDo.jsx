import React from 'react';
import Task from '../Task';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Confirm from '../Confirm';
import TaskFormModal from '../TaskFormModal';

class ToDo extends React.Component {
    state = {
        tasks: [],
        removeTasks: new Set(),
        isChecked: false,
        isConfirmWindowOpen: false,
        editTask: null,
        isAddTaskModalOpen: false
    }
    componentDidMount() {
        fetch('http://localhost:3001/task')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({
                    tasks: data,
                })
            })
            .catch(error => {
                console.log('Error Add Task', error);
            })
    }
    toggleOpenAddTaskModal = () => {
        this.setState({
            isAddTaskModalOpen: !this.state.isAddTaskModalOpen
        })
    }
    handleSaveEditTask = (e,task) => {
        if (!task.title) return false;
        const body = {
            ...task
        }
        delete body._id;
        fetch('http://localhost:3001/task/' + task._id, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                const tasks = [...this.state.tasks];
                const idx = tasks.findIndex(t => t._id === data._id);
                tasks[idx] = data;
                this.setState({
                    editTask: null,
                    tasks
                });
            })
            .catch(error => {
                console.log('Error Add Task', error);
            })

    }
    toggleOpenEditTaskModal = (task = null) => {
        this.setState({
            editTask: task
        })
    }
    handleAddTask = (e, formData) => {
        const { key, type } = e;
        if (type === 'keypress' && !key === 'Enter') return;
        if (formData.title === '' ||
            formData.description === '' ||
            formData.date === ''
        ) return;
        const { tasks } = this.state;
        if (
            (type === 'keypress' && key === 'Enter') ||
            type === 'click'
        ) {
            
            fetch('http://localhost:3001/task', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        throw data.error;
                    }
                    const tasksCopy = [...tasks];
                    tasksCopy.push(data);
                    this.setState({
                        isAddTaskModalOpen: false,
                        tasks: tasksCopy,
                    })
                })
                .catch(error => {
                    console.log('Error Add Task', error);
                })


        } else {
            return;
        }

    }
    handleDeleteTask = (taskId) => {

        fetch('http://localhost:3001/task/' + taskId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                const { tasks } = this.state;
                let tasksCopy = [...tasks];
                tasksCopy = tasksCopy.filter(task => task._id !== taskId);
                this.setState({
                    tasks: tasksCopy
                });
            })
            .catch(error => {
                console.log('Error Add Task', error);
            })

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
        const body = {
            tasks: [...removeTasks]
        }
        fetch('http://localhost:3001/task', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }

                tasks = tasks.filter(task => !removeTasks.has(task._id));
                this.setState({
                    tasks,
                    removeTasks: new Set(),
                    isConfirmWindowOpen: false,
                    isChecked: false
                });
            })
            .catch(error => {
                console.log('Error Add Task', error);
            })

    }
    setIsChecked = () => {
        this.setState({
            isChecked: !!this.state.removeTasks.size
        })
    }
    render() {
        const {
            tasks,
            isChecked,
            isConfirmWindowOpen,
            removeTasks,
            editTask,
            isAddTaskModalOpen
        } = this.state;



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
                        handleOpenEditTaskModal={this.toggleOpenEditTaskModal}
                    />
                </Col>
            );
        });
        return (
            <>
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Col md={12} lg={10} xl={8}>
                            <Button
                                variant="primary"
                                onClick={this.toggleOpenAddTaskModal}
                                disabled={removeTasks.size}
                            >
                                Add  New Task
                            </Button>


                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-5">
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
                { isConfirmWindowOpen && (
                    <Confirm
                        toggleOpenConfirmWindow={this.toggleOpenConfirmWindow}
                        handleRemoveCheckedTasks={this.handleRemoveCheckedTasks}
                        removeTasksCount={removeTasks.size}
                    />
                )
                }
                {
                    editTask && (
                        <TaskFormModal
                            onClose={this.toggleOpenEditTaskModal}
                            editTask={editTask}
                            onSave={this.handleSaveEditTask}
                        />
                    )
                }

                {
                    isAddTaskModalOpen && <TaskFormModal
                        onSave={this.handleAddTask}
                        onClose={this.toggleOpenAddTaskModal}
                    />
                }
            </>
        )
    }
}

export default ToDo