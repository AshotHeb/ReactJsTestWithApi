import { Modal, Button } from 'react-bootstrap';
import React from 'react';

class EditTaskModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ...props.editTask
        }
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            title: value
        })
    }
    render() {
        const { onClose, onSave } = this.props;
        const { title } = this.state
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
                        Do You Want to Remove  tasks ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={title} onChange={this.handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => onSave(this.state)}>
                        Save changes
              </Button>
                    <Button variant="secondary" onClick={()=>onClose()}>
                        Close
              </Button>

                </Modal.Footer>
            </Modal>
        );
    }
};

export default EditTaskModal;