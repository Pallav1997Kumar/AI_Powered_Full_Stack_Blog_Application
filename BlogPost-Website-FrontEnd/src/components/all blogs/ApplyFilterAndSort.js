import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/all blogs/ApplyFilterandSort.scss";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import backendBaseURL from "../../backendBaseURL.js";


function ApplyFilterandSort(props) {
	const [sortSelection, setSortSelection] = useState("");
	const [allCheckedCategory, setAllCheckedCategory] = useState([]);
	const [allCheckedAuthor, setAllCheckedAuthor] = useState([]);
	const [checkedDate, setCheckedDate] = useState("");

	const [displaySortFilter, setDisplaySortFilter] = useState(false);

	const[uniquePostAuthors, setUniquePostAuthors] = useState(null);
	const[uniquePostCategories, setUniquePostCategories] = useState(null);

	const pathname = props.pathname;

	useEffect(function(){
		if(pathname === "/blogs"){
			fetchUniqueBlogUsersDetails();
			fetchUniqueBlogCategoriesDetails();
		}
		else if(pathname.includes("/blogs/category/")){
			fetchUniqueBlogUsersDetailsForParticularCategory();
		}
		else if(pathname.includes("/blogs/username/")){
			fetchUniqueBlogCategoriesDetailsForParticularUser();
		}
	},[pathname]);


	let username;
	let blogCategory;
	if (pathname.includes("/blogs/category/")) {
		var categoryWithBlog = pathname.split("/")[3].toUpperCase();
		var categoryNameOfBlog = categoryWithBlog.substring(0, categoryWithBlog.length - 6).replaceAll("_", " ");
		blogCategory = categoryNameOfBlog;
	} else if (pathname.includes("/blogs/username/")) {
		username = pathname.split("/")[3];
	}


	async function fetchUniqueBlogUsersDetails() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogUsersInfo`);
			setUniquePostAuthors(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}

	async function fetchUniqueBlogCategoriesDetails() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogCategoriesInfo`);
			setUniquePostCategories(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}

	async function fetchUniqueBlogUsersDetailsForParticularCategory() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogUsersInfo/${blogCategory}`);
			setUniquePostAuthors(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}


	async function fetchUniqueBlogCategoriesDetailsForParticularUser() {
		try {
			const response = await axios.get(`${backendBaseURL}/api/blogPost/distinctBlogCategoriesInfo/${username}`);
			setUniquePostCategories(response.data);
		} 
		catch (error) {
			console.log(error);
		}
	}


	function displaySort() {
		setDisplaySortFilter(true);
	}

	function undisplaySort() {
		setDisplaySortFilter(false);
	}


	function handleChangeCategory(event) {
		if (event.target.checked) {
			setAllCheckedCategory([...allCheckedCategory, event.target.value]);
		} else {
			setAllCheckedCategory(
				allCheckedCategory.filter(function (element) {
					return element != event.target.value;
				})
			);
		}
	}

	function handleChangeAuthor(event) {
		if (event.target.checked) {
			setAllCheckedAuthor([...allCheckedAuthor, event.target.value]);
		} else {
			setAllCheckedAuthor(
				allCheckedAuthor.filter(function (element) {
					return element != event.target.value;
				})
			);
		}
	}

	function handleChangeDate(event) {
		setCheckedDate(event.target.value);
	}

	function submitApplyFilterHandler(event) {
		event.preventDefault();
		if(pathname === "/blogs"){
			const sortFilterObject = {
				sortSelection,
				allCheckedCategory,
				allCheckedAuthor,
				checkedDate,
			};
			props.onGetSortFilterObject(sortFilterObject);
		}
		else if(pathname.includes("/blogs/category/")){
			const sortFilterObject = {
				sortSelection,
				allCheckedAuthor,
				checkedDate,
			};
			props.onGetSortFilterObject(sortFilterObject);
		}
		else if(pathname.includes("/blogs/username/")){
			const sortFilterObject = {
				sortSelection,
				allCheckedCategory,
				checkedDate,
			};
			props.onGetSortFilterObject(sortFilterObject);
		}
		setDisplaySortFilter(false);
		setSortSelection("");
		setAllCheckedAuthor([]);
		setAllCheckedCategory([]);
		setCheckedDate("");
	}

	return (
		<div>
			<div className="accordion_heading">
				{displaySortFilter ? (
					<h4 onClick={undisplaySort}>
						Apply Filter and Sorting <AiFillCaretUp />
					</h4>
				) : (
					<h4 onClick={displaySort}>
						Apply Filter and Sorting <AiFillCaretDown />
					</h4>
				)}
			</div>
			{displaySortFilter && (
				<div className="sort-filter">
					<div className="sort-apply">
						<h5>Sort By</h5>
						<select onChange={(event) => setSortSelection(event.target.value)}>
							<option selected>Please Select</option>
							<option value="postTitleAscending">Post Title Ascending</option>
							<option value="postTitleDescending">Post Title Descending</option>
							{!pathname.includes("/blogs/username/") && (
								<option value="authorAscending">Author Name Ascending</option>
							)}
							{!pathname.includes("/blogs/username/") && (
								<option value="authorDescending">Author Name Descending</option>
							)}
							{!pathname.includes("/blogs/category/") && (
								<option value="categoryAscending">Category Ascending</option>
							)}
							{!pathname.includes("/blogs/category/") && (
								<option value="categoryDescending">Category Descending</option>
							)}
							<option value="postDateAscending">Date of Post Ascending</option>
							<option value="postDateDescending">
								Date of Post Descending
							</option>
							<option value="postLengthAscending">
								Length of Post Ascending
							</option>
							<option value="postLengthDescending">
								Length of Post Descending
							</option>
						</select>
					</div>
					<div className="filter-apply">
						{!pathname.includes("/blogs/category/") && (
							<div className="filter-category">
								<h5>Categories</h5>
								{uniquePostCategories.map(function (categoryList) {
									return (
										<div className="category-name">
											<input
												type="checkbox"
												value={categoryList._id}
												onChange={handleChangeCategory}
											/>
											<label>{categoryList.categoryName}</label>
										</div>
									);
								})}
							</div>
						)}
						{!pathname.includes("/blogs/username/") && (
							<div className="filter-author">
								<h5>Author Name</h5>
								{uniquePostAuthors.map(function (eachAuthor) {
									return (
										<div className="author-name">
											<input
												type="checkbox"
												value={eachAuthor._id}
												onChange={handleChangeAuthor}
											/>
											<label>
												{eachAuthor.fullName} ({eachAuthor.username})
											</label>
										</div>
									);
								})}
							</div>
						)}
						<div className="filter-date">
							<h5>Posted On</h5>
							<div className="date-selection">
								<input
									type="radio"
									value="1hour"
									checked={checkedDate === "1hour"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="1hour">Last hour</label>
							</div>
							<div className="date-selection">
								<input
									type="radio"
									value="24hours"
									checked={checkedDate === "24hours"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="24hours">Last 24 hours</label>
							</div>
							<div className="date-selection">
								<input
									type="radio"
									value="7days"
									checked={checkedDate === "7days"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="7days">Last 7 days</label>
							</div>
							<div className="date-selection">
								<input
									type="radio"
									value="1month"
									checked={checkedDate === "1month"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="1month">Last 1 month</label>
							</div>
							<div className="date-selection">
								<input
									type="radio"
									value="3months"
									checked={checkedDate === "3months"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="3months">Last 3 months</label>
							</div>
							<div className="date-selection">
								<input
									type="radio"
									value="6months"
									checked={checkedDate === "6months"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="6months">Last 6 months</label>
							</div>
							<div className="date-selection">
								<input
									type="radio"
									value="1year"
									checked={checkedDate === "1year"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="1year">Last 1 year</label>
							</div>
							<div className="date-selection">
								<input
									type="radio"
									value="everyTime"
									checked={checkedDate === "everyTime"}
									onChange={handleChangeDate}
								/>
								<label htmlFor="everyTime">Every Time</label>
							</div>
						</div>
					</div>
				</div>
			)}
			{displaySortFilter && (
				<div className="button-sort-filter">
					<Button 
                        onClick={submitApplyFilterHandler} 
                        variant="primary"
                    >
						Apply
					</Button>
				</div>
			)}
		</div>
	);
}

export default ApplyFilterandSort;
