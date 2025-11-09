import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/single post/SinglePost.scss";

import SingleOnlyPostSection from "./SingleOnlyPostSection.js";
import CommentSection from "./CommentSection.js";
import backendBaseURL from "../../backendBaseURL.js";


function SingleBlogPost() {

	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);

	useEffect(function () {
		getParticularBlogPost();
	},[]);

	async function getParticularBlogPost() {
		try {
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postId/${blogPostID}`
			);
			setBlogPostDetails(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}


	//Getting Post ID from URL
	const location = useLocation();
	const pathname = location.pathname;
	const splitedArray = pathname.split("/");
	const blogPostID = splitedArray[3];

	const [blogPostDetails, setBlogPostDetails] = useState(null);

	if (!blogPostDetails) {
		return (
			<div className="loading-post">
				Loading post...
			</div>
		);
	}


	//Checking if post belongs to logged-in user
	let isUserOwnPost;
	if (user !== null && user.userID == blogPostDetails[0].userDetails._id) {
		isUserOwnPost = true;
	} else {
		isUserOwnPost = false;
	}

	const indiaDateTime = new Date(blogPostDetails[0].postDateTime).toLocaleString(
		undefined,
		{ timeZone: "Asia/Kolkata" }
	);
	const indianDateTime = new Date(indiaDateTime);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const date = indianDateTime.getDate();
	const month = months[indianDateTime.getMonth()];
	const year = indianDateTime.getFullYear();
	const day = days[indianDateTime.getDay()];
	const hour = indianDateTime.getHours();
	const minute = indianDateTime.getMinutes();
	const second = indianDateTime.getSeconds();
	const millisecond = indianDateTime.getMilliseconds();
	const fullDate = day + " , " + date + " " + month + " " + year + ", " + hour + ":" + minute + ":" + second + ":" + millisecond;


	return (
		<div className="single-post">
			<div className="post-section">
				<SingleOnlyPostSection
					singlePost={blogPostDetails[0]}
					blogPostID={blogPostID}
					isUserOwnPost={isUserOwnPost}
					fullDate={fullDate}
				/>
			</div>
			<div className="comment-section">
				<CommentSection 
					blogPostID={blogPostID} 
				/>
			</div>
		</div>
	);
}

export default SingleBlogPost;
