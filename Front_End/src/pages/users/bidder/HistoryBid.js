import { Container, Table } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory } from '../../../reducers/historyBid';
import Pagination from '@material-ui/lab/Pagination';
import HeaderClear from '../../../components/Layout/HeaderClear';

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
    var [page, setPage] = useState(1);
    var limit = 5;
    var prodId = 1;
    const status = 0;
    const data = useSelector((state) => state.history.data);
    const dispatch = useDispatch();

    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    const getListHistoryHandler = useCallback(async ({ page, limit, prodId, status }) => {
        try {
            await dispatch(getListHistory({ page, limit, prodId, status })).unwrap();
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    useEffect(() => {
        getListHistoryHandler({ page, limit, prodId, status });
    }, [getListHistoryHandler, page, limit, prodId, status]);

    console.log(data)

    return (
        <div>
            <HeaderClear/>
            <Container>
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
            </Container>
        </div>
    );
}

export default HistoryBid;