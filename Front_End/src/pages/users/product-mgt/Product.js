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
  Typography,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../reducers/ui';
import SearchInput from '../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Add } from '@material-ui/icons';
import { deleteAuctionProduct, getAuctionProductList } from '../../../reducers/users/product';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import TableError from '../../../components/Table/TableError';
import TableLoading from '../../../components/Table/TableLoading';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { toast } from 'react-toastify';
import Header from '../../../components/Layout/Header';
import Footer from '../../../components/Layout/Footer';
const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '5vh 0',
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

const ProductManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [productInfo, setProductInfo] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  // const loading = useSelector((state) => state.selProduct.loading);
  // const products = useSelector((state) => state.selProduct.data);
  const productInfo = useSelector((state) => state.selProduct);
  const dispatch = useDispatch();
  // let { productList, numPage } = productInfo;
  // const [optionPrice, setOptionPrice] = useState('Price');
  // const [optionType, setOptionType] = useState('Ascending');

  const openAddModalHandler = () => {
    setOpenAddModal(true);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
  };

  const openUpdateModalHandler = (item) => {
    setSelectedItem(item);
    setOpenUpdateModal(true);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };
  const openDeleteModalHandler = (id) => {
    setSelectedId(id);
    setOpenUpdateModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(true);
  };

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const productDeleteHandler = async () => {
    if (!selectedId) return;
    try {
      await dispatch(deleteAuctionProduct(selectedId)).unwrap();
      // toast.success(`Delete product id ${selectedId} successfully`);
      productInfo.productList = productInfo.productList.filter(
        (product) => product.prodId !== selectedId
      );
    } catch (err) {
      toast.error(err);
    }
    closeModalHandler();
  };

  const getAuctionProductListHandler = useCallback(
    async (page = 1) => {
      try {
        const limit = 10;
        // const response = await dispatch(getAuctionProductList({page, limit})).unwrap();
        await dispatch(getAuctionProductList({page, limit})).unwrap();
        // setProductInfo(response);
        // return response;
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getAuctionProductListHandler(page)
  }, [dispatch, getAuctionProductListHandler, page]);

  useEffect(() => {
    document.title = 'Quản Lý Sản Phẩm';
  }, [t]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const addDefaultSrc = (e)=>{
    const errImg = window.location.origin + '/img/no-image-available.jpg';
    e.target.src = errImg
  }

  return (
    <>
      <div className={classes.root}>
        <Header />
          <div className={classes.content}>
            <Container>
              <AddProduct isOpen={openAddModal} onClose={closeModalHandler} />
              <UpdateProduct
                itemInfo={selectedItem}
                isOpen={openUpdateModal}
                onClose={closeModalHandler}
              />
              <ModalConfirm
                title="Xoá sản phẩm"
                isOpen={openDeleteModal}
                onClose={closeModalHandler}
                onConfirm={productDeleteHandler}
              />

              <div className={classes.section}>
                <Typography variant="h5" className={classes.title}>
                Quản Lý Sản Phẩm
                </Typography>
                <div className={classes.filter}>
                  <div className={classes.search}>
                    <SearchInput />
                  </div>

                  <div className={classes.addButton}>
                    <Button
                      startIcon={<Add />}
                      variant="contained"
                      color="primary"
                      className={classes.addButton}
                      onClick={openAddModalHandler}>
                      Mới
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
              <TableContainer component={Paper} className={classes.section}>
                      <Table aria-label="a dense table">
                        <TableHead>
                          <TableRow className={classes.tableHead}>
                            <TableCell>ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Category</TableCell>
                            {/* <TableCell>Current Price</TableCell> */}
                            {/* <TableCell>Highest Price</TableCell> */}
                            <TableCell>Start Price</TableCell>
                            <TableCell>Step Price</TableCell>
                            {/* <TableCell>Price</TableCell> */}
                            <TableCell>End Date</TableCell>
                            <TableCell>Auto Extend</TableCell>
                            {/* <TableCell>Description</TableCell> */}
                            <TableCell>Last Modified</TableCell>
                            <TableCell align="center">Options</TableCell>
                          </TableRow>
                        </TableHead>
                {productInfo.loading ? ( <TableLoading /> ): error?.length > 0 ?
                 (
                  <TableError message={error} onTryAgain={getAuctionProductListHandler} />
                ) : productInfo.data?.length > 0 ? (
                  <>
                        <TableBody>
                          {productInfo.data.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {row.prodId}
                              </TableCell>
                              <TableCell>{row.prodName}</TableCell>
                              <TableCell>
                                <img
                                  src={row.prodMainImage}
                                  alt={row.prodName}
                                  onError={addDefaultSrc}
                                  style={{ width: 100, height: 80, objectFit: 'cover' }}
                                />
                              </TableCell>
                              <TableCell>{row.prodCategoryName}</TableCell>
                              {/* <TableCell>{row.prodPriceCurrent}</TableCell> */}
                              {/* <TableCell>{row.prodPriceHighest}</TableCell> */}
                              <TableCell>{row.prodPriceStarting}</TableCell>
                              <TableCell>{row.prodPriceStep}</TableCell>
                              {/* <TableCell>{row.prodPrice}</TableCell> */}
                              <TableCell>{row.prodEndDate}</TableCell>
                              <TableCell>{row.prodAutoExtend}</TableCell>
                              {/* <TableCell>{row.prodDescription}</TableCell> */}
                              <TableCell>{row.prodUpdatedDate}</TableCell>
                              <TableCell align="center" style={{ minWidth: 150 }}>
                                <EditIcon
                                  onClick={() => openUpdateModalHandler(row)}
                                  fontSize="small"
                                  style={{ marginRight: 5, cursor: 'pointer' }}
                                />
                                <DeleteIcon
                                  fontSize="small"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => openDeleteModalHandler(row.prodId)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                    {/* <div className={`${classes.pagination} ${classes.section}`}>
                      <Pagination
                        count={productInfo.numPage}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        page={page}
                        onChange={pageChangeHandler}
                      />
                    </div> */}
                  </>
                ) : (
                  <TableError message="No data in database" onTryAgain={getAuctionProductListHandler} />
                )}
                  </Table>
                </TableContainer>
              </div>

            <div className={`${classes.pagination} ${classes.section}`}>
                <Pagination count={productInfo.numPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
            </div>
            </Container>
          </div>
        </div>
        <Footer />
      </>
  );
};
export default ProductManager;
