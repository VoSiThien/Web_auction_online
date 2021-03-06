import {
	Button,
	FormControl,
	FormHelperText,
	makeStyles,
	TextField,
} from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Validate } from "../../helpers";
import { useInput } from "../../hooks/use-input";
import { getProfile } from '../../reducers/users/profile';
import {requestUpgradeSeller} from '../../reducers/users/bidder'
import { useDispatch, useSelector } from "react-redux";
import { accUpdateprofiles } from '../../reducers/users/profile';
import { Role } from '../../config/role';
const useStyles = makeStyles((theme) => ({
	form: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "20px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	},
	formControl: {
		display: "block",
		marginBottom: 15,
	},
	button: {
		"&:disabled": {
			cursor: "not-allowed",
			pointerEvents: "all !important",
		},
	},
}));

const BasicProfilePanel = () => {
	const { t } = useTranslation();
	const classes = useStyles();
	const data = useSelector((state) => state.profile.data);
	const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const user = useSelector((state) => state.auth.user);//get current user role here
	
	const getProfileUser = useCallback(async () => {
		try {
			await dispatch(getProfile()).unwrap();
			
		} catch (err) {
			alert(err);
		}
	}, [dispatch]);


	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);

	const phoneNumberIsValid =
		(Validate.isNotEmpty(phoneNumber) &&
			Validate.isPhoneNumber(phoneNumber)) ||
		phoneNumber === "";

	const phoneNumberHasError = !phoneNumberIsValid && phoneNumberIsTouched;

	const {
		enteredInput: enteredFullName,
		hasError: fullNameHasError,
		inputBlurHandler: fullNameBlurHandler,
		inputChangeHandler: fullNameChangeHandler,
		inputIsValid: fullNameIsValid,
		inputReset: fullNameReset,
	} = useInput(Validate.isNotEmpty, data.acc_full_name);

	const {
		enteredInput: enteredEmail,
		hasError: emailHasError,
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		inputIsValid: emailIsValid,
		inputReset: emailReset,
	} = useInput(
		(value) => Validate.isNotEmpty(value) && Validate.isEmail(value),
		data.acc_email
	);

	const {
		enteredInput: enteredBirthDay,
		hasError: birthDayHasError,
		inputBlurHandler: birthDayBlurHandler,
		inputChangeHandler: birthDayChangeHandler,
		inputIsValid: birthDayIsValid,
		inputReset: birthDayReset,
	} = useInput(Validate.isNotEmpty, data.acc_birthday);

	const phoneNumberChangeHandler = (value) => {
		setPhoneNumber(value);
	};


	const upgradeHandler = useCallback(async () => {
		try {
			await dispatch(requestUpgradeSeller(1)).unwrap();
			setSuccess('Y??u c???u n??ng c???p th??nh c??ng, xin h??y ?????i admin duy???t!')
		} catch (err) {
			setError(err)
			setSuccess('')
		}
	});

	const phoneNumberBlurHandler = () => {
		setPhoneNumberIsTouched(true);
	};

	const phoneNumberReset = () => {
		setPhoneNumber("");
		setPhoneNumberIsTouched(false);
	};

	const formIsValid =
		fullNameIsValid && emailIsValid && birthDayIsValid && phoneNumberIsValid;

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		//if (!formIsValid) return;

		try {
			const result = await dispatch(
				accUpdateprofiles({
					email: enteredEmail,
					fullName: enteredFullName,
					birthday: enteredBirthDay,
					phoneNumber: phoneNumber
				})
			).unwrap();
			setSuccess(result.message)
			setError(null);

		} catch (e) {
			setError(e);
			setSuccess(null)
		}

		// fullNameReset();
		// emailReset();
		// addressReset();
		// phoneNumberReset();
		// x??? l?? logic ??? ????y
	};

	useEffect(() => {
		getProfileUser();
	}, [getProfileUser]);
	useEffect(() => {
		setPhoneNumber(data.acc_phone_number);
	}, [data])
	
	return (
		<form
			noValidate
			autoComplete="off"
			className={classes.form}
			onSubmit={formSubmitHandler}
		>

			<FormControl className={classes.formControl}>
				<TextField
					error={fullNameHasError}
					label="H??? t??n"
					type="text"
					helperText={
						fullNameHasError && "T??n kh??ng ???????c ????? r???ng."
					}
					fullWidth
					size="small"
					variant="standard"
					value={enteredFullName}
					onChange={fullNameChangeHandler}
					onBlur={fullNameBlurHandler}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					error={emailHasError}
					label="Email"
					type="email"
					helperText={emailHasError && "L??m ??n nh???p email h???p l???."}
					fullWidth
					size="small"
					variant="standard"
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={birthDayHasError}
					type="date"
					helperText={birthDayHasError && "L??m ??n nh???p ng??y sinh h???p l???."}
					fullWidth
					size="small"
					variant="standard"
					value={enteredBirthDay}
					onChange={birthDayChangeHandler}
					onBlur={birthDayBlurHandler}
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<PhoneInput
					inputStyle={{
						height: "40px",
						width: "100%",
					}}
					inputClass={phoneNumberHasError && classes.inputInvalid}
					country={"vn"}
					label="S??? ??i???n tho???i"
					placeholder="Nh???p s??? ??i???n tho???i"
					value={phoneNumber}
					onChange={phoneNumberChangeHandler}
					onBlur={phoneNumberBlurHandler}
				/>
				{false && (
					<FormHelperText
						variant="standard"
						className={classes.formHelperText}
					>
						Xin vui l??ng nh???p s??? ??i???n tho???i h???p l???
					</FormHelperText>
				)}
			</FormControl>
			{user != null && (user.isUpgrade == 0 || user.isUpgrade == null ) && user.role === Role.Bidder && (
				<Button
					variant="contained"
					onClick = {upgradeHandler}
					style={{ background: "green", color: 'white', marginBottom: "5px" }}
				>
					Upgrade
				</Button>
			)}
			{user != null && user.isUpgrade == 1 && user.role === Role.Bidder && (
				<p>User hi???n ??ang ch??? upgrade th??nh seller...</p>
			)}
			<Button
				variant="contained"
				color="primary"
				fullWidth
				type="submit"
			>
				L??u thay ?????i
			</Button>

			{error?.length > 0 && (
				<FormHelperText error style={{ marginBottom: 10 }}>
					{error}
				</FormHelperText>
			)}
			{success?.length > 0 && (
				<FormHelperText focused style={{ marginBottom: 10, color: "blue" }}>
					{success}
				</FormHelperText>
			)}
		</form>
	);
};
export default BasicProfilePanel;
