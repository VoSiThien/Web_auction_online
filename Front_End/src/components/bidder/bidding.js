import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bidProduct } from '../../reducers/users/bidder';


function Bidding({ isOpen, onClose, prod_id, getList }) {
    var [priceBid, setPriceBid] = useState(0);
    var prodId = prod_id;
    const dispatch = useDispatch();
    const [showFailed, setShowFailed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [text, setText] = useState('');

    const onChangeHandler = (value) => {
        setPriceBid(value);
    };

    const handleVisible = () => {
        if (showFailed === true || showSuccess === true) {
            setTimeout(() => {
                setShowFailed(false)
                setShowSuccess(false)
            }, 5000);
        }
    }

    const onClickHandle = async () => {
        try {
            const check = await dispatch(bidProduct({ priceBid, prodId })).unwrap();
            setText(check.message)
            onClose();
            getList();
            setShowSuccess(true);
        } catch (error) {            
            setText(error)
            setShowFailed(true);
            onClose();
            getList();
        }
    };

    useEffect(() => {
        handleVisible();
    }, [handleVisible]);

    return (
        <div>
            <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
                <Alert.Heading>{text}</Alert.Heading>
            </Alert>

            <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading>{text}</Alert.Heading>
            </Alert>

            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đấu giá</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Giá mới</Form.Label>
                            <Form.Control value={priceBid} onChange={(e) => { onChangeHandler(e.target.value) }} type="number" placeholder="vd: 20000" onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-' || evt.key === '+' || evt.key === '.' || evt.key === ',') && evt.preventDefault()} />
                            <Form.Text className="text-muted">
                                Giá của bạn sẽ được bảo mật, người khác sẽ không thể thấy.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={onClickHandle}>Xác nhận</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Bidding;