import {
	makeStyles,
	Box,
} from "@material-ui/core";
// import { useTranslation } from "react-i18next";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from 'react-redux';
import { getProfile } from '../../reducers/seller';

const useStyles = makeStyles((theme) => ({
	root: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "50px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	  },
}));

const BasicProfilePanel = () => {
	// const { t } = useTranslation();
	const classes = useStyles();
	const dispatch = useDispatch();
	
	let accLikeSeller = 0;
	let accDisLikeSeller = 0;
	let accExpUpgrade = "NONE";

	
	// console.log(user)
    try {
		const { user } = dispatch(
			getProfile()
		).unwrap();
		console.log(user);
		if (user !== null) {
			accLikeSeller = user.accLikeSeller;
			accDisLikeSeller = user.accDisLikeSeller;
			accExpUpgrade = user.accExpUpgrade;
		}
	  } catch (err) {
		// setError(err);
	  }

	return (
		<div className={classes.root}>
			<Box sx={{ 
          		display: 'flex',
				// padding: 10,
          		flexWrap: 'wrap', 
				p: 1,
				m: 1,
			}}>
				<Box sx={{ p: 1 }}>Expired Upgrade:</Box>
				<Box sx={{ p: 1 }}>{accExpUpgrade}</Box>
			</Box>
			<Box sx={{ 
          		display: 'flex',
				// padding: 10,
          		flexWrap: 'wrap', 
				p: 1,
				m: 1,
			}}>
				<Box sx={{ p: 1 }}>Number of Like:</Box>
				<Box sx={{ p: 1 }}>{accLikeSeller}</Box>
			</Box>
			<Box sx={{ 
          		display: 'flex',
				// padding: 10,
          		flexWrap: 'wrap', 
				p: 1,
				m: 1,
			}}>
				<Box sx={{ p: 1 }}>Number of Dislike:</Box>
				<Box sx={{ p: 1 }}>{accDisLikeSeller}</Box>
			</Box>
	  	</div>
	);
};
export default BasicProfilePanel;
