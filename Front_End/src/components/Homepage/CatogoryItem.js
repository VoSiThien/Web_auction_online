import { Container, NavDropdown, Row, Col, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
export const CategoryItem = ({ id, title, items }) => {
    return (
        <>
            <NavDropdown
                id="nav-dropdown-dark-example"
                drop="end"
                title={title} //cu phap de add 1 variable vao attribute cua html
                menuVariant="dark"
            >
                {items?.length > 0 && items.map((item, index) => (
                    <Container className="eventsNav pt-0 mt-0" >
                                <Dropdown.Item>
                                    <Link href={`/collections/${item.cateId}`}>
                                        <a className="nav-link" role="button" >
                                            {item.catName}
                                        </a>
                                    </Link>
                                </Dropdown.Item>
                                
                            
                            {/* <Col xs="12" md="6" className="text-left">
                                <Dropdown.Item>
                                    <Link href="/">
                                        <a className="nav-link" role="button">
                                            Roasting Room
                                        </a>
                                    </Link>
                                </Dropdown.Item>
                            </Col> */}
                            
                    </Container>
                ))}

            </NavDropdown>
        </>
    )
}
export default CategoryItem;