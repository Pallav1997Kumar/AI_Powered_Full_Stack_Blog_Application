import { useNavigate } from "react-router-dom";

import "../../style/all blogs/NoPostSpecificCategory.scss";
import Button from "react-bootstrap/Button";


function NoPostSpecificCategory(props) {
	const navigate = useNavigate();
	const blogCategory = props.blogCategory;

	return (
		<div className="no-post">
			<div className="no-post-heading">
				<h3>NO BLOG POST TO DISPLAY FOR</h3>
				<h3>
					<span className="category-name-nopost">{blogCategory}</span> CATEGORY
				</h3>
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

export default NoPostSpecificCategory;
