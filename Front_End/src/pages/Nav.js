import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FcShop } from 'react-icons/fc';

function NavPage() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <FcShop className="iconhome"/> Auction Online</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link> */}
                        <NavDropdown title="Điện tử" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Điện thoại</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Máy tính</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="Bếp" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Chảo chống dính</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Nồi inox</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="dark">Search</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="#deets">Đăng nhập</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">Đăng ký</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavPage;