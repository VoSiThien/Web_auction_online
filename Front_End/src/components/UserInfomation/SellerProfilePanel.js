import {
	Grid,
	Paper,
	styled,
	makeStyles,
} from "@material-ui/core";
// import { useTranslation } from "react-i18next";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from 'react-redux';
import { getProfile } from '../../reducers/seller';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100',
		borderBottom: '1px solid #ddd',
		display: 'flex',
		flexDirection: 'column',
		padding: `${theme.spacing(5)}px 20px`,
		alignItems: 'center',
	  },
}));

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
  }));

const BasicProfilePanel = () => {
	// const { t } = useTranslation();
	const classes = useStyles();
	const dispatch = useDispatch();
	
	let accLikeSeller = 0;
	let accDisLikeSeller = 0;
	let accExpUpgrade = "";

    try {
		const { user } = dispatch(
			getProfile()
		).unwrap();
  
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
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Item>Expired Upgrade</Item>
				</Grid>
				<Grid item xs={8}>
					<Item>{accExpUpgrade}</Item>
				</Grid>
				<Grid item xs={4}>
					<Item>Number of Like</Item>
				</Grid>
				<Grid item xs={8}>
					<Item>{accLikeSeller}</Item>
				</Grid>
				<Grid item xs={4}>
					<Item>Number of Dislike</Item>
				</Grid>
				<Grid item xs={8}>
					<Item>{accDisLikeSeller}</Item>
				</Grid>
			</Grid>
	  	</div>
	);
};
export default BasicProfilePanel;
