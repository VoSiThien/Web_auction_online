import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import {
    Container,
    makeStyles,
} from '@material-ui/core';
import { Card, Row, Col, Alert, Carousel, Button, Toast, ToastContainer } from 'react-bootstrap';
import iphone2 from '../images/iphone2.jpg';
import '../index.css';
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductDetail } from '../reducers/unauthorizedProduct';
import BiddingModel from '../components/bidder/bidding';
import { bidAddWatchList } from '../reducers/users/bidder';
import { FcLike } from "react-icons/fc";
import HistoryProductBid from "../components/bidder/historyProduct";
import HistoryProductSel from "../components/seller/historyProduct";
import { getListHistory } from '../reducers/historyBid';
import { Role } from '../config/role';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        maxHeight: '-webkit-fill-available',
    },
    content: {
        padding: '5vh 0',
    }
}));

function Home() {

    //Define neccessary parameter
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);//get authenticated information from local store
    //0.get parameter from FE url, which defined on config/router
    const { productId } = useParams();
    //1.Get data from local store
    //2.Define use state
    //in the beginning, productDetails will be blank, when data loaded, we set the new data to this variable, we cannot use useSelector here
    const [productDetails, setProductDetails] = useState({});//{} is the initial value
    const [openModalbid, setOpenModalbid] = useState(false);
    const [openModalHisBid, setOpenModalHisBid] = useState(false);
    const [openModalHisSel, setOpenModalHisSel] = useState(false);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [isShowButtonBid, setisShowButtonBid] = useState(false);
    const [isShowButtonHis, setisShowButtonHis] = useState(false);
    const [isShowButtonWat, setisShowButtonWat] = useState(false);
    const user = useSelector((state) => state.auth.user);
    //3.create handler
    const getProductDetailHandler = useCallback(async () => {
        try {
            //use reducer function to get data and put it into local store
            const response = await dispatch(getProductDetail({ id: +productId })).unwrap();
            setProductDetails(response.productDetail);//set new state for productDetail with the returned data from BE when user change value
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);


    const handleCloseBid = () => {
        setOpenModalbid(false);
    };

    const openModalHandlerBid = () => {
        setOpenModalbid(true);
    };

    const handleCloseHis = () => {
        setOpenModalHisBid(false);
        setOpenModalHisSel(false);
    };

    const openModalHandlerHis = () => {
        getListHistoryHandler({ page:1, limit:5, prodId: productDetails.prod_id, status:0 });
        if (isAuthenticated) {
            if (user.role === Role.Bidder) {
                setOpenModalHisBid(true);
            }
            else{
                setOpenModalHisSel(true);
            }
        }
    };

    const getListHistoryHandler = useCallback(async ({ page, limit, prodId, status }) => {
        try {
            await dispatch(getListHistory({ page, limit, prodId, status })).unwrap();
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);
  
    const addWatchList = useCallback(async ({ prodId }) => {
      try {
        await dispatch(bidAddWatchList({ prodId })).unwrap();
        setText('Thêm sản phẩm vào danh sách yêu thích thành công! ')
        setShow(true)
      } catch (err) {
        setText(err)
        setShow(true)
  
      }
    }, [dispatch]);
    const toggleShowA = () => setShow(false);
  
    const handleVisible = useCallback(() => {
      if (show === true) {
        setTimeout(() => {
          setShow(false)
        }, 3000);
      }
    }, [show])
  
    useEffect(() => {
      handleVisible();
    }, [handleVisible]);
    //4.use effect
    useEffect(() => {//this function always run first
        if (productId) {
            getProductDetailHandler(productId);
        }
        if (isAuthenticated) {
            if (user.role === Role.Seller) {
                setisShowButtonBid(true);
            }
        }
        else{
            setisShowButtonBid(true);
            setisShowButtonHis(true);
            setisShowButtonWat(true);
        }
    }, [productId]);//when product ID change, use effect will catch it and set new data for product detail, productID must define here

    //5. display data onto the view
    return (
        <>

            <div className={classes.root} >
                <Header />
                <BiddingModel
                    isOpen={openModalbid}
                    onClose={handleCloseBid}
                    prod_id={productDetails.prod_id}
                />
                <HistoryProductBid
                    isOpen={openModalHisBid}
                    onClose={handleCloseHis}
                    prod_id={productDetails.prod_id}
                />
                <HistoryProductSel
                    isOpen={openModalHisSel}
                    onClose={handleCloseHis}
                    prod_id={productDetails.prod_id}
                />
                <div className={classes.content} >
                    <Container>
                        {/*                         
                        <div className="container">
                            {productDetails.prod_name}
                        </div> */}
                        <div className="row">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div id="mdb-lightbox-ui" />
                                <div className="mdb-lightbox">
                                    <div className="row product-gallery mx-1">
                                        <div className="col-12 mb-0 mt-2">
                                            <img src="https://vtitech.vn/wp-content/uploads/2020/10/test-100.png" alt="Italian Trulli" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <h2>{productDetails.prod_name}</h2>
                                <p className="mb-2 text-muted text-uppercase small">Loại sản phẩm : <b>{productDetails.prod_categoryName}</b></p>
                                <ul className="rating">
                                    <li>
                                        <p>Giá thành : {productDetails.prod_price == null ? 0 : productDetails.prod_price} VNĐ</p>
                                    </li>
                                    <li>
                                        <p>Giá khởi điểm : {productDetails.prod_price_starting == null ? 0 : productDetails.prod_price_starting} VNĐ</p>
                                    </li>
                                    <li>
                                        <p>Giá hiện tại : {productDetails.prod_price_current == null ? 0 : productDetails.prod_price_current} VNĐ</p>
                                    </li>
                                    <li>
                                        <p>Giá cao nhất : {productDetails.prod_price_highest == null ? 0 : productDetails.prod_price_highest} VNĐ</p>
                                    </li>
                                    <li>
                                        <p>Bước giá : {productDetails.prod_price_step == null ? 0 : productDetails.prod_price_step} VNĐ</p>
                                    </li>
                                </ul>
                                <div className="table-responsive">
                                    <table className="table table-sm table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <th className="pl-0 w-25" scope="row"><strong>Người bán: </strong></th>
                                                <td><p>{productDetails.prod_seller_id == null ? 'Chưa có thông tin' : productDetails.prod_seller_id} </p></td>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-25" scope="row"><strong>Người giữ giá:</strong></th>
                                                <td><p>{productDetails.prod_price_holder == null ? 'Chưa có thông tin' : productDetails.prod_price_holder} </p></td>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-25" scope="row"><strong>Ngày hết hạn: </strong></th>
                                                <td><p>{productDetails.prod_end_date == null ? 'Chưa có thông tin' : productDetails.prod_end_date}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <Button hidden={isShowButtonBid} variant="outline-primary" onClick={() => openModalHandlerBid()}>Đấu giá</Button>
                                        <Button hidden={isShowButtonHis} variant="outline-info" onClick={() => openModalHandlerHis()}>Xem lịch sử</Button>
                                        <Button hidden={isShowButtonWat} variant="outline-light" onClick={() => addWatchList({ prodId: productDetails.prod_id })}><FcLike className="iconaler" /></Button>
                                        <Toast show={show} onClose={toggleShowA} className="d-inline-block m-1" bg="primary">
                                            <Toast.Header>
                                                <strong className="me-auto">thông báo</strong>
                                            </Toast.Header>
                                            <Toast.Body className="text-white">{text}</Toast.Body>
                                        </Toast>
                                    </div>
                                </div>
                                <hr />
                                <div className="table-responsive mb-2">
                                    <div className="col-12">
                                        <div className="row scroll">
                                            <div className="col">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" className="img-fluid" />
                                                    <div className="mask rgba-white-slight" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" className="img-fluid" />
                                                    <div className="mask rgba-white-slight" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" className="img-fluid" />
                                                    <div className="mask rgba-white-slight" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14a.jpg" className="img-fluid" />
                                                    <div className="mask rgba-white-slight" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15a.jpg" className="img-fluid" />
                                                    <div className="mask rgba-white-slight" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Classic tabs */}
                        <div className="classic-tabs border rounded px-4 pt-1 mt-5" style={{ backgroundColor: "#d9d5d0" }}>
                            <ul className="nav nav-tabs" id="advancedTab" role="tablist">
                                <li className="nav-item active">
                                    <a className="nav-link active show" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews (1)</a>
                                </li>
                            </ul>
                            <div className="tab-content p-5 mb-5" id="advancedTabContent" style={{ backgroundColor: "#ebe9e6" }}>
                                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                    <h5>Mô tả sản phẩm</h5>
                                    <p className="pt-1">{productDetails.prod_description}</p>
                                </div>
                                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                    <h5><span>1</span> review for <span>Fantasy T-shirt</span></h5>
                                    <div className="media mt-3 mb-4">
                                        <img className="d-flex mr-3 z-depth-1" src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" width={62} alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <div className="d-sm-flex justify-content-between">
                                                <p className="mt-1 mb-2">
                                                    <strong>Marthasteward </strong>
                                                    <span>– </span><span>January 28, 2020</span>
                                                </p>

                                            </div>
                                            <p className="mb-0">Nice one, love it!</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="mt-4">Add a review</h5>
                                    <p>Your email address will not be published.</p>

                                    <div>
                                        {/* Your review */}
                                        <div className="md-form md-outline">
                                            <textarea id="form76" className="md-textarea form-control pr-6" rows={4} defaultValue={""} />
                                            <label htmlFor="form76">Your review</label>
                                        </div>
                                        {/* Name */}
                                        <div className="md-form md-outline">
                                            <input type="text" id="form75" className="form-control pr-6" />
                                            <label htmlFor="form75">Name</label>
                                        </div>
                                        {/* Email */}
                                        <div className="md-form md-outline">
                                            <input type="email" id="form77" className="form-control pr-6" />
                                            <label htmlFor="form77">Email</label>
                                        </div>
                                        <div className="text-right pb-2">
                                            <button type="button" className="btn btn-primary">Add a review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Classic tabs */}



                        <section className="text-center mt-5" >
                            <h4>Sản phẩm cùng chuyên mục</h4>
                            {/* Grid row */}
                            <div className="row">
                                <div className="col-md-6 col-lg mb-5">
                                    <Card>
                                        <Card.Img variant="top" src={iphone2} />
                                        <Card.Body>
                                            <Card.Title>Card title</Card.Title>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                    {/* Card */}
                                </div>


                                <div className="col-md-6 col-lg mb-5">
                                    <Card>
                                        <Card.Img variant="top" src={iphone2} />
                                        <Card.Body>
                                            <Card.Title>Card title</Card.Title>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                    {/* Card */}
                                </div>

                                <div className="col-md-6 col-lg mb-5">
                                    <Card>
                                        <Card.Img variant="top" src={iphone2} />
                                        <Card.Body>
                                            <Card.Title>Card title</Card.Title>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                    {/* Card */}
                                </div>

                                <div className="col-md-6 col-lg mb-5">
                                    <Card>
                                        <Card.Img variant="top" src={iphone2} />
                                        <Card.Body>
                                            <Card.Title>Card title</Card.Title>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                    {/* Card */}
                                </div>

                                <div className="col-md-6 col-lg mb-5">
                                    <Card>
                                        <Card.Img variant="top" src={iphone2} />
                                        <Card.Body>
                                            <Card.Title>Card title</Card.Title>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                    {/* Card */}
                                </div>
                            </div>
                        </section>
                    </Container>
                </div>
            </div>
            <div className={classes.content}>
                <Footer />
            </div>
        </>





    );
}

export default Home;