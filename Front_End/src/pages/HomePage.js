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
          <Container bg="primary">
            <div className="container">
              <div>
                <Carousel className="center">
                  <Carousel.Item>
                    <img
                      className="d-block w-100 photo"
                      src={iphone1}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 photo"
                      src={iphone2}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 photo"
                      src={iphone2}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 photo"
                      src={iphone2}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 photo"
                      src={iphone3}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>

              <Alert variant="warning"><FcAlarmClock className="iconaler" /> 5 sản phẩm gần kết thúc!</Alert>

              <div>
                <Row xs={1} md={2} className="g-2">
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone1} className="subphotorow1" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone1} className="subphotorow1" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
                <Row xs={1} md={3} className="g-2">
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </div>

              <Alert variant="success"><FcDebt className="iconaler" /> 5 sản phẩm có nhiều lượt ra giá nhất!</Alert>

              <div>
                <Row xs={1} md={2} className="g-2">
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone1} className="subphotorow1" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone1} className="subphotorow1" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
                <Row xs={1} md={3} className="g-2">
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </div>

              <Alert variant="primary"><FcCurrencyExchange className="iconaler" /> 5 sản phẩm có giá cao nhất!</Alert>

              <div>
                <Row xs={1} md={2} className="g-2">
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone1} className="subphotorow1" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone1} className="subphotorow1" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
                <Row xs={1} md={3} className="g-2">
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" src={iphone2} />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </div>
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