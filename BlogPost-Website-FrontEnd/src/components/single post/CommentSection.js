import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import "../../style/single post/CommentSection.scss";
import Button from "react-bootstrap/Button";

import SingleComment from "./SingleComment.js";

import backendBaseURL from "../../backendBaseURL.js";


function CommentSection(props) {
	const blogPostID = props.blogPostID;

	useEffect(function(){
		fetchBlogPostComment();
	}, [blogPostID])

	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);

	const[blogPostAllComments, setBlogPostAllComments] = useState(null);

	const [commentAddIsError, setCommentAddIsError] = useState(false);
	const [commentAddedSuccessMessage, setCommentAddedSuccessMessage] = useState(null);
	const [commentAddedErrorMessage, setCommentAddedErrorMessage] =	useState(null);

	const [newComment, setNewComment] = useState("");

	function handleCommentChangeHandler(event) {
		setNewComment(event.target.value);
	}


	async function fetchBlogPostComment() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/comment/${blogPostID}`);
			setBlogPostAllComments(response.data);
		} catch (error) {
			console.log(error);
		}
	}


	async function handleAddComment(event) {
		event.preventDefault();
		const token = Cookies.get("jwt_access_token");
		const values = { token, newComment };
		let addedCommentObject;
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/comment/newComment/${blogPostID}`,
				values
			);
			await fetchBlogPostComment();
			setNewComment("")
			setCommentAddIsError(false);
			setCommentAddedSuccessMessage(response.data);
			setCommentAddedErrorMessage(null);
		} catch (error) {
			if (error.message === "Request failed with status code 401") {
				setCommentAddedErrorMessage(error.response.data);
			} else if (error.message === "Request failed with status code 406") {
				setCommentAddedErrorMessage(error.response.data);
			} else {
				setCommentAddedErrorMessage(error.message);
			}
			setCommentAddIsError(true);
			setCommentAddedSuccessMessage(null);
		}
	}

	return (
		<>
			<div className="post-comments">
				{user ? (
					<div className="new-comment">
						<form>
							<textarea
								rows="3"
								onChange={handleCommentChangeHandler}
								value={newComment}
								placeholder="Write comment"
							></textarea>
							<div className="comment-post-button">
								<Button onClick={handleAddComment} variant="light">
									Post the Comment
								</Button>
							</div>
							{commentAddIsError ? (
								<div className="comment-error-message">
									<p>{commentAddedErrorMessage}</p>
								</div>
							) : (
								<div className="comment-success-message">
									<p>{commentAddedSuccessMessage}</p>
								</div>
							)}
						</form>
					</div>
				) : (
					<div className="login-for-comment">
						<h5>You are not logged in</h5>
						<h5>Please login for commenting on Post</h5>
						<div className="login-button">
							<Button variant="light">
								<NavLink className="login-comment" to="/login">
									Login
								</NavLink>
							</Button>
						</div>
					</div>
				)}
				<div className="previous-comments">
					<h3>Comments</h3>
					{blogPostAllComments && blogPostAllComments.map(function (blogPostEachComment) {
						return (
							<SingleComment 
								key={blogPostEachComment._id} 
								comment={blogPostEachComment}
								refetchComments={fetchBlogPostComment} 
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default CommentSection;
