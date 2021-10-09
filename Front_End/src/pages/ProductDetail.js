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
  }
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