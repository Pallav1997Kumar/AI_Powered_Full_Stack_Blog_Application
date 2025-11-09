import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "../../style/all blogs/NoPostFromUser.scss";
import Button from "react-bootstrap/Button";


function NoPostFromUser(props) {
	const navigate = useNavigate();
	const location = useLocation();

	//Getting username from URL
	const usernameURL = location.pathname.split("/")[3];

	//Getting user detail from Redux Store
	const loggedinUser = useSelector((value) => value.userSlice.userDetail);

	let userOwnProfile = false;
	if (loggedinUser != null) {
		const loggedinUserUsername = loggedinUser.username;
		if (loggedinUserUsername === usernameURL) {
			userOwnProfile = true;
		}
	}

	return (
		<div className="no-post">
			<div className="no-post-heading">
				{userOwnProfile ? (
					<div>
						<h3>YOU HAVE NOT POSTED A BLOGPOST</h3>
						<Button
							className="no-post-button"
							variant="primary"
							onClick={() => {
								navigate("/write");
							}}
						>
							Click Here to Write Blog
						</Button>
					</div>
				) : (
					<h3>USER HAS NOT POSTED A BLOGPOST</h3>
				)}
			</div>
			<div className="no-post-buttons">
				<Button
					className="no-post-button"
					variant="primary"
					onClick={() => {
						navigate("/");
					}}
				>
					Go to Home Page
				</Button>
				<Button
					className="no-post-button"
					variant="primary"
					onClick={() => {
						navigate("/blogsHome");
					}}
				>
					Go to All Blogs Home Page
				</Button>
				<Button
					className="no-post-button"
					variant="primary"
					onClick={() => {
						navigate("/blogs");
					}}
				>
					See all Blogs
				</Button>
			</div>
		</div>
	);
}

export default NoPostFromUser;
