import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import "../../style/write post/Write.scss";

import backendBaseURL from "../../backendBaseURL.js";
import { getPlainText } from "../../utils/utility functions.js"


function WriteBlogPost() {
	const navigate = useNavigate();

	//All inputs fields
	const [title, setTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");
	const [category, setCategory] = useState("");
	const [blogImage, setBlogImage] = useState();

	// AI title suggestions
	const [titleSuggestionsByAI, setTitleSuggestionsByAI] = useState([]);
	const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);

	// AI description suggestions
	const [descriptionSuggestedByAI, setDescriptionSuggestedByAI] = useState(null);
	const [isGeneratingDescriptions, setIsGeneratingDescriptions] = useState(false);

	// AI description enhancement
	const [enhancementSuggestedByAI, setEnhancementSuggestedByAI] = useState(null);
	const [isEnhancingDescriptions, setIsEnhancingDescriptions] = useState(false);

	//Success or Failed Message while posting to backend
	const [isErrorWhileUploading, setIsErrorWhileUploading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	//Getting category list as object from Redux Store
	const categoriesList = useSelector((categogiesListRedux) => categogiesListRedux.blogCategorySliceName.blogCategories);

	//Getting logged-in user detail from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);
	const userID = user.userID;

	
	useEffect(function () {
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	}, []);

	useEffect(function () {
		if (successMessage !== null) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [successMessage, navigate]);

	
	async function handleUpload() {
		const formData = new FormData();
		formData.append("blogImage", blogImage);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/imageUpload/blogImage?userID=${userID}`,
				formData
			);
			return response.data;
		} catch (error) {
			setErrorMessage(error.message);
			setSuccessMessage(null);
			setIsErrorWhileUploading(true);
		}
	}

	
	async function submitHandler(event) {
		event.preventDefault();
		const imageDetail = await handleUpload();
		const token = Cookies.get("jwt_access_token");
		const values = { title, postDescription, category, token, imageDetail };
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/newPost/post`,
				values
			);
			setSuccessMessage(response.data);
			setTitle("");
			setPostDescription("");
			setBlogImage(null);
			setCategory();
			setErrorMessage(null);
			setIsErrorWhileUploading(false);
		} catch (error) {
			if (error.message === "Request failed with status code 417") {
				setErrorMessage(error.response.data);
			} else {
				setErrorMessage(error.message);
			}
			setSuccessMessage(null);
			setIsErrorWhileUploading(true);
		}
		if (successMessage) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}

	
	async function generateTitleSuggestionsByGenAI() {
		const postDescriptionText = getPlainText(postDescription);
		const values = {
			blogText: postDescriptionText
		}
		if(postDescriptionText.trim().length < 30){
			return;
		}
		setIsGeneratingTitles(true);
		setTitleSuggestionsByAI([]);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/suggestBlogTitlesFromBlogDescription`,
				values
			);
			const aiSuggestedTitlesArray = response.data.geminiGeneratedBlogTitles;
			setTitleSuggestionsByAI(aiSuggestedTitlesArray);
		} 
		catch (error) {
			console.log(error);
			setTitleSuggestionsByAI([]);
		}
		finally {
			setIsGeneratingTitles(false);
		}
	}

	async function generateDescriptionFromTitle(){
		const titleText = title;
		if(titleText.trim().length < 10){
			return;
		}
		const values = {
			blogTitle: titleText
		}
		setIsGeneratingDescriptions(true);
		setDescriptionSuggestedByAI(null);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/suggestBlogDescriptionsFromTitle`,
				values
			);
			const aiSuggestedDescription = response.data.geminiGeneratedBlogDescription;
			setDescriptionSuggestedByAI(aiSuggestedDescription);
		} 
		catch (error) {
			console.log(error);
			setDescriptionSuggestedByAI(null);
		}
		finally {
			setIsGeneratingDescriptions(false);
		}
	}


	async function enhanceBlogDescription() {
		const postDescriptionText = getPlainText(postDescription);
		const values = {
			blogText: postDescriptionText
		}
		if(postDescriptionText.trim().length < 30){
			return;
		}
		setIsEnhancingDescriptions(true);
		setEnhancementSuggestedByAI(null);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/generativeAI/enhanceBlogDescription`,
				values
			);
			const aiEnhancedBlogDescription = response.data.enhancedBlogDescription;
			setEnhancementSuggestedByAI(aiEnhancedBlogDescription);
		} 
		catch (error) {
			console.log(error);
			setEnhancementSuggestedByAI(null);
		}
		finally {
			setIsEnhancingDescriptions(false);
		}
	}


	return (
		<div className="write-blog">
			<h1>Welcome {user !== null && user.fullName}, </h1>
			<h1>Write your blog here</h1>
			<form>
				{/* Category Selection */}
				<label>Select Category</label>
				<br />
				<select onChange={(event) => setCategory(event.target.value)}>
					<option value="" selected>
						Please Select
					</option>
					{categoriesList.map(function (categoryList) {
						return (
							<option value={categoryList._id}>
								{categoryList.categoryName}
							</option>
						);
					})}
				</select>
				<br />
				<br />

				{/* Blog Title */}
				<label>Blog Title</label>
				<br />
				<input
					required
					type="text"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<br />
				<br />

				{/* Generative AI Title Suggestions */}
				{titleSuggestionsByAI.length > 0 && 
					<div className="title-suggestions">
						<h4>AI Suggested Titles:</h4>
						<ul>
							{titleSuggestionsByAI.map(function(eachSuggestedTitle, index){
								return(
									<li 
										key={index} 
										onClick={() => setTitle(eachSuggestedTitle)}
									>
										{eachSuggestedTitle}
									</li>
								)
							})}
						</ul>
					</div>
				}

				{/* Blog Description */}
				<label>Blog Description</label>
				<div className="react-quill">
					<ReactQuill
						theme="snow"
						value={postDescription}
						onChange={setPostDescription}
					/>
				</div>

				{/* Generative AI Blog Description Suggestions */}
				{descriptionSuggestedByAI != null && 
					<div className="description-suggestions">
						<h4>AI Suggested Description:</h4>
						<p>{descriptionSuggestedByAI}</p>
					</div>
				}

				<br />
				<br />

				{/* Generative AI Blog Description Enhancement */}
				{enhancementSuggestedByAI != null && 
					<div className="description-enhancement">
						<h4>AI Enhanced Blog Description:</h4>
						<p>{enhancementSuggestedByAI}</p>
					</div>
				}

				<br />
				<br />				


				{/* Upload Image */}
				<label>Upload the image</label>
				<br />
				<input
					required
					type="file"
					name="blogImage"
					onChange={(event) => setBlogImage(event.target.files[0])}
				/>
				<br />
				<br />

				{/* Generate AI Related Suggestions Button */}
				<div className="ai-suggestions-button">
					{/* Generate Titles Button */}
					<Button 
						variant="secondary"
						onClick={generateTitleSuggestionsByGenAI}
						disabled={isGeneratingTitles}
					>
						{isGeneratingTitles ? "Generating..." : "Suggest Titles"}
					</Button>

					{/* Generate Blog Description Button */}
					<Button 
						variant="secondary"
						onClick={generateDescriptionFromTitle}
						disabled={isGeneratingDescriptions}
					>
						{isGeneratingDescriptions ? "Generating..." : "Suggest Description"}
					</Button>

					{/* Enhance Blog Description Button */}
					<Button 
						variant="secondary"
						onClick={enhanceBlogDescription}
						disabled={isEnhancingDescriptions}
					>
						{isEnhancingDescriptions ? "Generating..." : "Enhance Description"}
					</Button>
				</div>
				
				<br />
				<br />

				{/* Publish Button */}
				<Button variant="primary" onClick={submitHandler}>
					Publish yor blog
				</Button>

				{/* Success or Error Message */}
				{isErrorWhileUploading ? (
					<div className="error">
						<p>{errorMessage}</p>
					</div>
				) : (
					<div className="success">
						<p>{successMessage}</p>
					</div>
				)}
			</form>
		</div>
	);
}

export default WriteBlogPost;
