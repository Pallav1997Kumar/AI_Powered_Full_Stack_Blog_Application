import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "../../style/authorization/Logout.scss";

import LoginRegisterSideComponent from "./LoginRegisterSideComponent.js";


function Logout() {
	const navigate = useNavigate();

	function loginHandler() {
		navigate("/login");
	}

	return (
		<div className="logout">
			<div className="logout-left-side">
				<LoginRegisterSideComponent />
			</div>
			<div className="logout-right-side">
				<h2 className="heading">You have been successfully logged out.</h2>
				<div className="button-login">
					<Button variant="primary" onClick={loginHandler}>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Logout;
