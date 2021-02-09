import { Modal, Button } from 'react-bootstrap';

const Confirm = ({ toggleOpenConfirmWindow, handleRemoveCheckedTasks, removeTasksCount }) => {
    return (
        <Modal
            onHide={toggleOpenConfirmWindow}
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Do You Want to Remove {removeTasksCount} tasks ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={handleRemoveCheckedTasks}>
                    Delete All
          </Button>
                <Button variant="secondary" onClick={toggleOpenConfirmWindow}>
                    Close
          </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default Confirm;