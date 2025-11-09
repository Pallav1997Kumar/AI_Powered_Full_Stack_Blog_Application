import { useNavigate } from "react-router-dom";

import "../../style/blog home/CategoryCard.scss";

import BlogPostCard from "./BlogPostCard.js";

import backendBaseURL from "../../backendBaseURL.js";


function CategoryCard(props) {
	const navigate = useNavigate();

	const displayBlogs = props.blogsDisplay;
	const displayBlogsForDesktop = displayBlogs;
	const displayBlogsForTablet = displayBlogs.slice(0,3);
	const displayBlogsForMobileOne = displayBlogs.slice(0,2);
	const displayBlogsForMobileTwo = displayBlogs.slice(2);

	function viewAllHandleClick() {
		if (props.cardHeading === "ALL BLOGS") {
			navigate("/blogs");
		} else {
			const link = props.cardHeading.replaceAll(" ", "_").toLowerCase();
			navigate(`/blogs/category/${link}`);
		}
	}

	return (
		<div className="category-container">
			<div className="category-heading">
				<div className="left-side-category-name">
					<h5>{props.cardHeading}</h5>
				</div>
				<div className="right-side-view-all">
					<h5 onClick={viewAllHandleClick}>VIEW ALL</h5>
				</div>
			</div>
			<div className="blogs-category-container-card">
				<div className="blogs-desktop">
					{displayBlogsForDesktop.map(function (blog) {
						return (
							<div className="single-blog-card" id={blog._id}>
								<BlogPostCard
									id={blog._id}
									description={blog.postDescription}
									title={blog.postTitle}
									image={`${blog.postImage}`}
									authorName={blog.userDetails.fullName}
								/>
							</div>
						);
					})}
				</div>
				<div className="blogs-tablet">
					{displayBlogsForTablet.map(function (blog) {
						return (
							<div className="single-blog-card" id={blog._id}>
								<BlogPostCard
									id={blog._id}
									description={blog.postDescription}
									title={blog.postTitle}
									image={`${blog.postImage}`}
									authorName={blog.userDetails.fullName}
								/>
							</div>
						);
					})}
				</div>
				<div className="blogs-mobile">
					<div className="mobile-row">
						{displayBlogsForMobileOne.map(function (blog) {
							return (
								<div className="single-blog-card" id={blog._id}>
									<BlogPostCard
										id={blog._id}
										description={blog.postDescription}
										title={blog.postTitle}
										image={`${blog.postImage}`}
										authorName={blog.userDetails.fullName}
									/>
								</div>
							);
						})}
					</div>
					<div className="mobile-row">
						{displayBlogsForMobileTwo.map(function (blog) {
							return (
								<div className="single-blog-card" id={blog._id}>
									<BlogPostCard
										id={blog._id}
										description={blog.postDescription}
										title={blog.postTitle}
										image={`${blog.postImage}`}
										authorName={blog.userDetails.fullName}
									/>
								</div>
							);
						})}
					</div>
				</div>
				{displayBlogs.length === 0 && (
					<div className="no-display-post">
						<h6>NO POST TO DISPLAY</h6>
					</div>
				)}
			</div>
		</div>
	);
}

export default CategoryCard;
