import { Link } from "react-router-dom";

import moment from "moment";

import "../../style/all blogs/AllBlogsPostContainer.scss";
import { getPlainText } from "../../utils/utility functions.js";


function AllBlogsPostContainer(props) {
	const post = props.post;

	return (
		<div className="post-container" id={post._id}>
			<div className="post-desc">
				<Link className="heading-title" to={`/blogs/postId/${post._id}`}>
					<h1>{post.postTitle}</h1>
				</Link>
				<div className="username-posttime">
					<div className="user-name">
						Author:{" "}
						<Link
							to={`/blogs/username/${post.userDetails.username}`}
							className="user-click"
						>
							{post.userDetails.fullName}
						</Link>
					</div>
					<div className="post-time">
						Posted {moment(post.postDateTime).fromNow()}
					</div>
				</div>
				<div className="category-name">
					Category:{" "}
					<Link
						to={`/blogs/category/${post.categoryDetails.categoryName
							.toLowerCase()
							.replaceAll(" ", "_")}_blogs`}
						className="category-click"
					>
						{post.categoryDetails.categoryName}
					</Link>
				</div>
				<div className="post-description">
					{getPlainText(post.postDescription).length > 900 ? (
						<p>
							{getPlainText(post.postDescription).slice(0, 900)}...{" "}
							<Link to={`/blogs/postId/${post._id}`} className="read-more">
								Read More
							</Link>
						</p>
					) : (
						<p>{getPlainText(post.postDescription)}</p>
					)}
				</div>
			</div>
			<div className="post-image">
				<img
					src={`${post.postImage}`}
				/>
			</div>
		</div>
	);
}

export default AllBlogsPostContainer;
