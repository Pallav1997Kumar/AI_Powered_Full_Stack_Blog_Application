import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import "../../style/single post/SingleOnlyPostSection.scss";

import LikedBy from "./LikedBy.js";

import backendBaseURL from "../../backendBaseURL.js";
import AISummary from "./AISummary.js";


function SingleOnlyPostSection(props) {
	const navigate = useNavigate();

	const { singlePost, isUserOwnPost, fullDate, blogPostID } = props;

	useEffect(function(){
		fetchBlogPostLikeUserList();
	}, [blogPostID]);

	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);

	const [blogPostLikedList, setBlogPostLikedList] = useState(null);

	//Modals
	const [showDeletePost, setShowDeletePost] = useState(false);

	const [postDeleteErrorMessage, setPostDeleteErrorMessage] = useState(null);
	const [postDeleteSuccessMessage, setPostDeleteSuccessMessage] = useState(null);

	const [userLikedThisPost, setUserLikedThisPost] = useState(false);

	useEffect(function() {
		if (user && blogPostLikedList) {
			const userLikeDetail = blogPostLikedList.filter(function (likeElement) {
				return likeElement.userID == user.userID;
			});
			setUserLikedThisPost(userLikeDetail.length > 0);
		}
	}, [user, blogPostLikedList]);

	async function handleLike() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/blogPostLike/like/newLike/${blogPostID}`,
				values
			);
			setUserLikedThisPost(true);
		} catch (error) {
			console.log(error);
		}
		finally{
			fetchBlogPostLikeUserList();
		}
	}

	async function handleUnlike() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await fetch(
				`${backendBaseURL}/api/blogPost/blogPostLike/unlikePost/${blogPostID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();
			setUserLikedThisPost(false);
		} catch (error) {
			console.log(error);
		}
		finally{
			fetchBlogPostLikeUserList();
		}
	}


	async function fetchBlogPostLikeUserList() {
		try {
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/blogPostLike/${blogPostID}`
			);
			setBlogPostLikedList(response.data);
		} catch (error) {
			console.log(error);
		}
	}


	async function handleDelete() {
		const token = Cookies.get("jwt_access_token");
		const values = { token };
		try {
			const response = await fetch(
				`${backendBaseURL}/api/blogPost/deletePost/${blogPostID}`,
				{
					method: "DELETE",
					body: JSON.stringify(values),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				}
			);
			const data = await response.json();
			setPostDeleteSuccessMessage(data);
			setPostDeleteErrorMessage(null);
			navigate("/");
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
	}

	return (
		<>
			<div className="post-details">
				<img
					src={`${singlePost.postImage}`}
				/>
				<h1>{singlePost.postTitle}</h1>
				<div className="single-post-head-row">
					<div className="user-category">
						<div className="user-and-userimage">
							<div className="userimage">
								<Image
									src={`${singlePost.userDetails.userProfilePhoto}`}
									roundedCircle
								/>
							</div>
							<div className="user-fullname">
								<h4>{singlePost.userDetails.fullName}</h4>
							</div>
						</div>
						<h5>Category: {singlePost.categoryDetails.categoryName}</h5>
						{isUserOwnPost && (
							<div className="delete-update">
								<div className="delete-update-btn">
									<Link
										to={`/blogs/updatePost/postId/${singlePost._id}`}
										state={{ blogDetails: singlePost }}
									>
										<Button variant="warning">Update Post</Button>
									</Link>
								</div>
								<div className="delete-update-btn">
									<Button
										onClick={() => setShowDeletePost(true)}
										variant="danger"
									>
										Delete Post
									</Button>
								</div>
							</div>
						)}
					</div>
					<div className="time">
						<h6>Posted On: {fullDate}</h6>
					</div>
				</div>
				<div className="like-post">
					{user ? (
						<div className="user-like">
							{userLikedThisPost ? (
								<Button onClick={handleUnlike} variant="secondary">
									UnLike The Post
								</Button>
							) : (
								<Button onClick={handleLike} variant="secondary">
									Like The Post
								</Button>
							)}
						</div>
					) : (
						<div className="not-login-like-section"></div>
					)}
					<div className="user-like-list">
						<LikedBy blogPostLikedList={blogPostLikedList} />
					</div>
				</div>
				<div className="post-description"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(singlePost.postDescription),
					}}
				></div>
				<AISummary postDescription={singlePost.postDescription} />
			</div>
			{postDeleteErrorMessage && (
				<div>
					<p className="error-message">{postDeleteErrorMessage}</p>
				</div>
			)}
			<Modal show={showDeletePost} onHide={() => setShowDeletePost(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure, you want to delete the post? </Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeletePost(false)}>
						No
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SingleOnlyPostSection;
