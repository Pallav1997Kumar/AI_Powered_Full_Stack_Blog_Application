import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/all blogs/AllBlog.scss";

import NoPostSpecificCategory from "./NoPostSpecificCategory.js";
import AllBlogsPostContainer from "./AllBlogsPostContainer.js";
import NoPostFromUser from "./NoPostFromUser.js";
import ApplyFilterAndSort from "./ApplyFilterAndSort.js";
import NoPostForFilter from "./NoPostForFilter.js";
import backendBaseURL from "../../backendBaseURL.js";


function AllBlogs() {
	const location = useLocation();

	const [totalPagesCount, setTotalPagesCount] = useState(null);
	const [blogPostDetails, setBlogPostDetails] = useState(null);
	const [currentPageNo, setCurrentPageNo] = useState(1);

	const [isSortingFilteringApplied, setIsSortingFilteringApplied] = useState(false);

	const [filteredTotalPagesCount, setFilteredTotalPagesCount] = useState(null);
	const [filteredBlogPostDetails, setFilteredBlogPostDetails] = useState(null);
	const [filteredCurrentPageNo, setFilteredCurrentPageNo] = useState(1);


	useEffect(function(){
		if(!isSortingFilteringApplied){
			if(location.pathname === "/blogs"){
				fetchBlogPostWithPagination();
			}
			else if(location.pathname.includes("/blogs/category/")){
				fetchCategoryBlogPostWithPagination();
			}
			else if(location.pathname.includes("/blogs/username/")){
				fetchUserBlogPostWithPagination();
			}
		}
	}, [location.pathname, currentPageNo, isSortingFilteringApplied]);


	useEffect(function(){
		if(isSortingFilteringApplied){
			const sortFilterObject = JSON.parse(sessionStorage.getItem("sortFilterObject"));
			fetchSortedFilterBlogPost(sortFilterObject);
		}
	}, [filteredCurrentPageNo, location.pathname])

	const limit = 5;

	let blogHeader;
	let username;
	let blogCategory;
	if (location.pathname === "/blogs") {
		blogHeader = "ALL";
	}
	else if (location.pathname.includes("/blogs/category/")) {
		var categoryWithBlog = location.pathname.split("/")[3].toUpperCase();
		var categoryNameOfBlog = categoryWithBlog.substring(0, categoryWithBlog.length - 6).replaceAll("_", " ");
		blogCategory = categoryNameOfBlog;
		blogHeader = blogCategory;
	} else if (location.pathname.includes("/blogs/username/")) {
		username = location.pathname.split("/")[3];
		blogHeader = username;
	}

	let pageNumberArray = [];
	if(totalPagesCount !== null){
		for(let i = 1; i <= totalPagesCount; i++){
			pageNumberArray.push(i);
		}
	}

	let filteredPageNumberArray = [];
	if(filteredTotalPagesCount !== null){
		for(let i = 1; i <= filteredTotalPagesCount; i++){
			filteredPageNumberArray.push(i);
		}
	}


	async function fetchBlogPostWithPagination() {
		try {
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo?page=${currentPageNo}&limit=${limit}`
			)
			const currentPage = response.data.currentPage;
			const totalPages = response.data.totalPages;
			const totalCount = response.data.totalCount;
			const blogPostData = response.data.blogPostData;
			setTotalPagesCount(totalPages);
			setBlogPostDetails(blogPostData);
		} 
		catch (error) {
			console.log(error);
		}
	}


	async function fetchUserBlogPostWithPagination() {
		try {
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo/user/${username}?page=${currentPageNo}&limit=${limit}`
			)
			const currentPage = response.data.currentPage;
			const totalPages = response.data.totalPages;
			const totalCount = response.data.totalCount;
			const blogPostData = response.data.blogPostData;
			setTotalPagesCount(totalPages);
			setBlogPostDetails(blogPostData);
		} 
		catch (error) {
			console.log(error);
		}
	}


	async function fetchCategoryBlogPostWithPagination() {
		try {
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/postWithPaginationWithUserAndCategoryInfo/category/${blogCategory}?page=${currentPageNo}&limit=${limit}`
			)
			const currentPage = response.data.currentPage;
			const totalPages = response.data.totalPages;
			const totalCount = response.data.totalCount;
			const blogPostData = response.data.blogPostData;
			setTotalPagesCount(totalPages);
			setBlogPostDetails(blogPostData);
		} 
		catch (error) {
			console.log(error);
		}
	}


	async function fetchBlogPostWithFilterSortingPagination(sortFilterObject) {
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);
			return response.data;
		} 
		catch (error) {
			console.log(error);
		}
	}

	async function fetchUserBlogPostWithFilterSortingPagination(sortFilterObject) {
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo/user/${username}?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);
			return response.data;
		} 
		catch (error) {
			console.log(error);
		}
	}

	async function fetchCategoryBlogPostWithFilterSortingPagination(sortFilterObject) {
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/postWithFilterSortingPaginationWithUserAndCategoryInfo/category/${blogCategory}?page=${filteredCurrentPageNo}&limit=${limit}`,
				sortFilterObject
			);
			return response.data;
		} 
		catch (error) {
			console.log(error);
		}
	}


	function handlePageChange(event){
		if(!isSortingFilteringApplied){
			setCurrentPageNo(event.target.value);
		}
		else if(isSortingFilteringApplied){
			setFilteredCurrentPageNo(event.target.value)
		}
	}


	async function getSortFilterObject(sortFilterObject) {
		sessionStorage.setItem("sortFilterObject", JSON.stringify(sortFilterObject));
		setFilteredCurrentPageNo(1);
		await fetchSortedFilterBlogPost(sortFilterObject);
	}


	async function fetchSortedFilterBlogPost(sortFilterObject) {
		let filteredBlogPostInfo;
		if(location.pathname === "/blogs"){
			filteredBlogPostInfo = await fetchBlogPostWithFilterSortingPagination(sortFilterObject);
		}
		else if(location.pathname.includes("/blogs/category/")){
			filteredBlogPostInfo = await fetchCategoryBlogPostWithFilterSortingPagination(sortFilterObject);
		}
		else if(location.pathname.includes("/blogs/username/")){
			filteredBlogPostInfo = await fetchUserBlogPostWithFilterSortingPagination(sortFilterObject);
		}
		setFilteredTotalPagesCount(filteredBlogPostInfo.totalPages);
		setFilteredBlogPostDetails(filteredBlogPostInfo.blogPostData);
		setFilteredCurrentPageNo(filteredBlogPostInfo.currentPage);
		setIsSortingFilteringApplied(true);
	}


	return (
		<div className="all-blog">
			{blogPostDetails && blogPostDetails.length > 0 && (
				<div className="blog-heading">
					<h1>{blogHeader} BLOGS</h1>
				</div>
			)}
			{blogPostDetails && blogPostDetails.length > 0 && (
				<div>
					<ApplyFilterAndSort
						pathname={location.pathname}
						onGetSortFilterObject={getSortFilterObject}
					/>
				</div>
			)}
			{(isSortingFilteringApplied && filteredBlogPostDetails && filteredBlogPostDetails.length == 0) && (
				<NoPostForFilter />
			)}
			{(!isSortingFilteringApplied && blogPostDetails) && 
				blogPostDetails.map(function (post) {
					return <AllBlogsPostContainer post={post} />;
				})
			}
			{(isSortingFilteringApplied && filteredBlogPostDetails) && 
				filteredBlogPostDetails.map(function (post){
					return <AllBlogsPostContainer post={post} />
				})
			}
			{blogPostDetails && blogPostDetails.length === 0 &&
				location.pathname.includes("/blogs/category/") && (
					<NoPostSpecificCategory blogCategory={blogCategory} />
			)}
			{blogPostDetails && blogPostDetails.length === 0 &&
				location.pathname.includes("/blogs/username/") && (
					<NoPostFromUser />
			)}
			{(!isSortingFilteringApplied && blogPostDetails && blogPostDetails.length > 0) && (
				<div className="pagination-container">
					<label htmlFor="page-select">Select Page: </label>
					<select 
						id="page-select" 
						defaultValue={1}
						onChange={handlePageChange}
					>
						{pageNumberArray.map(function(eachPageNumber){
							return (
								<option key={eachPageNumber} value={eachPageNumber}>
									Page {eachPageNumber}
								</option>
							)
						})}
					</select>
				</div>
			)}
			{(isSortingFilteringApplied && filteredBlogPostDetails && filteredBlogPostDetails.length > 0) && (
				<div className="pagination-container">
					<label htmlFor="page-select">Select Page: </label>
					<select 
						id="page-select" 
						defaultValue={1}
						onChange={handlePageChange}
					>
						{filteredPageNumberArray.map(function(eachPageNumber){
							return (
								<option key={eachPageNumber} value={eachPageNumber}>
									Page {eachPageNumber}
								</option>
							)
						})}
					</select>
				</div>
			)}
		</div>
	);
}

export default AllBlogs;
