import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import { logout } from "../../store/userDetailSlice.js";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import "../../style/fixed component/NavbarMobile.scss";

import logo from "../../images/logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { BiSolidLeftArrow } from "react-icons/bi";

import backendBaseURL from "../../backendBaseURL.js";


function NavbarMobile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((user) => user.userSlice.userDetail);

	//Getting logged in user detail from local storage
	const currentUser = localStorage.getItem("user");
	const currentUserObject = JSON.parse(currentUser);

	const [displayMenus, setDisplayMenus] = useState(false);

	//Modal Box
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

	useEffect(function () {}, [currentUserObject]);

	async function logoutHandler() {
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/authorization/logout`
			);
			localStorage.removeItem("user");
			Cookies.remove("jwt_access_token");
			dispatch(logout());
			navigate("/logout");
			setShowLogoutModal(false);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteAccountHandler() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await fetch(
				`${backendBaseURL}/api/authorization/deleteAccount/${currentUserObject.userID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();
			navigate("/accountDeleted");
			setShowDeleteAccountModal(false);
			localStorage.removeItem("user");
			dispatch(logout());
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="navbar-mobile">
				<div className="navbar-image">
					<Link to="/" className="">
						<img src={logo} />
					</Link>
				</div>
				<div className="navbar-dropdown">
					<Dropdown data-bs-theme="dark">
						{currentUserObject &&
						<div className="logged-in-container">
							<Dropdown.Toggle
								id="dropdown-button-dark-example1"
								variant="secondary"
							>
							<div className="logged-user-dropdown">
								<div className="div-image">
									<Image
										src={`${currentUserObject.profilePhoto}`}
										roundedCircle
									/>
								</div>
							</div>
							</Dropdown.Toggle>
						</div>}
						{!currentUserObject &&
						<div className="not-logged-in-container">
						<Dropdown.Toggle
							id="dropdown-button-dark-example1"
							variant="secondary"
						>							
							<h4>MENU DROPDOWN</h4>
						</Dropdown.Toggle>
						</div>}
						<Dropdown.Menu>
							{currentUserObject && (
								<Dropdown.Item>
									<div>
										{currentUserObject.fullName}
										<br />({currentUserObject.username})
									</div>
								</Dropdown.Item>
							)}
							{currentUserObject && <Dropdown.Divider />}
							<Dropdown.Item onClick={() => navigate("/")}>HOME</Dropdown.Item>
							<Dropdown.Item onClick={() => navigate("/blogsHome")}>
								BLOGS
							</Dropdown.Item>
							<Dropdown.Item onClick={() => navigate("/contact")}>
								CONTACT US
							</Dropdown.Item>
							<Dropdown.Divider />
							{!currentUserObject && (
								<Dropdown.Item onClick={() => navigate("/login")}>
									LOG IN
								</Dropdown.Item>
							)}
							{!currentUserObject && (
								<Dropdown.Item onClick={() => navigate("/register")}>
									REGISTER
								</Dropdown.Item>
							)}
							{currentUserObject && (
								<Dropdown.Item
									onClick={() =>
										navigate(`/blogs/username/${currentUserObject.username}`)
									}
								>
									View my Post
								</Dropdown.Item>
							)}
							{currentUserObject && (
								<Dropdown.Item
									onClick={() =>
										navigate(`/edit_profile/${currentUserObject.username}`)
									}
								>
									Edit my Profile
								</Dropdown.Item>
							)}
							{currentUserObject && (
								<Dropdown.Item onClick={() => navigate("/write")}>
									Write Post
								</Dropdown.Item>
							)}
							{currentUserObject && (
								<Dropdown.Item onClick={() => setShowDeleteAccountModal(true)}>
									Delete Account
								</Dropdown.Item>
							)}
							{currentUserObject && (
								<Dropdown.Item onClick={() => setShowLogoutModal(true)}>
									Logout
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Logout</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to logout?</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => setShowLogoutModal(false)}>
						No
					</Button>
					<Button variant="danger" onClick={logoutHandler}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				show={showDeleteAccountModal}
				onHide={() => setShowDeleteAccountModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Account</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete your account?</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => setShowDeleteAccountModal(false)}
					>
						No
					</Button>
					<Button variant="danger" onClick={deleteAccountHandler}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default NavbarMobile;
