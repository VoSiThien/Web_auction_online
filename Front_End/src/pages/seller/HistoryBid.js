import { Container, Form, Button, Tabs, Tab, Table } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory, cancelHistory, confirmHistory } from '../../reducers/historyBid';
import Pagination from '@material-ui/lab/Pagination';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import BiddingModel from '../../components/bidder/bidding';

import {
    makeStyles
} from '@material-ui/core';

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

function HistoryBid() {
    const classes = useStyles();
    const [keys, setKeys] = useState('bid');
    var [page, setPage] = useState(1);
    var limit = 5;
    var prodId = 2;
    const [status, setStatus] = useState(0);
    const data = useSelector((state) => state.history.data);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {
        setOpenModal(false);
    };

    const openModalHandler = () => {
        setOpenModal(true);
    };

    const getListHistoryHandler = useCallback(async ({ page, limit, prodId, status }) => {
        try {
            await dispatch(getListHistory({ page, limit, prodId, status })).unwrap();
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    const ConfirmHandler = useCallback(async (hisId) => {
        try {
            await dispatch(confirmHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 2 });
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    const CancelHandler = useCallback(async (hisId) => {
        try {
            await dispatch(cancelHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 2 });
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);


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
        getListHistoryHandler({ page, limit, prodId, status });
    }, [getListHistoryHandler, page, limit, prodId, status, keys]);

    return (
        <div>
            <Container>
                <BiddingModel
                    isOpen={openModal}
                    onClose={handleClose}
                />
                <Tabs id="controlled-tab-example"
                    activeKey={keys}
                    onSelect={(k) => setKeys(k)}
                    className="mb-3">
                    <Tab eventKey="bid" title="Đấu giá">
                        <Button variant="primary" size="small" onClick={() => openModalHandler()}><BsCheckLg /> đấu giá</Button>
                        <div>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời điểm</th>
                                        <th>Người mua</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.historyList?.length > 0 &&
                                        data.historyList.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.his_created_date}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td>{row.his_price}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className={`${classes.pagination} ${classes.section}`}>
                            <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                        </div>
                    </Tab>
                    <Tab eventKey="confirm" title="Xác nhận">
                        <div>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời điểm</th>
                                        <th>Người mua</th>
                                        <th>Giá</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.historyList?.length > 0 &&
                                        data.historyList.map((row, index) => (
                                            <tr key={index * 2}>
                                                <td>{index + 1}</td>
                                                <td>{row.his_created_date}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td>{row.his_price}</td>
                                                <td>
                                                    <Button variant="primary" size="small" onClick={() => ConfirmHandler(row.his_id)}><BsCheckLg /> Xác nhận</Button>
                                                    <Button variant="danger" size="small" onClick={() => CancelHandler(row.his_id)}><BsXLg /> Từ chối</Button>
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
                    <Tab eventKey="cancel" title="Bị từ chối">
                        <div>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời điểm</th>
                                        <th>Người mua</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.historyList?.length > 0 &&
                                        data.historyList.map((row, index) => (
                                            <tr key={index * 3}>
                                                <td>{index + 1}</td>
                                                <td>{row.his_created_date}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td>{row.his_price}</td>
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
        </div>
    );
}

export default HistoryBid;