import { Link } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

import "../../style/authorization/Register.scss";
import Button from "react-bootstrap/Button";

import LoginRegisterSideComponent from "./LoginRegisterSideComponent.js";
import backendBaseURL from "../../backendBaseURL.js";


function Register() {
	//All inputs fields
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [gender, setGender] = useState("Male");
	const [dob, setDob] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [agree, setAgree] = useState(false);
	const [isErrorWhileRegistration, setIsErrorWhileRegistration] =
		useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	//All input fields validation check
	const [isValidFirstName, setIsValidFirstName] = useState(true);
	const [isValidLastName, setIsValidLarstName] = useState(true);
	const [isValidUserName, setIsValidUserName] = useState(true);
	const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
	const [isValidGender, setIsValidGender] = useState(true);

	function firstNameChangleHandler(event) {
		setFirstName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidFirstName(true);
		} 
        else {
			setIsValidFirstName(false);
		}
	}

	function middleNameChangleHandler(event) {
		setMiddleName(event.target.value);
	}

	function lastNameChangleHandler(event) {
		setLastName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidLarstName(true);
		} 
        else {
			setIsValidLarstName(false);
		}
	}

	function genderChangleHandler(event) {
		setGender(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidGender(true);
		} 
        else {
			setIsValidGender(false);
		}
	}

	function dateOfBirthChangleHandler(event) {
		setDob(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidDateOfBirth(true);
		} 
        else {
			setIsValidDateOfBirth(false);
		}
	}

	function usernameChangleHandler(event) {
		setUsername(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidUserName(true);
		} 
        else {
			setIsValidUserName(false);
		}
	}

	function emailAddressChangleHandler(event) {
		setEmail(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidEmail(true);
		} 
        else {
			setIsValidEmail(false);
		}
	}

	function passwordChangleHandler(event) {
		setPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidPassword(true);
		} 
        else {
			setIsValidPassword(false);
		}
	}

	function confirmPasswordChangleHandler(event) {
		setConfirmPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidConfirmPassword(true);
		} 
        else {
			setIsValidConfirmPassword(false);
		}
	}

	function isAllInputsValid() {
		if (
			firstName.trim().length === 0 ||
			lastName.trim().length === 0 ||
			gender.trim().length === 0 ||
			email.trim().length === 0 ||
			dob.length === 0 ||
			username.trim().length === 0 ||
			password.trim().length === 0 ||
			confirmPassword.trim().length === 0
		) {
			if (firstName.trim().length === 0) {
				setIsValidFirstName(false);
			}
			if (lastName.trim().length === 0) {
				setIsValidLarstName(false);
			}
			if (gender.trim().length === 0) {
				setIsValidGender(false);
			}
			if (email.trim().length === 0) {
				setIsValidEmail(false);
			}
			if (dob.length === 0) {
				setIsValidDateOfBirth(false);
			}
			if (username.trim().length === 0) {
				setIsValidUserName(false);
			}
			if (password.trim().length === 0) {
				setIsValidPassword(false);
			}
			if (confirmPassword.trim().length === 0) {
				setIsValidConfirmPassword(false);
			}
			return false;
		}
		return true;
	}

	async function submitHandler(event) {
		event.preventDefault();
		const isValidInputs = isAllInputsValid();
		if (isValidInputs) {
			const inputs = {
				firstName,
				middleName,
				lastName,
				gender,
				username,
				dob,
				email,
				password,
				confirmPassword,
			};
			try {
				const response = await axios.post(
					`${backendBaseURL}/api/authorization/register`,
					inputs
				);
				setSuccessMessage(response.data);
				setFirstName("");
				setMiddleName("");
				setLastName("");
				setUsername("");
				setGender("Male");
				setDob("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setErrorMessage("");
				setIsErrorWhileRegistration(false);
			} catch (error) {
				if (error.message === "Request failed with status code 401") {
					setErrorMessage(error.response.data);
				} 
                else if (error.message === "Request failed with status code 409") {
					setErrorMessage(error.response.data);
				} 
                else {
					setErrorMessage(error.message);
				}
				setSuccessMessage("");
				setIsErrorWhileRegistration(true);
			}
		}
	}

	return (
		<div className="register">
			<div className="register-left-side">
				<LoginRegisterSideComponent />
			</div>
			<div className="register-right-side">
				<h2 className="heading line1">Don't have an account. </h2>
				<h2 className="heading line2">Register Here</h2>
				<form>
					<div className="register-mandatory-text">
						<p>
							Fields marked as (<span className="mandatory">*</span>) are
							mandatory
						</p>
					</div>
					<div className="form-container">
						<div className="form-left">
							<label className="text">
								First Name: <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={isValidFirstName ? "value" : "value-invalid"}
								required
								type="text"
								value={firstName}
								onChange={firstNameChangleHandler}
							/>
							<br />
							<br />
							<label className="text">Middle Name: </label>
							<br />
							<input
								className="value"
								type="text"
								value={middleName}
								onChange={middleNameChangleHandler}
							/>
							<br />
							<br />
							<label className="text">
								Last Name: <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={isValidLastName ? "value" : "value-invalid"}
								required
								type="text"
								value={lastName}
								onChange={lastNameChangleHandler}
							/>
							<br />
							<br />
							<label className="text">
								{" "}
								Select Gender <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<div className="gender-name">
								<input
									type="radio"
									name="gender"
									value="Male"
									id="Male"
									checked={gender === "Male"}
									onChange={genderChangleHandler}
								/>
								<label htmlFor="Male">Male</label>
								<br />
								<input
									type="radio"
									name="gender"
									value="Female"
									id="Female"
									checked={gender === "Female"}
									onChange={genderChangleHandler}
								/>
								<label htmlFor="Female">Female</label>
							</div>
							<br />
							<label className="text">
								{" "}
								Select Date of Birth <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={isValidDateOfBirth ? "value" : "value-invalid"}
								required
								type="date"
								value={dob}
								onChange={dateOfBirthChangleHandler}
							/>
							<br />
							<br />
						</div>
						<div className="form-right">
							<label className="text">
								Username: <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={isValidUserName ? "value" : "value-invalid"}
								required
								type="text"
								value={username}
								onChange={usernameChangleHandler}
							/>
							<br />
							<br />
							<label className="text">
								Enter Email ID <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={isValidEmail ? "value" : "value-invalid"}
								required
								type="email"
								value={email}
								onChange={emailAddressChangleHandler}
							/>
							<br />
							<br />
							<label className="text">
								Enter Password <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={isValidPassword ? "value" : "value-invalid"}
								required
								type="password"
								value={password}
								onChange={passwordChangleHandler}
							/>
							<br />
							<br />
							<label className="text">
								Confirm Password <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={isValidConfirmPassword ? "value" : "value-invalid"}
								required
								type="password"
								value={confirmPassword}
								onChange={confirmPasswordChangleHandler}
							/>
							<br />
							<br />
						</div>
					</div>
					<input type="checkbox" id="agree" onChange={() => setAgree(!agree)} />
					<label className="agree-text" htmlFor="agree">
						{" "}
						I agree to <b>Terms & Conditions</b>.
					</label>
					<br />
					<br />
					<div className="register-button">
						{agree ? (
							<Button variant="primary" onClick={submitHandler}>
								Register
							</Button>
						) : (
							<Button variant="secondary">Register</Button>
						)}
					</div>
					{isErrorWhileRegistration ? (
						<p className="error-message">{errorMessage}</p>
					) : (
						<p className="success-message">{successMessage}</p>
					)}
					<div className="text-account">
						Already have an account <br />{" "}
						<Link to="/login">Click Here to Login</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
