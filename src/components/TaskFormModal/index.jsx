import { Modal, Button, Form } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';

class TaskFormModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ...props.editTask,
            date: props.editTask ? new Date(props.editTask.date) : new Date(),
            title: props.editTask ? props.editTask.title : '',
            description: props.editTask ? props.editTask.description : '',
        }
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }
    setDate = (date) => {
        this.setState({
            date: date
        })
    }
    render() {
        const { onClose, onSave } = this.props;
        const { title, date, description } = this.state;

        return (
            <Modal
                onHide={onClose}
                show={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.editTask ? 'Edit Task Modal' : 'Add New Task'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={this.handleChange}
                                value={title}
                                placeholder="Title"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                type="text"
                                name="description"
                                onChange={this.handleChange}
                                value={description}
                                placeholder="Descirption"
                                resize="none"

                            />
                        </Form.Group>
                        <DatePicker
                            selected={date}
                            onChange={date => this.setDate(date)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e) => onSave(e, { ...this.state, date: date.toISOString().slice(0, 10) })}>
                        {this.props.editTask ? 'Save changes' : 'Add Task'}
                    </Button>
                    <Button variant="secondary" onClick={() => onClose()}>
                        Close
              </Button>

                </Modal.Footer>
            </Modal>
        );
    }
};

export default TaskFormModal;