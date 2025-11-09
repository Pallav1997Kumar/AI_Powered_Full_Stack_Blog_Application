import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "../../style/authorization/DeleteAccount.scss";

import LoginRegisterSideComponent from "./LoginRegisterSideComponent.js";


function DeletedAccount() {
	const navigate = useNavigate();

	function loginHandler() {
		navigate("/login");
	}

	function createAccountHandler() {
		navigate("/register");
	}

	return (
		<div className="delete-account">
			<div className="delete-account-left-side">
				<LoginRegisterSideComponent />
			</div>
			<div className="delete-account-right-side">
				<h2 className="heading">Your account has been successfully deleted.</h2>
				<div className="button-login-create">
					<Button variant="primary" onClick={loginHandler}>
						Login with Another Account
					</Button>
				</div>
				<div className="button-login-create">
					<Button variant="primary" onClick={createAccountHandler}>
						Create New Account
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DeletedAccount;
