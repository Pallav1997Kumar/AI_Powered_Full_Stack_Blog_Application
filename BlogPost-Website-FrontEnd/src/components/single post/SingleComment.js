import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import "../../style/single post/SingleComment.scss";

import backendBaseURL from "../../backendBaseURL.js";


function SingleComment(props) {
	const comment = props.comment;
	
	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);

	const [showDeleteComment, setShowDeleteComment] = useState(false); //Delete Comment Modal
	const [commentEdit, setCommentEdit] = useState(false);
	const [updatedComment, setUpdatedComment] = useState(
		comment.commentDescription
	);

	const [commentUpdateIsError, setCommentUpdateIsError] = useState(false);
	const [commentUpdateSuccessMessage, setCommentUpdateSuccessMessage] =useState(null);
	const [commentUpdateErrorMessage, setCommentUpdateErrorMessage] =useState(null);
	const [isCommentUpdated, setIsCommentUpdated] = useState(false);

	//Checking if comment belongs to logged-in user
	let isUserOwnComment;
	if (user !== null && user.userID == comment.userID) {
		isUserOwnComment = true;
	} else {
		isUserOwnComment = false;
	}

	function handleCommentChangeHandler(event) {
		setUpdatedComment(event.target.value);
	}

	async function handleUpdateComment(event) {
		event.preventDefault();
		const token = Cookies.get("jwt_access_token");
		const userID = user.userID;
		const values = { token, userID, updatedComment };
		const commentID = comment.commentID || comment._id;
		try {
			const response = await axios.put(
				`${backendBaseURL}/api/blogPost/comment/updateComment/${commentID}`,
				values
			);
			setCommentUpdateSuccessMessage(response.data);
			setCommentUpdateErrorMessage(null);
			setCommentUpdateIsError(false);
			setTimeout(() => {
				setCommentEdit(false);
				setTimeout(() => {
					setIsCommentUpdated(true);
				}, 1000);
			}, 2000);
		} catch (error) {
			if (error.message === "Request failed with status code 401") {
				setCommentUpdateErrorMessage(error.response.data);
			} else if (error.message === "Request failed with status code 406") {
				setCommentUpdateErrorMessage(error.response.data);
			} else {
				setCommentUpdateErrorMessage(error.message);
			}
			setCommentUpdateSuccessMessage(null);
			setCommentUpdateIsError(true);
		}
	}

	async function handleCommentDelete() {
		const token = Cookies.get("jwt_access_token");
		const userID = user.userID;
		const values = { token, userID };
		const commentID = comment.commentID || comment._id;
		try {
			const response = await fetch(
				`${backendBaseURL}/api/blogPost/comment/deleteComment/${commentID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();
			setShowDeleteComment(false);
			// Refetch all comments after deletion
			if (props.refetchComments) {
				props.refetchComments();
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
	}
	

	return (
		<>
			<div className="single-comment">
				<div className="comment-name-image-time">
					<div className="comment-image">
						<Image
							src={`${comment.userDetails.userProfilePhoto}`}
							roundedCircle
						/>
					</div>
					<div className="comment-username">
						<h6>
							{comment.userDetails.fullName} ({comment.userDetails.username})
						</h6>
					</div>
					<div className="comment-time">
						{isCommentUpdated ? (
							<p>now</p>
						) : (
							<p>{moment(comment.commentDateTime).fromNow()}</p>
						)}
					</div>
				</div>
				<div className="comment-description">
					{isCommentUpdated ? (
						<p>{updatedComment}</p>
					) : (
						<p>{comment.commentDescription}</p>
					)}
				</div>
				{isUserOwnComment && (
					<div className="edit-delete-comment">
						<div className="edit-comment">
							<p onClick={() => setCommentEdit(true)}>Edit</p>
						</div>
						<div className="delete-comment">
							<p onClick={() => setShowDeleteComment(true)}>Delete</p>
						</div>
					</div>
				)}
			</div>
			{commentEdit && (
				<div className="edit-comment-container">
					<h6>Edit Post</h6>
					<div className="edit-new-comment">
						<form>
							<textarea
								rows="3"
								onChange={handleCommentChangeHandler}
								value={updatedComment}
								placeholder="Write comment"
							></textarea>
							<div className="comment-post-button">
								<Button onClick={handleUpdateComment} variant="light">
									Update the Comment
								</Button>
							</div>
							{commentUpdateIsError ? (
								<div className="comment-error-message">
									<p>{commentUpdateErrorMessage}</p>
								</div>
							) : (
								<div className="comment-success-message">
									<p>{commentUpdateSuccessMessage}</p>
								</div>
							)}
						</form>
					</div>
				</div>
			)}
			<Modal
				show={showDeleteComment}
				onHide={() => setShowDeleteComment(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure, you want to delete the comment? </Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowDeleteComment(false)}
					>
						No
					</Button>
					<Button 
                        variant="danger" 
                        onClick={handleCommentDelete}
                    >
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SingleComment;
