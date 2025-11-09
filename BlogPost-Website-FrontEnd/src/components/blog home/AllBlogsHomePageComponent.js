import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import "../../style/blog home/AllBlogsHomePage.scss";
import Button from "react-bootstrap/Button";

import CategoryCard from "./CategoryCard.js";
import EachCategoryBlogPost from "./EachCategoryBlogPost.js";
import backendBaseURL from "../../backendBaseURL.js";


function AllBlogsHomePageComponent() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [defaultBlogPosts, setDefaultBlogPosts] = useState([]);

	//Getting All Blogs Category as object from Redux Store
	const categoriesList = useSelector((categogiesListRedux) =>	categogiesListRedux.blogCategorySliceName.blogCategories);

	//Creating an array and storing all blogs category name
	const blogCategoryArray = [];
	categoriesList.map(function (categoryList) {
		blogCategoryArray.push(categoryList.categoryName.concat(" BLOGS"));
	});

	useEffect(function () {
		dispatch(getAllBlogCategory());
	}, []);

	useEffect(function () {
		fetchFourBlogPost();
	}, []);


	async function fetchFourBlogPost() {
		try{
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/fourPostWithUserAndCategoryInfo`
			);
			setDefaultBlogPosts(response.data);
		}
		catch(error){
			console.log(error);
		}
	}

	return (
		<div className="all-blogs-home">
			<div className="search-post">
				<h5> Want to search to specific post </h5>
				<Button onClick={()=> navigate('/blogSearch')} variant="primary">
					Search
				</Button>
			</div>
			<CategoryCard cardHeading="ALL BLOGS" blogsDisplay={defaultBlogPosts} />
			{categoriesList.map(function(eachCategory){
				return (
					<EachCategoryBlogPost 
						key={eachCategory._id}
						categoryDetails={eachCategory} 
					/>
				);
			})}
			{/* {blogCategoryArray.map(function (cardHead) {
				const specificCategoryArray = blogPosts.filter(function (item) {
					return (
						cardHead.substring(0, cardHead.length - 6) == item.categoryName
					);
					//return (cardHead.startsWith(item.categoryName));
				});
				const specificCategoryBlog = specificCategoryArray.slice(0, 4);
				return (
					<CategoryCard
						cardHeading={cardHead}
						blogsDisplay={specificCategoryBlog}
					/>
				);
			})} */}
		</div>
	);
}
export default AllBlogsHomePageComponent;
