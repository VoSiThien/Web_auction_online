/*
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../reducers/category';
import Pagination from '@material-ui/lab/Pagination';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
  },
  filter: {
    marginTop: theme.spacing(2),
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
    },
  },

  addButton: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  search: {
    marginRight: theme.spacing(2),
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,

    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  pagination: {
    '& > *': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  tableHead: {
    fontWeight: 'bold',
    color: 'red',
  },
}));

const SubCateManager = (props) => {
  var [page, setPage] = useState(1);
  var limit = 5;
  const classes = useStyles();
  const data = useSelector((state) => state.category.data);
  //const loading = useSelector((state) => state.category.loading);
  const dispatch = useDispatch();

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const getListCategoryHandler = useCallback(async ({page, limit}) => {
    try {
      await dispatch(getListCategory({ page, limit })).unwrap();
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getListCategoryHandler({page, limit});
  }, [getListCategoryHandler, page, limit]);

  return (
    <div className={classes.root}>
      <div className={`${classes.tableSection} `}>
        <TableContainer component={Paper} className={classes.section}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell style={{ width: 20, textAlign: 'center' }}>Index</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Category Name</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Sub Category Inside</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.paginationResult?.length > 0 &&
                data.paginationResult.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: 20, textAlign: 'center' }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.cateName}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.subCategories.length}
                    </TableCell>
                    <TableCell>01-01-2021</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        style={{ padding: '0' }}
                        onClick={() => getListCategoryHandler()}></Button>
                      <Button
                        size="small"
                        style={{ padding: '0' }}
                        onClick={() => getListCategoryHandler()}></Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={`${classes.pagination} ${classes.section}`}>
          <Pagination count={data.totalPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler}/>
        </div>
      </div>
    </div>
  );
};
export default SubCateManager;
*/
