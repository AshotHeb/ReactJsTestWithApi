import styles from './addTask.module.css';
import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
class AddTask extends React.Component {
    state = {
        title: '',
        description: '',
        date: new Date()
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
        const { title, description, date } = this.state;
        const { onSave, onClose } = this.props;
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
                        Add Task Form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  onKeyPress={(e) => onSave(e, this.state)}>
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
                </Modal.Body >
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={(e) => onSave(e, this.state)}
                    >
                        Add Task
              </Button>
                    <Button
                        variant="secondary"
                        onClick={() => onClose()}
                    >
                        Close
              </Button>

                </Modal.Footer>
            </Modal >


        );
    };
}

export default AddTask;