import { Modal } from 'react-bootstrap';

function NotifyModel({ text, isOpen, onClose }) {
    var Text = text;

    return (
        <div>
            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                style={{ justifyContent: 'center', marginTop: '10%', position: 'center' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Text}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NotifyModel;