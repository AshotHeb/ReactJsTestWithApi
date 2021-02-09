import { Modal, Button, Form } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';

class EditTaskModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ...props.editTask,
            date: props.date ? props.date : new Date()
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
                        Edit Task Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <input type="text" value={title} onChange={this.handleChange} /> */}
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
                    <Button variant="primary" onClick={() => onSave({...this.state ,date:date.toISOString().slice(0,10) })}>
                        Save changes
              </Button>
                    <Button variant="secondary" onClick={() => onClose()}>
                        Close
              </Button>

                </Modal.Footer>
            </Modal>
        );
    }
};

export default EditTaskModal;