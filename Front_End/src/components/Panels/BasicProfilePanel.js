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
import { useDispatch, useSelector } from "react-redux";
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
		enteredInput: enteredAddress,
		hasError: addressHasError,
		inputBlurHandler: addressBlurHandler,
		inputChangeHandler: addressChangeHandler,
		inputIsValid: addressIsValid,
		inputReset: addressReset,
	} = useInput(Validate.isNotEmpty, data.acc_birthday);

	const phoneNumberChangeHandler = (value) => {
		setPhoneNumber(value);
	};

	const phoneNumberBlurHandler = () => {
		setPhoneNumberIsTouched(true);
	};

	const phoneNumberReset = () => {
		setPhoneNumber("");
		setPhoneNumberIsTouched(false);
	};

	const formIsValid =
		fullNameIsValid && emailIsValid && addressIsValid && phoneNumberIsValid;

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		//if (!formIsValid) return;

		fullNameReset();
		emailReset();
		addressReset();
		phoneNumberReset();
		// xử lí logic ở đây
	};

	useEffect(() => {
        getProfileUser();
    }, [getProfileUser]);
	useEffect(()=>{
		setPhoneNumber(data.acc_phone_number);
	},[data])

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
					label={t("profilepage.fullName")}
					type="text"
					helperText={
						fullNameHasError && "Please enter a valid name."
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
					label={t("profilepage.email")}
					type="email"
					helperText={emailHasError && "Please enter a valid email."}
					fullWidth
					size="small"
					variant="standard"
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
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
					label="Phone Number"
					placeholder="Enter phone number"
					value={phoneNumber}
					onChange={phoneNumberChangeHandler}
					onBlur={phoneNumberBlurHandler}
				/>
				{false && (
					<FormHelperText
						variant="standard"
						className={classes.formHelperText}
					>
						Xin vui lòng nhập số điện thoại hợp lệ
					</FormHelperText>
				)}
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={addressHasError}
					type="date"
					helperText={addressHasError && "Please enter a valid email."}
					fullWidth
					size="small"
					variant="standard"
					value={enteredAddress}
					onChange={addressChangeHandler}
					onBlur={addressBlurHandler}
				/>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				fullWidth
				type="submit"
			>
				Lưu thay đổi
			</Button>
		</form>
	);
};
export default BasicProfilePanel;
