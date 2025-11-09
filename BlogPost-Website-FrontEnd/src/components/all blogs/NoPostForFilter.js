import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "../../style/all blogs/NoPostForFilter.scss";


function NoPostForFilter() {
	const navigate = useNavigate();

	return (
		<div className="filter-no-post">
			<div className="no-post-heading-filter">
				<h3>NO BLOG POST TO DISPLAY FOR</h3>
				<h3>THIS FILTER</h3>
				<h3>TRY SOME DIFFERENT FILTER</h3>
			</div>
			<div className="no-post-buttons-filter">
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

export default NoPostForFilter;
