import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import Cookies from "js-cookie";
import axios from "axios";

import { update } from "../../store/userDetailSlice.js";

import "../../style/edit profile/EditProfile.scss";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import backendBaseURL from "../../backendBaseURL.js";


function EditProfile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//Initialization of update
	const [infoUpdated, setInfoUpdated] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(
		function () {
			if (!localStorage.getItem("user")) {
				navigate("/login");
			}
		},
		[infoUpdated]
	);

	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);
	// const currentUser = localStorage.getItem("user");
	// const currentUserObject = JSON.parse(currentUser);
	// const user = currentUserObject;

	let FIRST_NAME = "";
	let MIDDLE_NAME = "";
	let LAST_NAME = "";
	let USERNAME = "";
	let GENDER = "";
	let DATE_OF_BIRTH = "";
	let EMAIL_ADDRESS = "";
	if (user != null) {
		FIRST_NAME = user.firstName;
		MIDDLE_NAME = user.middleName;
		LAST_NAME = user.lastName;
		USERNAME = user.username;
		GENDER = user.gender;
		DATE_OF_BIRTH = moment(user.dob).format("YYYY-MM-DD");
		EMAIL_ADDRESS = user.emailAddress;
	}

	//All inputs fields
	const [profilePhoto, setProfilePhoto] = useState();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	//All inputs fields initialized with value which saved to database
	const [firstName, setFirstName] = useState(FIRST_NAME);
	const [middleName, setMiddleName] = useState(MIDDLE_NAME);
	const [lastName, setLastName] = useState(LAST_NAME);
	const [username, setUsername] = useState(USERNAME);
	const [gender, setGender] = useState(GENDER);
	const [dob, setDob] = useState(DATE_OF_BIRTH);
	const [email, setEmail] = useState(EMAIL_ADDRESS);

	//All input fields validation check
	const [isValidFirstName, setIsValidFirstName] = useState(true);
	const [isValidLastName, setIsValidLarstName] = useState(true);
	const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
	const [isValidGender, setIsValidGender] = useState(true);
	const [isValidUserName, setIsValidUserName] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidOldPassword, setIsValidOldPassword] = useState(true);
	const [isValidNewPassword, setIsValidNewPassword] = useState(true);
	const [isValidConfirmNewPassword, setIsValidConfirmNewPassword] =
		useState(true);

	//Initialization of error messages
	const [profilePhotoErrorMessage, setProfilePhotoErrorMessage] = useState("");
	const [basicInfoErrorMessage, setBasicInfoErrorMessage] = useState("");
	const [usernameEmailErrorMessage, setUsernameEmailErrorMessage] =
		useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

	//Initialization of success messages
	const [profilePhotoSuccessMessage, setProfilePhotoSuccessMessage] =
		useState("");
	const [basicInfoSuccessMessage, setBasicInfoSuccessMessage] = useState("");
	const [usernameEmailSuccessMessage, setUsernameEmailSuccessMessage] =
		useState("");
	const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");

	function firstNameChangleHandler(event) {
		setFirstName(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidFirstName(true);
		} else {
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
		} else {
			setIsValidLarstName(false);
		}
	}

	function genderChangleHandler(event) {
		setGender(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidGender(true);
		} else {
			setIsValidGender(false);
		}
	}

	function dateOfBirthChangleHandler(event) {
		setDob(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidDateOfBirth(true);
		} else {
			setIsValidDateOfBirth(false);
		}
	}

	function usernameChangleHandler(event) {
		setUsername(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidUserName(true);
		} else {
			setIsValidUserName(false);
		}
	}

	function emailAddressChangleHandler(event) {
		setEmail(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidEmail(true);
		} else {
			setIsValidEmail(false);
		}
	}

	function oldPasswordChangleHandler(event) {
		setOldPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidOldPassword(true);
		} else {
			setIsValidOldPassword(false);
		}
	}

	function newPasswordChangleHandler(event) {
		setNewPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidNewPassword(true);
		} else {
			setIsValidNewPassword(false);
		}
	}

	function confirmNewPasswordChangleHandler(event) {
		setConfirmNewPassword(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValidConfirmNewPassword(true);
		} else {
			setIsValidConfirmNewPassword(false);
		}
	}

	//Function to check whether basic information input is valid.
	function isBasicInfoInputsValid() {
		if (
			firstName.trim().length === 0 ||
			lastName.trim().length === 0 ||
			gender.trim().length === 0 ||
			dob.length === 0
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
			if (dob.length === 0) {
				setIsValidDateOfBirth(false);
			}
			return false;
		}
		return true;
	}

	//Function for updating basic information
	async function basicInfoUpdateHandler(event) {
		event.preventDefault();
		const isAllBasicInfoValid = isBasicInfoInputsValid();
		const token = Cookies.get("jwt_access_token");
		if (isAllBasicInfoValid) {
			const inputs = { firstName, middleName, lastName, gender, dob, token };
			try {
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/basicInfo/${user.userID}`,
					inputs
				);
				setBasicInfoSuccessMessage(response.data);
				setBasicInfoErrorMessage("");
				let fullName;
				if (middleName.trim() === "") {
					fullName = firstName + " " + lastName;
				} else {
					fullName = firstName + " " + middleName + " " + lastName;
				}
				const updatedUser = {
					...user,
					fullName: fullName,
					firstName: firstName,
					middleName: middleName,
					lastName: lastName,
					gender: gender,
					dob: dob,
				};
				dispatch(update(updatedUser));
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
				if (error.message === "Request failed with status code 403") {
					setBasicInfoErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 417") {
					setBasicInfoErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 401") {
					setBasicInfoErrorMessage(error.response.data);
				} else {
					setBasicInfoErrorMessage(error.message);
				}
				setBasicInfoSuccessMessage("");
				setIsError(true);
			}
		}
	}

	//Function to check whether email address and password is valid
	function isUsernameEmailInputsValid() {
		if (email.trim().length === 0 || username.trim().length === 0) {
			if (email.trim().length === 0) {
				setIsValidEmail(false);
			}
			if (username.trim().length === 0) {
				setIsValidUserName(false);
			}
			return false;
		}
		return true;
	}

	//Function for updating username and email address
	async function usernameEmailUpdateHandler(event) {
		event.preventDefault();
		const isUsernameEmailValid = isUsernameEmailInputsValid();
		const token = Cookies.get("jwt_access_token");
		if (isUsernameEmailValid) {
			const inputs = { email, username, token };
			try {
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/usernameEmail/${user.userID}`,
					inputs
				);
				setUsernameEmailSuccessMessage(response.data);
				setUsernameEmailErrorMessage("");
				const updatedUser = {
					...user,
					username: username,
					emailAddress: email,
				};
				dispatch(update(updatedUser));
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
				if (error.message === "Request failed with status code 409") {
					setUsernameEmailErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 401") {
					setUsernameEmailErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 403") {
					setUsernameEmailErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 417") {
					setUsernameEmailErrorMessage(error.response.data);
				} else {
					setUsernameEmailErrorMessage(error.message);
				}
				setUsernameEmailSuccessMessage("");
				setIsError(true);
			}
		}
	}

	//Function to check whether passwords are valid
	function isPasswordsInputsValid() {
		if (
			oldPassword.trim().length === 0 ||
			newPassword.trim().length === 0 ||
			confirmNewPassword.trim().length === 0
		) {
			if (oldPassword.trim().length === 0) {
				setIsValidOldPassword(false);
			}
			if (newPassword.trim().length === 0) {
				setIsValidNewPassword(false);
			}
			if (confirmNewPassword.trim().length === 0) {
				setIsValidConfirmNewPassword(false);
			}
			return false;
		}
		return true;
	}

	//Function for updating password
	async function passwordUpdateHandler(event) {
		event.preventDefault();
		const isPasswordsValid = isPasswordsInputsValid();
		const token = Cookies.get("jwt_access_token");
		if (isPasswordsValid) {
			const inputs = { oldPassword, newPassword, confirmNewPassword, token };
			try {
				const response = await axios.put(
					`${backendBaseURL}/api/blogUser/update/password/${user.userID}`,
					inputs
				);
				setPasswordSuccessMessage(response.data);
				setPasswordErrorMessage("");
				setIsError(false);
				setInfoUpdated(true);
			} catch (error) {
				if (error.message === "Request failed with status code 401") {
					setPasswordErrorMessage(error.response.data);
				} else if (error.message === "Request failed with status code 403") {
					setPasswordErrorMessage(error.response.data);
				} else {
					setPasswordErrorMessage(error.message);
				}
				setPasswordSuccessMessage("");
				setIsError(true);
			}
		}
	}

	async function handleProfilePhotoUpload() {
		const formData = new FormData();
		formData.append("profilePhoto", profilePhoto);
		const userID = user.userID;
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/imageUpload/profilePhoto?userID=${userID}`,
				formData
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}

	async function profilePhotoUpdateHandler(event) {
		event.preventDefault();
		const imageDetail = await handleProfilePhotoUpload();
		console.log(imageDetail)
		const token = Cookies.get("jwt_access_token");
		const inputs = { imageDetail, token };
		try {
			const response = await axios.put(
				`${backendBaseURL}/api/blogUser/update/profilePhoto/${user.userID}`,
				inputs
			);
			setProfilePhotoSuccessMessage(response.data);
			setProfilePhotoErrorMessage("");
			const updatedUser = { ...user, profilePhoto: imageDetail.path };
			dispatch(update(updatedUser));
			localStorage.setItem("user", JSON.stringify(updatedUser));
			setIsError(false);
			setInfoUpdated(true);
		} catch (error) {
			setProfilePhotoErrorMessage(error.message);
			setProfilePhotoSuccessMessage("");
			setIsError(true);
		}
	}

	return (
		<div>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Change the Profile Photo</Accordion.Header>
					<Accordion.Body>
						<div className="update-image-container">
							<div className="profile-image">
								{user && (
									<Image
										//src={`${backendBaseURL}/uploads/profilePhoto/${user.profilePhoto}`}
										src={`${user.profilePhoto}`}
										roundedCircle
									/>
								)}
							</div>
							<div className="image-text">
								<h6>Want to Change the Profile Picture</h6>
								<label>Upload the image </label>
								<input
									required
									type="file"
									name="profilePhoto"
									onChange={(event) => setProfilePhoto(event.target.files[0])}
								/>
							</div>
						</div>
						<div className="update-btn">
							<Button 
                                onClick={profilePhotoUpdateHandler} 
                                variant="primary"
                            >
								Update
							</Button>
						</div>
						<div className="success-error-container">
							{isError ? (
								<p className="error-update-message">
									{profilePhotoErrorMessage}
								</p>
							) : (
								<p className="success-update-message">
									{profilePhotoSuccessMessage}
								</p>
							)}
						</div>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Change the Basic Information</Accordion.Header>
					<Accordion.Body>
						<form>
							<div className="basic-name-container">
								<div className="basic-name">
									<label>
										First Name: <span className="mandatory">*</span>{" "}
									</label>
									<br />
									<input
										className={
											isValidFirstName ? "value-update" : "value-update-invalid"
										}
										required
										type="text"
										value={firstName}
										onChange={firstNameChangleHandler}
									/>
								</div>
								<div className="basic-name">
									<label>Middle Name: </label>
									<br />
									<input
										className="value-update"
										type="text"
										value={middleName}
										onChange={middleNameChangleHandler}
									/>
								</div>
								<div className="basic-name">
									<label>
										Last Name: <span className="mandatory">*</span>{" "}
									</label>
									<br />
									<input
										className={
											isValidLastName ? "value-update" : "value-update-invalid"
										}
										required
										type="text"
										value={lastName}
										onChange={lastNameChangleHandler}
									/>
								</div>
							</div>
							<div className="basic-other-container">
								<div className="basic-other-gender">
									<label>
										{" "}
										Select Gender <span className="mandatory">*</span>{" "}
									</label>
									<div>
										<input
											type="radio"
											name="gender"
											value="Male"
											id="Male"
											checked={gender === "Male"}
											onChange={genderChangleHandler}
										/>
										<label htmlFor="Male">Male</label>
									</div>
									<div>
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
								</div>
								<div className="basic-other-dob">
									<label>
										{" "}
										Select Date of Birth <span className="mandatory">
											*
										</span>{" "}
									</label>
									<input
										className={
											isValidDateOfBirth
												? "value-update"
												: "value-update-invalid"
										}
										required
										type="date"
										value={dob}
										onChange={dateOfBirthChangleHandler}
									/>
								</div>
							</div>
							<div className="update-btn">
								<Button 
                                    onClick={basicInfoUpdateHandler} 
                                    variant="primary"
                                >
									Update
								</Button>
							</div>
							<div className="success-error-container">
								{isError ? (
									<p className="error-update-message">
										{basicInfoErrorMessage}
									</p>
								) : (
									<p className="success-update-message">
										{basicInfoSuccessMessage}
									</p>
								)}
							</div>
						</form>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>
						Change the Email Address or Username
					</Accordion.Header>
					<Accordion.Body>
						<div className="email-username-container">
							<div className="email-username">
								<label>
									Username: <span className="mandatory">*</span>{" "}
								</label>
								<br />
								<input
									className={
										isValidUserName ? "value-update" : "value-update-invalid"
									}
									required
									type="text"
									value={username}
									onChange={usernameChangleHandler}
								/>
							</div>
							<div className="email-username">
								<label>
									Enter Email ID <span className="mandatory">*</span>{" "}
								</label>
								<br />
								<input
									className={
										isValidEmail ? "value-update" : "value-update-invalid"
									}
									required
									type="email"
									value={email}
									onChange={emailAddressChangleHandler}
								/>
							</div>
						</div>
						<div className="update-btn">
							<Button 
                                onClick={usernameEmailUpdateHandler} 
                                variant="primary"
                            >
								Update
							</Button>
						</div>
						<div className="success-error-container">
							{isError ? (
								<p className="error-update-message">
									{usernameEmailErrorMessage}
								</p>
							) : (
								<p className="success-update-message">
									{usernameEmailSuccessMessage}
								</p>
							)}
						</div>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Change Password</Accordion.Header>
					<Accordion.Body>
						<div className="old-password-container">
							<label>
								Enter Old Password <span className="mandatory">*</span>{" "}
							</label>
							<br />
							<input
								className={
									isValidOldPassword ? "value-update" : "value-update-invalid"
								}
								required
								type="password"
								value={oldPassword}
								onChange={oldPasswordChangleHandler}
							/>
						</div>
						<div className="new-password-container">
							<div className="new-password">
								<label>
									Enter New Password <span className="mandatory">*</span>{" "}
								</label>
								<br />
								<input
									className={
										isValidNewPassword ? "value-update" : "value-update-invalid"
									}
									required
									type="password"
									value={newPassword}
									onChange={newPasswordChangleHandler}
								/>
							</div>
							<div className="new-password">
								<label>
									Re-enter New Password <span className="mandatory">*</span>{" "}
								</label>
								<br />
								<input
									className={
										isValidConfirmNewPassword
											? "value-update"
											: "value-update-invalid"
									}
									required
									type="password"
									value={confirmNewPassword}
									onChange={confirmNewPasswordChangleHandler}
								/>
							</div>
						</div>
						<div className="update-btn">
							<Button 
                                onClick={passwordUpdateHandler} 
                                variant="primary"
                            >
								Update
							</Button>
						</div>
						<div className="success-error-container">
							{isError ? (
								<p className="error-update-message">{passwordErrorMessage}</p>
							) : (
								<p className="success-update-message">
									{passwordSuccessMessage}
								</p>
							)}
						</div>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}

export default EditProfile;
