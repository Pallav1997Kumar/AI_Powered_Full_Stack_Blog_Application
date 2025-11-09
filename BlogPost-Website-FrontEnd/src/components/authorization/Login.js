import { Link, useNavigate } from "react-router-dom";
import { useState, useReducer } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/userDetailSlice.js";

import "../../style/authorization/Login.scss";
import Button from "react-bootstrap/Button";

import LoginRegisterSideComponent from "./LoginRegisterSideComponent.js";
import backendBaseURL from "../../backendBaseURL.js";


function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//All inputs fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [agree, setAgree] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	//All input fields validation check
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);

	function emailAddressChangleHandler(event) {
		setEmail(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidEmail(true);
		} else {
			setIsValidEmail(false);
		}
	}

	function passwordChangleHandler(event) {
		setPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidPassword(true);
		} else {
			setIsValidPassword(false);
		}
	}

	function isAllInputsValid() {
		if (email.trim().length === 0 || password.trim().length === 0) {
			if (email.trim().length === 0) {
				setIsValidEmail(false);
			}
			if (password.trim().length === 0) {
				setIsValidPassword(false);
			}
			return false;
		}
		return true;
	}

	async function submitHandler(event) {
		event.preventDefault();
		const isValidInputs = isAllInputsValid();
		if (isValidInputs) {
			const inputs = { email, password };
			try {
				const response = await axios.post(
					`${backendBaseURL}/api/authorization/login`,
					inputs
				);
				const {
					firstName,
					middleName,
					lastName,
					emailAddress,
					fullName,
					userID,
					jwtToken,
					username,
					gender,
					dob,
					profilePhoto,
				} = response.data;
				const storage = {
					firstName,
					middleName,
					lastName,
					emailAddress,
					fullName,
					userID,
					username,
					gender,
					dob,
					profilePhoto,
				};
				localStorage.setItem("user", JSON.stringify(storage));
				const userDetail = JSON.parse(localStorage.getItem("user"));
				Cookies.set("jwt_access_token", jwtToken);
				dispatch(login(userDetail));
				navigate("/");
			} catch (error) {
				setErrorMessage(error.response.data);
			}
		}
	}

	return (
		<div className="login">
			<div className="login-left-side">
				<LoginRegisterSideComponent />
			</div>
			<div className="login-right-side">
				<h2 className="heading line1">Have an account. </h2>
				<h2 className="heading line2">Login Here</h2>
				<form>
					<div className="login-mandatory-text">
						<p>
							Fields marked as (<span className="mandatory">*</span>) are
							mandatory
						</p>
					</div>
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
					<input type="checkbox" id="agree" onChange={() => setAgree(!agree)} />
					<label className="agree-text" htmlFor="agree">
						{" "}
						I agree to <b>Terms & Conditions</b>.
					</label>
					<br />
					<br />
					<div className="login-button">
						{agree ? (
							<Button variant="primary" onClick={submitHandler}>
								Login
							</Button>
						) : (
							<Button variant="secondary">Login</Button>
						)}
					</div>
					{errorMessage && <p className="error-message">{errorMessage}</p>}
					{/*<button className="btn btn-primary" disabled={!agree} onClick={submitHandler}>Register</button>*/}
					<br />
					<div className="text-not-account">
						Don't have an account 
						<div>
							<Link to="/register">Click Here to register</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
