import { Modal, Container, Button, Tabs, Tab, Table, Alert, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory, cancelHistory, confirmHistory } from '../../reducers/historyBid';
import Pagination from '@material-ui/lab/Pagination';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import {getBidderComment} from '../../reducers/users/seller'
import '../../index.css';
import NumberFormat from 'react-number-format';
import ListCommentBidder from "../../components/seller/listCommentBidder";//export a function
import {
    makeStyles
} from '@material-ui/core';
import { Role } from '../../config/role';
const useStyles = makeStyles((theme) => ({
    section: {
        borderRadius: theme.shape.borderRadius,
        background: 'white',
        boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    pagination: {
        '& > *': {
            justifyContent: 'center',
            display: 'flex',
        },
    }
}));

function HistoryProudctSel({ isOpen, onClose, prod_id }) {
    const classes = useStyles();
    var [page, setPage] = useState(1);
    var limit = 5;
    var prodId = prod_id;
    const [status, setStatus] = useState(0);
    const data = useSelector((state) => state.history.data);
    const dispatch = useDispatch();
    const [keys, setKeys] = useState('bid');
    const [showFailed, setShowFailed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [text, setText] = useState('');
    const [sortByPrice, setSortByPrice] = useState('NON');
    const [isActiveSort1, setIsActiveSort1] = useState(false);
    const [isActiveSort2, setIsActiveSort2] = useState(false);
    const [isActiveSort3, setIsActiveSort3] = useState(false);
    const [hiddenText, setHiddenText] = useState(false);
    const [hiddenText2, setHiddenText2] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [selectedBidderID, setSelectedBidderID] = useState(false);
    const [selectedBidderName, setSelectedBidderName] = useState(false);
    const [openModalCommentBidder, setOpenModalCommentBidder] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    const getListHistoryHandler = useCallback(async ({ page, limit, prodId, status, sortByPrice }) => {
        try {
            var result = await dispatch(getListHistory({ page, limit, prodId, status, sortByPrice })).unwrap();

            if (result.statusCode === 3) {
                setHiddenText(true);
            }
            else if (result.statusCode === 4) {
                setHiddenText2(true);
                setHiddenText(true);
            }
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    const ConfirmHandler = async (hisId, { page, limit, prodId, status, sortByPrice }) => {
        try {
            await dispatch(confirmHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 2, sortByPrice });
            setText('X??c nh???n l?????t ?????u gi?? th??nh c??ng!!!');
            setShowSuccess(true);
        } catch (err) {
            setText(err);
            setShowFailed(true);
        }
    };

    const CancelStatus2Handler = async (hisId, { page, limit, prodId, status, sortByPrice }) => {
        try {
            await dispatch(cancelHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 2, sortByPrice });
            setText('T??? ch???i l?????t ?????u gi?? th??nh c??ng!!!');
            setShowSuccess(true);
        } catch (err) {
            setText(err);
            setShowFailed(true);
        }
    };

    const CancelStatus0Handler = async (hisId, { page, limit, prodId, status, sortByPrice }) => {
        try {
            await dispatch(cancelHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 0, sortByPrice });
            setText('T??? ch???i l?????t ?????u gi?? th??nh c??ng!!!');
            setShowSuccess(true);
        } catch (err) {
            setText(err);
            setShowFailed(true);
        }
    };

 

    const openModalCommentBidderHandler = (bidderID, fullName) => {
        if (isAuthenticated) {
            if (user.role === Role.Seller) {
                setSelectedBidderID(bidderID)
                setSelectedBidderName(fullName);
                setOpenModalCommentBidder(true);
                
            }
        }
    };


    const handleSelectSort = (event, eventKey) => {
        if (Number(event) === 1) {
            setSortByPrice('ASC');
            setIsActiveSort1(true);
            setIsActiveSort2(false);
            setIsActiveSort3(false);
        }
        else if (Number(event) === 2) {
            setSortByPrice('DESC');
            setIsActiveSort1(false);
            setIsActiveSort2(true);
            setIsActiveSort3(false);
        }
        else {
            setSortByPrice('NON');
            setIsActiveSort1(false);
            setIsActiveSort2(false);
            setIsActiveSort3(true);
        }
    }

    useEffect(() => {
        if (keys === 'bid') {
            setStatus(0)
        }
        else if (keys === 'confirm') {
            setStatus(2)
        }
        else if (keys === 'cancel') {
            setStatus(3)
        }
        if (prodId !== undefined && isAuthenticated) {
            getListHistoryHandler({ page, limit, prodId, status, sortByPrice });
        }

    }, [getListHistoryHandler, page, limit, prodId, status, sortByPrice, keys, isOpen]);

    const handleCloseCommentList = () => {
        setOpenModalCommentBidder(false);
    };

    const handleVisible = useCallback(() => {
        if (showFailed === true || showSuccess === true) {
            setTimeout(() => {
                setShowFailed(false)
                setShowSuccess(false)
            }, 5000);
        }
    }, [showFailed, showSuccess]);

    useEffect(() => {
        handleVisible();
    }, [handleVisible]);

    return (
        <div className="modalHis">

            <ListCommentBidder
                isOpen={openModalCommentBidder}
                onClose={handleCloseCommentList}
                bidder_id={selectedBidderID}
                bid_full_name = {selectedBidderName}
            />

            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                style={{ justifyContent: 'center', marginTop: '5%', position: 'center' }}
                fullscreen={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>L???ch s??? ?????u gi??</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
                            <Alert.Heading>{text}</Alert.Heading>
                        </Alert>
                        <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
                            <Alert.Heading>{text}</Alert.Heading>
                        </Alert>
                        <div>
                            <h3 hidden={!hiddenText}>S???n ph???m n??y kh??ng thu???c quy???n s??? h???u c???a b???n!!!</h3>
                            <h4 hidden={!hiddenText2}>S???n ph???m ch??a k???t th??c, kh??ng th??? xem l???ch s???.</h4>
                        </div>
                        <DropdownButton
                            id={`dropdown-variants-primary`}
                            variant={"outline-primary"}
                            title={"S???p x???p"}
                            size="sm"
                            onSelect={handleSelectSort}
                            style={{ marginLeft: '80%', marginBottom: '-2%' }}
                        >
                            <Dropdown.Item eventKey="1" active={isActiveSort1}>Gi?? t??ng d???n</Dropdown.Item>
                            <Dropdown.Item eventKey="2" active={isActiveSort2}>Gi?? gi???m d???n</Dropdown.Item>
                            <Dropdown.Item eventKey="3" active={isActiveSort3}>M???t ?????nh</Dropdown.Item>
                        </DropdownButton>
                        <Tabs id="controlled-tab-example"
                            activeKey={keys}
                            onSelect={(k) => setKeys(k)}
                            className="mb-2">
                            <Tab eventKey="bid" title="?????u gi??">
                                <div>
                                    <Table responsive="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Th???i ??i???m</th>
                                                <th>Ng?????i mua</th>
                                                <th>Gi??</th>
                                                <th>Thao t??c</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.historyList?.length > 0 &&
                                                data.historyList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1 + ((page - 1) * limit)}</td>
                                                        <td>{row.his_created_date}</td>
                                                        <td>{row.acc_full_name}</td>
                                                        <td>
                                                            <NumberFormat
                                                                value={row.his_price}
                                                                variant="standard"
                                                                thousandSeparator={true}
                                                                suffix={' VND'}
                                                                displayType={'text'}
                                                            />
                                                        </td>
                                                        
                                                        <td>
                                                            <Button size="sm" variant="success" disabled={hiddenText} onClick={() => openModalCommentBidderHandler(row.acc_id, row.acc_full_name)}><BsCheckLg /> Xem ????nh gi??</Button>
                                                            <Button size="sm" variant="danger" disabled={hiddenText} onClick={() => CancelStatus0Handler(row.his_id, { page, limit, prodId, status, sortByPrice })}><BsXLg /> T??? ch???i</Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className={`${classes.pagination} ${classes.section}`}>
                                    <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                                </div>
                            </Tab>
                            <Tab eventKey="confirm" title="X??c nh???n" disabled={hiddenText}>
                                <div>
                                    <Table responsive="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Th???i ??i???m</th>
                                                <th>Ng?????i mua</th>
                                                <th>Gi??</th>
                                                <th>Thao t??c</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.historyList?.length > 0 &&
                                                data.historyList.map((row, index) => (
                                                    <tr key={index * 2}>
                                                        <td>{index + 1 + ((page - 1) * limit)}</td>
                                                        <td>{row.his_created_date}</td>
                                                        <td>{row.acc_full_name}</td>
                                                        <td>{row.his_price} VN??</td>
                                                        <td>
                                                            <Button size="sm" variant="success" disabled={hiddenText} onClick={() => openModalCommentBidderHandler(row.acc_id)}><BsCheckLg /> Xem ????nh gi??</Button>
                                                            <Button size="sm" variant="primary" onClick={() => ConfirmHandler(row.his_id, { page, limit, prodId, status, sortByPrice })}><BsCheckLg /> X??c nh???n</Button>
                                                            <Button size="sm" className="ml-1" variant="danger" onClick={() => CancelStatus2Handler(row.his_id, { page, limit, prodId, status, sortByPrice })}><BsXLg /> T??? ch???i</Button>

                                                        </td>
                                                        <td>
                                                            <Button size="sm" className="ml-1" variant="danger" > Xem l???ch s???</Button>{/*add icon here*/}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className={`${classes.pagination} ${classes.section}`}>
                                    <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                                </div>
                            </Tab>
                            <Tab eventKey="cancel" title="B??? t??? ch???i" disabled={hiddenText}>
                                <div>
                                    <Table responsive="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Th???i ??i???m</th>
                                                <th>Ng?????i mua</th>
                                                <th>Gi??</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.historyList?.length > 0 &&
                                                data.historyList.map((row, index) => (
                                                    <tr key={index * 3}>
                                                        <td>{index + 1 + ((page - 1) * limit)}</td>
                                                        <td>{row.his_created_date}</td>
                                                        <td>{row.acc_full_name}</td>
                                                        <td>{row.his_price} VN??</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className={`${classes.pagination} ${classes.section}`}>
                                    <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                                </div>
                            </Tab>
                        </Tabs>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HistoryProudctSel;