import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  makeStyles,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Edit, Add, Delete } from '@material-ui/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../../reducers/category';
import { postAuctionProduct } from '../../../reducers/users/product';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { format } from 'date-fns';
import DescriptionProduct from './DescriptionModel';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: '10vh',
  },
  content: {
    background: '#fff',
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  mainImage: {
    height: '400px',
    borderRadius: theme.shape.borderRadius,
    background: '#f1f4fb',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 50px)',
    },
  },
  listUpload: {},
  iconAdd: {
    marginBottom: theme.spacing(1),
    background: '#f1f4fb',
  },
  textField: {
    marginBottom: theme.spacing(1),
    '& > p': {
      width: 300,
      fontWeight: 'bold',
    },
  },
  productInformation: {
    width: 'calc(100% - 350px)',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  image: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  menuPaper: {
    maxHeight: 300,
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));

const AddProduct = ({ isOpen, onClose, showSuccess, textAlert }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const [prodImages, setProdImages] = useState([]);
  const [mainImageSrc, setMainImageSrc] = useState(null);
  const [submitIsValid, setSubmitIsValid] = useState(true);
  const [error, setError] = useState('');
  const [prodEndDate, setProdEndDate] = useState('');
  const [prodDescription, setProdDescription] = useState(() => EditorState.createEmpty());
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const prodNameRef = useRef('');
  const prodCategoryIdRef = useRef(0);
  const prodPriceStartingRef = useRef(0);
  const prodPriceStepRef = useRef(0);
  const prodPriceRef = useRef(0);
  // const prodDescriptionRef = useRef('');
  const prodAutoExtendRef = useRef(0);

  const openDescriptionModalHandler = () => {
    setOpenDescriptionModal(true);
  };

  const closeDescriptionModalHandler = () => {
    setOpenDescriptionModal(false);
  };
  
  const fileChangeHandler = (file) => {
    if (file) {
      setProdImages((prevState) => [...prevState, file]);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImageSrc(reader.result);
    };
    reader.onerror = function (error) {
      setMainImageSrc(null);
    };
  };

  const removeFile = (item) => {
    setProdImages((prevState) => prevState.filter((image) => image !== item));
  };

  const getListCategoryHandler = useCallback(async () => {
    try {
      const page = 1;
      const limit = 10000;
      await dispatch(getListCategory({page, limit})).unwrap();
    } catch (err) {
      console.log('🚀 ~ file: Product.js ~ line 166 ~ getListCategoryHandler ~ err', err);
    }
  }, [dispatch]);

  const closeModalHandler = () => {
    setError('');
    onClose();
  };

  const convertContentToHTML = () => {
    return convertToHTML(prodDescription.getCurrentContent());
  }

  const addNewProductHandler = async () => {
    setError('');

    const enteredProdName = prodNameRef.current.value;
    const enteredProdCategoryId = prodCategoryIdRef.current.value;
    const enteredProdPriceStarting = prodPriceStartingRef.current.value;
    const enteredProdPriceStep = prodPriceStepRef.current.value;
    const enteredProdPrice = prodPriceRef.current.value;
    const enteredProdDescription = convertContentToHTML;//prodDescriptionRef.current.value;
    // const enteredProdEndDate = prodEndDateRef.current.value;
    const enteredProdAutoExtend = prodAutoExtendRef.current.value;
    let formData = new FormData();
    console.log(prodEndDate)
    // if (
    //   enteredProdName?.length > 0 &&
    //   enteredProdCategoryId?.length > 0 &&
    //   enteredProdPriceStarting?.length > 0 &&
    //   enteredProdPriceStep?.length > 0 &&
    //   prodEndDate?.length > 0
    // ) {
    //   setSubmitIsValid(true);
    // } else {
    //   setSubmitIsValid(false);
    //   return;
    // }

    for (let i = 0; i < prodImages.length; i++) {
      formData.append('prodImages', prodImages[i]);
    }

    // if(prodImages.length < 3)
    //   return;

    formData.append('prodName', enteredProdName);
    formData.append('prodCategoryId', enteredProdCategoryId);
    formData.append('prodPriceStarting', enteredProdPriceStarting);
    formData.append('prodPriceStep', enteredProdPriceStep);
    formData.append('prodPrice', enteredProdPrice);
    formData.append('prodDescription', enteredProdDescription);
    formData.append('prodEndDate', prodEndDate);
    formData.append('prodAutoExtend', enteredProdAutoExtend);
    console.log(formData)
    // try {
    //   await dispatch(postAuctionProduct(formData)).unwrap();
    //   showSuccess(true);
    //   textAlert('Lưu thành công!!!');
    // } catch (err) {
    //   setError(err);
    //   // console.log('🚀 ~ file: AddProduct.js ~ line 140 ~ addNewProductHandler ~ error', error);
    // }
    onClose();
  };
  
  useEffect(() => {
    getListCategoryHandler();
  }, [dispatch, getListCategoryHandler]);

  useEffect(() => {
    if (prodImages.length > 0) {
      getBase64(prodImages[0]);
    } else {
      setMainImageSrc(null);
    }
  }, [prodImages]);

  const handleVisible = useCallback(() => {
    if (showSuccess === true) {
        setTimeout(() => {
          showSuccess(false)
        }, 5000);
    }
  }, [showSuccess]);

  useEffect(() => {
      handleVisible();
  }, [handleVisible]);

  return (
    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div className={classes.root}>
        <DescriptionProduct 
          isOpen={openDescriptionModal} 
          onClose={closeDescriptionModalHandler}
          prodDescription={prodDescription}
          setProdDescription={setProdDescription}
        />
        <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2}>
            <Typography variant="h5" className={classes.title}>
              Thêm Sản Phẩm mới
            </Typography>
          </Box>
          <form encType="multipart/form-data" className={classes.section}>
            <Box marginBottom={2} className={classes.image}>
              <div className={classes.mainImage}>
                <img
                  alt=""
                  src={mainImageSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={classes.listUpload}>
                <input
                  accept="image/jpeg, image/png"
                  id="img1"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => fileChangeHandler(e.target.files[0])}
                />
                <Box display="flex" flexWrap="wrap" alignItems="center">
                  {prodImages?.length > 0 &&
                    prodImages.map((item, index) => (
                      <Box display="flex" alignItems="center" key={index}>
                        <Typography variant="caption">{item.name}</Typography>
                        <Delete onClick={() => removeFile(item)} />
                      </Box>
                    ))}
                </Box>

                <IconButton color="primary" className={classes.iconAdd}>
                  <label htmlFor="img1" style={{ display: 'flex' }}>
                    <Add />
                  </label>
                </IconButton>
              </div>
            </Box>
            <Box className={classes.productInformation}>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Tên sản phẩm
                </Typography>
                <TextField 
                variant="standard" 
                size="small" 
                fullWidth 
                inputRef={prodNameRef} />
              </div>

              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Danh mục
                </Typography>
                <FormControl variant="standard" size="small" fullWidth>
                  <Select
                    native
                    defaultValue=""
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputRef={prodCategoryIdRef}>
                    {categories?.length === 0 &&(<option aria-label="None" value="" />)}
                    {categories?.length > 0 &&
                      categories.map((cate, index) => (
                        <optgroup label={cate.cateName} key={index}>
                          {cate.subCategories?.length > 0 &&
                            cate.subCategories[0].map((subCate, index) => (
                              <option value={subCate.cateId} key={index}>
                                {subCate.cateName}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Giá bắt đầu (VND)
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                  inputRef={prodPriceStartingRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Bước giá (VND)
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                  inputRef={prodPriceStepRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Giá mua thẳng (VND)
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                  inputRef={prodPriceRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Ngày hết hạn
                </Typography>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                    variant="standard"
                    ampm={false}
                    defaultValue={format(new Date(Date.now()), 'yyyy/MM/dd kk:mm')}
                    // minDate={(new Date(Date.now()))}
                    value={prodEndDate}
                    onChange={(date)=>setProdEndDate(date)}
                    // onError={console.log}
                    disablePast
                    format="yyyy/MM/DD HH:mm"
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Mô tả
                </Typography>
                <Button
                      startIcon={<Edit />}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={openDescriptionModalHandler}>
                      Chỉnh sửa mô tả
                </Button>
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Gia hạn
                </Typography>
                <FormControl variant="standard" size="small" fullWidth>
                  <Select
                    native
                    defaultValue="0"
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputRef={prodAutoExtendRef}>
                    <option value="0">Không gia hạn</option>
                    <option value="1">Gia hạn</option>
                  </Select>
                </FormControl>
              </div>
              {/* {!submitIsValid && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  Tất cả các ô không được bỏ trống
                </FormHelperText>
              )} */}
              {/* {error.length > 0 && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  {error}
                </FormHelperText>
              )} */}

              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 16 }}
                  onClick={addNewProductHandler}>
                  Thêm
                </Button>
                <Button variant="contained" onClick={onClose}>
                  Huỷ
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </div>
    </ProductModal>
  );
};

export default AddProduct;
