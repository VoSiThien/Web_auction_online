import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { mainColor } from '../utils';
import {
    Container,
    makeStyles,
} from '@material-ui/core';
import { Card, Row, Col, Alert, Carousel } from 'react-bootstrap';
import { FcAlarmClock, FcDebt, FcCurrencyExchange } from 'react-icons/fc';
import iphone1 from '../images/iphone1.jpg';
import iphone2 from '../images/iphone2.jpg';
import iphone3 from '../images/iphone3.jpg';
import '../index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        maxHeight: '-webkit-fill-available',
    },
    content: {
        padding: '5vh 0',
    },
    title: {
        marginBottom: 25,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25,
        },
    },
    form: {
        width: '30rem',
        background: '#fff',
        maxWidth: '100%',
        margin: '0 auto',
        borderRadius: theme.shape.borderRadius,
        padding: '50px 25px',
        [theme.breakpoints.down('xs')]: {
            padding: '35px 15px',
        },
    },
    formControl: {
        display: 'block',
        marginBottom: 15,
    },
    button: {
        '&:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'all !important',
        },
    },
    actions: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& a': {
            color: mainColor,
        },
    },
}));

function Home() {
    const classes = useStyles()
    return (
        <>
            <div className={classes.root}>
                <Header />
                <div className={classes.content}>
                    <Container>
                        <div class="container">
                            {/*Section: Block Content*/}
                            <section>
                                {/* Grid row */}
                                <div className="row">
                                    {/* Grid column */}
                                    <div className="col-md-4 mb-4">
                                        {/* Card */}
                                        <div className>
                                            <div className="view zoom overlay z-depth-2 rounded">
                                                <a href="#!">
                                                    <div className="mask">
                                                        <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" />
                                                        <div className="mask rgba-black-slight" />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="text-center pt-4">
                                                <h5>Fantasy T-shirt</h5>
                                                <p className="mb-2 text-muted text-uppercase small">Shirts</p>
                                                
                                                <hr />
                                                <h6 className="mb-3">12.99 $</h6>
                                                <button type="button" className="btn btn-primary btn-sm mr-1 mb-2"><i className="fas fa-shopping-cart pr-2" />Add to cart</button>
                                                <button type="button" className="btn btn-light btn-sm mr-1 mb-2"><i className="fas fa-info-circle pr-2" />Details</button>
                                                <button type="button" className="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="far fa-heart" /></button>
                                            </div>
                                        </div>
                                        {/* Card */}
                                    </div>
                                    {/* Grid column */}
                                    {/* Grid column */}
                                    <div className="col-md-4 mb-4">
                                        {/* Card */}
                                        <div className>
                                            <div className="view zoom overlay z-depth-2 rounded">
                                               <a href="#!">
                                                    <div className="mask">
                                                        <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" />
                                                        <div className="mask rgba-black-slight" />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="text-center pt-4">
                                                <h5>Fantasy T-shirt</h5>
                                                <p className="mb-2 text-muted text-uppercase small">Shirts</p>
                                                
                                                <hr />
                                                <h6 className="mb-3">12.99 $</h6>
                                                <button type="button" className="btn btn-light btn-sm mr-1 mb-2"><i className="fas fa-info-circle pr-2" />Details</button>
                                                <button type="button" className="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="far fa-heart" /></button>
                                            </div>
                                        </div>
                                        {/* Card */}
                                    </div>
                                    {/* Grid column */}
                                    {/* Grid column */}
                                    <div className="col-md-4 mb-4">
                                        {/* Card */}
                                        <div className>
                                            <div className="view zoom overlay z-depth-2 rounded">
                                               <a href="#!">
                                                    <div className="mask">
                                                        <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg" />
                                                        <div className="mask rgba-black-slight" />
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="text-center pt-4">
                                                <h5>Fantasy T-shirt</h5>
                                                <p className="mb-2 text-muted text-uppercase small">Shirts</p>
                                              
                                                <hr />
                                                <h6 className="mb-3">
                                                    <span className="text-danger mr-1">$12.99</span>
                                                    <span className="text-grey"><s>$36.99</s></span>
                                                </h6>
                                                <button type="button" className="btn btn-primary btn-sm mr-1 mb-2"><i className="fas fa-shopping-cart pr-2" />Add to cart</button>
                                                <button type="button" className="btn btn-light btn-sm mr-1 mb-2"><i className="fas fa-info-circle pr-2" />Details</button>
                                                <button type="button" className="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="far fa-heart" /></button>
                                            </div>
                                        </div>
                                        {/* Card */}
                                    </div>
                                    {/* Grid column */}
                                </div>
                                {/* Grid row */}
                            </section>
                            {/*Section: Block Content*/}

                        </div>

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