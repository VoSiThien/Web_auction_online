import {
	Box,
	Container,
	Card,
	CardHeader,
	CardContent,
	makeStyles,
	Paper,
	Tab,
	Tabs,
} from "@material-ui/core";
import * as React from 'react';
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Role }  from "../../config/role";
import BasicProfilePanel from "../../components/Panels/BasicProfilePanel";
import SellerProfilePanel from "../../components/UserInfomation/SellerProfilePanel";
// import AvatarPanel from "../../components/Panels/AvatarPanel";
import ChangePasswordPanel from "../../components/Panels/ChangePasswordPanel";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		padding: "10vh 0",
	},
	tabPanel: {
		background: "#fff",
	},
	tabs: {
		borderBottom: "1px solid #ddd",
	},
	tabActive: {
		background: theme.palette.primary.main,
	},
	label: {
		color: "#fff",
	},
	boxstyle:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	carheader:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    	fontfamily: "Roboto",
	},
	carcontent:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    	fontfamily: "Roboto",
	}
}));

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};


const Profile = (props) => {
	const user = useSelector((state) => state.auth.user);
	const history = useHistory();
	let { slug } = useParams();
	const classes = useStyles();
	const [tabValue, setTabValue] = useState(0);
	const { t } = useTranslation();
	const indexToTabName = {
		0: "basic",
		1: "password",
		2: "avatar",
	};
	const tabChangeHandler = (event, newValue) => {
		history.push(`/profile/${indexToTabName[newValue]}`);
		setTabValue(newValue);
	};

	useEffect(() => {
		const tabNameToIndex = {
			basic: 0,
			password: 1,
			avatar: 2,
		};
		setTabValue(tabNameToIndex[slug || "basic"]);
	}, [slug]);

	useEffect(() => {
		document.title = t("profilepage.title");
	}, [t]);

	const cardBidder = (
		<React.Fragment>
			<CardHeader
				className={classes.carheader}
				justifyContent="center" 
				alignItems="center"
				title='Bidder Infomation'
				variant="body2"
			/>
		  <CardContent 
				className={classes.carcontent}>
		  	<BasicProfilePanel />
		  </CardContent>
		</React.Fragment>
	  );
	const cardSeller = (
		<React.Fragment>
			<CardHeader
				className={classes.carheader}
				justifyContent="center" 
				alignItems="center"
				title='Seller Infomation'
				variant="body2"
			/>
		  <CardContent
				className={classes.carcontent}>
		  	<SellerProfilePanel />
		  </CardContent>
		</React.Fragment>
	  );
	return (
		<>
			<Header />
			<div className={classes.root}>
				<Container>
					<Paper>
						<Tabs
							indicatorColor="primary"
							value={tabValue}
							onChange={tabChangeHandler}
							variant="fullWidth"
							className={classes.tabs}
							TabIndicatorProps={{ className: classes.tabActive }}
						>
							<Tab label={t("profilepage.tabTitle.1")} />
							<Tab label={t("profilepage.tabTitle.2")} />
							{/* <Tab label={t("profilepage.tabTitle.3")} /> */}
						</Tabs>
					</Paper>
					<TabPanel
						value={tabValue}
						index={0}
						className={classes.tabPanel}
					>
						<Box className={classes.boxstyle}
							sx={{ typography: 'body2', }}>
      						<Card variant="outlined">{cardBidder}</Card>
    					</Box>
						{user != null && user.role === Role.Seller && (
						<Box className={classes.boxstyle}
							sx={{ typography: 'body2' }}>
      						<Card variant="outlined">{cardSeller}</Card>
    					</Box>
						)}
					</TabPanel>
					<TabPanel
						value={tabValue}
						index={1}
						className={classes.tabPanel}
					>
						<ChangePasswordPanel />
					</TabPanel>
					{/* <TabPanel
						value={tabValue}
						index={2}
						className={classes.tabPanel}
					>
						<AvatarPanel />
					</TabPanel> */}
				</Container>
			</div>
			<Footer />
		</>
	);
};

export default Profile;
