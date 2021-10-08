/*
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { FcShop } from 'react-icons/fc';

import {
	Typography,
	makeStyles,
	IconButton,
} from "@material-ui/core";
import {
	Person,
	ExitToApp
} from "@material-ui/icons";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getHomeCategory } from '../../reducers/homeCategory'
import { authActions as userAuthActions } from "../../reducers/auth";
import { Role } from "../../config/role";

const useStyles = makeStyles((theme) => ({
	root: {}
}));
function Header({ showMenu }) {
	const classes = useStyles({ showMenu });
	const dispatch = useDispatch();
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const homeCatData = useSelector((state) => state.homeCategory.data)// lay tu trong store
	const [toggleUserDropdown, setToggleUserDropdown] = useState(false);

	const toggleUserDropdownHandler = () => {
		setToggleUserDropdown((prevState) => !prevState);
	};

	const logoutHandler = () => {
		dispatch(userAuthActions.logout());
		history.push("/login");
	};

	const getListCategoryHandler = useCallback(async () => {
		try {
			await dispatch(getHomeCategory()).unwrap();//dispatch dung de goi 1 ham trong reducer
		} catch (err) {
			alert(err);
		}
	}, [dispatch]);

	useEffect(() => {//ham khai bao thi phai duoc bo trong useEffect thi no moi chay, ham useEffect auto chay, khi data thay doi no se tu load thay
		getListCategoryHandler();
	}, [getListCategoryHandler]);//gia tri theo doi, khi thay doi thi ham nay se goi lai



	return (
		<>
			{homeCatData.paginationlist?.length > 0 &&
				homeCatData.paginationlist.map((row, index) => (
					<tr key={index}>
						<td>{row.cateName}</td>
					</tr>

				))}

			<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="/">
						<FcShop className="iconhome" /> Auction Online</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<NavDropdown title="Chuyên mục" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Điện thoại</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.1">Máy tính</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="Chuyên mục" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Điện thoại</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.1">Máy tính</NavDropdown.Item>
							</NavDropdown>
							<Container className="eventsNav pt-0 mt-0">
								<Row>
									<Col xs="12" md="6" className="text-left">
										<Dropdown.Header>
											Catering
										</Dropdown.Header>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													Corporate
												</a>
											</Link>
										</Dropdown.Item>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													Private
												</a>
											</Link>
										</Dropdown.Item>

										<Dropdown.Divider />
										<Dropdown.Header>
											
										</Dropdown.Header>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													Barista 101
												</a>
											</Link>
										</Dropdown.Item>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													History of Coffee
												</a>
											</Link>
										</Dropdown.Item>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													Intro to Cafe Snobbery
												</a>
											</Link>
										</Dropdown.Item>
										<Dropdown.Divider className="d-md-none" />
									</Col>

									<Col xs="12" md="6" className="text-left">
										<Dropdown.Header>
											{"  "}
											Rentals
										</Dropdown.Header>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													Fireside Room
												</a>
											</Link>
										</Dropdown.Item>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													Roasting Room
												</a>
											</Link>
										</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Header>
											{"  "}
											Seasonal
										</Dropdown.Header>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link" role="button">
													Coldbrew Night
												</a>
											</Link>
										</Dropdown.Item>
										<Dropdown.Item>
											<Link href="/">
												<a className="nav-link text-wrap" role="button">
													Campfire Coffee Class
												</a>
											</Link>
										</Dropdown.Item>
									</Col>
								</Row>
							</Container>
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
							<IconButton
								aria-label="My profile"
								color="inherit"
								className={classes.iconButton}
								onClick={toggleUserDropdownHandler}
							>
								<Person />
								<ul
									className={`${classes.dropDown} ${toggleUserDropdown ? classes.dropDownActive : ""
										}`}
								>
									{user != null && isAuthenticated && (
										<>
											<li>
												<Link to="/profile">Profile</Link>
											</li>
											{(user.role === Role.Seller) && (
												<li>
													<Link to="/product-mgt">Product Management</Link>
												</li>
											)}
										</>
									)}
									{(user == null || !isAuthenticated) && (
										<li>
											<Link to="/login">Login</Link>
										</li>
									)}
								</ul>
							</IconButton>
							{user != null && isAuthenticated && (
								<IconButton
									aria-label="My profile"
									color="inherit"
									className={classes.iconButton}
									onClick={logoutHandler}
								>
									<ExitToApp />
									<Typography
										variant="caption"
										className={classes.iconButtonCaption}
									>
										Log out
									</Typography>
								</IconButton>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
*/