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
import "../../style/fixed component/NavbarDesktop.scss";

import logo from "../../images/logo.jpg";

import backendBaseURL from "../../backendBaseURL.js";


function NavbarDesktop() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((user) => user.userSlice.userDetail);

	//Getting logged in user detail from local storage
	const currentUser = localStorage.getItem("user");
	const currentUserObject = JSON.parse(currentUser);

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
		<div className="navbar-desktop">
			<div className="navbar-image">
				<Link to="/" className="">
					<img src={logo} />
				</Link>
			</div>
			<div className="navbar-heading">
				<NavLink to="/" className="navbar-navlink">
					HOME
				</NavLink>
				<NavLink to="/blogsHome" className="navbar-navlink">
					BLOGS
				</NavLink>
				<NavLink to="/contact" className="navbar-navlink">
					CONTACT US
				</NavLink>
			</div>
			{currentUserObject ? (
				<div className="user">
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							<div className="logged-user-dropdown">
								<div className="div-image">
									<Image
										src={`${currentUserObject.profilePhoto}`}
										roundedCircle
									/>
								</div>
							</div>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item>
								<div className="user-info">
									{currentUserObject.fullName}
									<br />({currentUserObject.username})
								</div>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item
								onClick={() =>
									navigate(`/blogs/username/${currentUserObject.username}`)
								}
							>
								View my Post
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() =>
									navigate(`/edit_profile/${currentUserObject.username}`)
								}
							>
								Edit my Profile
							</Dropdown.Item>
							<Dropdown.Item onClick={() => navigate("/write")}>
								Write Post
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setShowDeleteAccountModal(true)}>
								Delete Account
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setShowLogoutModal(true)}>
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			) : (
				<div className="login-register">
					<div className="login-register-menu">
						<Button variant="success">
							<NavLink className="login-register-button" to="/register">
								Register
							</NavLink>
						</Button>
					</div>
					<div className="login-register-menu">
						<Button variant="warning">
							<NavLink className="login-register-button" to="/login">
								Login
							</NavLink>
						</Button>
					</div>
				</div>
			)}
			<Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Logout</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to logout?</Modal.Body>
				<Modal.Footer>
					<Button 
                        variant="primary" 
                        onClick={() => setShowLogoutModal(false)}
                    >
						No
					</Button>
					<Button 
                        variant="danger" 
                        onClick={logoutHandler}
                    >
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
					<Button 
                        variant="danger" 
                        onClick={deleteAccountHandler}
                    >
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default NavbarDesktop;
