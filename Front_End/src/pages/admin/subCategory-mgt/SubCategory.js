import { useLayoutEffect } from 'react';
import {
  makeStyles,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  withStyles,
  Typography,
  NativeSelect,
  Button,
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../reducers/ui';
import SearchInput from '../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import { Add } from '@material-ui/icons';
import { getListCategory } from '../../../reducers/admin/category'
import { getListSubCategory } from '../../../reducers/admin/subCategory'
/*
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
*/
import TableError from '../../../components/Table/TableError';
import TableLoading from '../../../components/Table/TableLoading';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import Pagination from '@material-ui/lab/Pagination';
import { Role } from '../../../config/role';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 14,
    color: '#FFF',
    height: 17,
    padding: '10px 26px 7px 12px',
    fontFamily: ['Arial'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.down('xs')]: {},
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    // minHeight: '100vh',
    // maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '10vh 0',
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },

  bodytable: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    minHeight: '40vh',
    maxHeight: '40vh',
    // maxHeight: '-webkit-fill-available',
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  topContent: {
    borderRadius: theme.shape.borderRadius,
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
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
      '&:not(:last-child)': {
        marginRight: 0,
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
    },
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
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
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    width: '20%',
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
const CategoryManager = (props) => {//the first character of function always in upper case
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState('');
  const [detail, setDetail] = useState({});
  const [action, setAction] = useState('insert');
  //const totalPage = useSelector((state) => state.subCategory.totalPage);
  const [limit, setLimit] = useState(10);
  const [sub, setSub] = useState([]);
  const [page, setPage] = useState(0);
  const [optionFather, setOptionFather] = useState('');
  const [search, setSearch] = useState('');
  const [fatherCategory, setFatherCategory] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const searchChangeHandler = (value) => {
    setSearch(value);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
    getListChildCategoryHandler(optionFather, value + 1, limit);
  };


  console.log(sub);

  console.log(fatherCategory)

  const getListChildCategoryHandler = useCallback(
    async (cateFather, page, limit) => {
      setPageLoading(true);
      if (!cateFather || cateFather.length <= 0) {
        setPageLoading(false);
        return;
      }
      try {
        const response = await dispatch(
          getListSubCategory({ cateFather, page: page === 0 ? 1 : page, limit })
        ).unwrap();
        setSub(response.subCategories);
        setPageLoading(false);
      } catch (error) {
        setError(error);
        setPageLoading(false);
      }
    },
    [dispatch]
  );

  const fatherCategoryChangeHandler = async (value) => {
    setSub([]);
    setPage(0);
    setOptionFather(value);
    if (value) {
      getListChildCategoryHandler(value, 0, limit);
    }
  };

  const getListFatherCategoryHandler = useCallback(async () => {
    try {
      const response = await dispatch(getListCategory({ page: 1, limit: 9999 })).unwrap();
      setFatherCategory(response.CategoryList);
      if (response.CategoryList.length > 0) {
        fatherCategoryChangeHandler(response.CategoryList[0].cate_id);
      } else {
        setPageLoading(false);
      }
    } catch (err) {
      setError(err);
      setPageLoading(false);
    }
  }, [dispatch]);

  const reloadData = () => {
    setPage(0);
    getListChildCategoryHandler(optionFather, 0, limit);
  };


  useEffect(() => {
    dispatch(uiActions.hideModal());
    getListFatherCategoryHandler();
  }, [dispatch, getListFatherCategoryHandler]);

  useEffect(() => {
    document.title = "Quản lý chuyên mục con"
  });
  return (
    <>
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography variant="h5" className={classes.title}>
            Quản lý chuyên mục con
          </Typography>

          <div className={classes.filter}>
            <div className={classes.search}>
              {/*
              <SearchInput
                placeholder= "Nhập chuyên mục con cần tìm"
                initialValue={search}
                onChange={searchChangeHandler}
              />
              */}
            </div>
            <div className={classes.filterItem}>
              <Typography variant="subtitle2" className={classes.label}>
                Chuyên mục cha:
              </Typography>
              <NativeSelect
                value={optionFather}
                className={classes.select}
                onChange={(e) => fatherCategoryChangeHandler(e.target?.value)}
                name="price"
                input={<BootstrapInput />}>
                <option aria-label="None" value="" />
                {fatherCategory &&
                  fatherCategory.length > 0 &&
                  fatherCategory.map((row, index) => (
                    <option style={{ color: '#F39148' }} value={row.cate_id} key={index}>
                      {row.cate_name}
                    </option>
                  ))}
              </NativeSelect>
            </div>
            <div className={classes.addButton}>
              {/*
              <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<Add />}>
                
              </Button>
            */}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default CategoryManager;
