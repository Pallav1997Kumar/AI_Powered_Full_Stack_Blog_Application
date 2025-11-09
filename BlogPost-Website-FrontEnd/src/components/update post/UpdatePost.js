import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";

import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import "../../style/update post/UpdatePost.scss";

import backendBaseURL from "../../backendBaseURL.js";
import { getPlainText } from "../../utils/utility functions.js"


function UpdatePost() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	//Getting the blog details which submitted to backend from SinglePost.js file
	const blogDetails = location.state.blogDetails;

	//Getting Post ID from URL
	const pathname = location.pathname;
	const splitedArray = pathname.split("/");
	const postID = splitedArray[4];

	//Getting logged-in user detail from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);
	const userID = user.userID;

	//Getting category list as object from Redux Store
	const categoriesList = useSelector((categogiesListRedux) => categogiesListRedux.blogCategorySliceName.blogCategories);

	//Intilizing title, post description and category with value submitted to backend
	const [title, setTitle] = useState(blogDetails.postTitle);
	const [postDescription, setPostDescription] = useState(blogDetails.postDescription);
	const [category, setCategory] = useState(blogDetails.categoryDetails._id);

	//If we want to edit image initialize image with null
	const [blogImage, setBlogImage] = useState(null);

	//Whether we want to edit the image
	const [isImageEdit, setIsImageEdit] = useState(false);

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
	const [isErrorWhileUpdating, setIsErrorWhileUpdating] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(function () {
		dispatch(getAllBlogCategory());
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	}, []);

	useEffect(function () {
		if (successMessage !== null) {
			setTimeout(() => {
				navigate("/blogs/postId/" + postID);
			}, 3000);
		}
	}, [successMessage, navigate, postID]);

	function handleEditImage() {
		setIsImageEdit(!isImageEdit);
	}


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
			console.log(error);
		}
	}


	async function submitHandler(event) {
		event.preventDefault();
		if (isImageEdit) {
			var imageDetail = await handleUpload();
		} else {
			var imageDetail = null;
		}
		const token = Cookies.get("jwt_access_token");
		const values = { title, postDescription, category, token, imageDetail };
		try {
			const response = await axios.put(
				`${backendBaseURL}/api/blogPost/updatePost/${postID}`,
				values
			);
			setSuccessMessage(response.data);
			setTitle("");
			setPostDescription("");
			setBlogImage(null);
			setCategory();
			setIsErrorWhileUpdating(false);
			setErrorMessage(null);
		} catch (error) {
			if (error.message === "Request failed with status code 401") {
				setErrorMessage(error.response.data);
			} else {
				setErrorMessage(error.message);
			}
			setIsErrorWhileUpdating(true);
			setSuccessMessage(null);
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
		<div className="update-blog">
			<h1>Welcome {user !== null && user.fullName}, </h1>
			<h1>Update your blog here</h1>
			<form>
				{/* Category Selection */}
				<label>Select Category</label>
				<br />
				<select onChange={(event) => setCategory(event.target.value)}>
					<option>Please Select</option>
					{categoriesList.map(function (categoryList) {
						return categoryList._id == category ? (
							<option value={categoryList._id} selected>
								{categoryList.categoryName}
							</option>
						) : (
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
				<div onClick={handleEditImage} className="edit-image">
					<img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAAD+/v6zs7Pa2trX19cEBAQRERELCwsKCgrs7OyCgoJnZ2fg4OCqqqq2trZDQ0PLy8u+vr6cnJwZGRnz8/MqKip4eHhtbW0iIiIlJSVOTk5iYmKOjo7CwsJaWloxMTEXFxekpKT2PVElAAAIlklEQVR4nO2diXbbOAxFJdqy7DibE2dv0+X/P7LaV64PFEXo9J3pzJnUdHANECRBik6SSCVE+Q/Qio0KQKBNArRaSQKzlQ1fAoVoFdn+bVlEcLjx6YdC8LEV0rbpwD7IRlWy4AII28kDEAw0TmM2EGuMhrMq2wONsGbrCBrPOCVR1FZWgGyMBcQqYSDi1JsQbZuuEhdEgplMEAVSRagTKA9AKF0wwqsnlZsmxAY0waYPooYyGui3PeUqFT2fIE0MWTiQYCOLbAFW/PvW8YvmQY+GLCJCD2yiM3ZEUidiMKCRDOQQoknykl0ue6wpi3VBdntNC308r23IQnq5TVu93qxtjE7onGL/Jz0dWsSPuBHdu0PxoWR5mp46J6afMSNCTrzJ07FiDlTsnMzDhDBiL0LdsGjzNEWMsy9iY1J2XzaaefHVv31+5ExYJJn78r8zxBjHRSRE98cCRor44ds8mgSYRbOapkKc9kVwAreQwJF+39LIvHjxa2IjdAmCbUplx1SFeDgsQwgeyAIn9tlwoJ8gFlO4DLDEQtjBT0j7dKSpF49LLIaCFvwngLN0cwu8p1HQQhmsb2ZTwKkXFwlSMC4gwOlke4r4A7NFq5CFgGKgP2gRjy/efyetmu4oSYiO++LpTmIhtVYVsOQ/SzIzL0o7IcUHYQ9+DgZ6BaJ06UQsGAasxEmTzATRr0TYerEmRLWIcC9q4GLog7Vy+UCIp4nAe27KLNrqJE8ypIPXIYvhhj6YqlaFlEQfdpjQZdFKEg96yBPrD/StjjIPMnrGBkwyfM60ZtfTUTYZTasVvTREsUcx11J2TXMFYEMoCVFOhPv8oASsCeV9MLihqIo+qAbU9EE2jPs8zbUjhXyg53HGqVTRB48HLWEs5V9xedhZ6X60gt0XgPqxfqHKoaPE7lFr5VBvw4b7VJNkSkkH+vB6erXmS8/DhkWS0XtQsZoIrfNop90BsBwH9S+PA/C2yIXGabMUMDcBxhGi5/RwzHNFbzocRj8fAIpqNaHtg5EAPpVdSTmgjQknffCk54ukD4rPND/lqmnzWFPAXNt7FQN9cD2khQONq/M5YHY95PpmcYRokjyWacaKcOxBYx+MxIOJSIskU48Vt5Jqu0rYin4VXdJjky9c9vTQsmFwVad52mHCxYNI0WkVFcuXXdeb7JtpyobN2OI9RPFTFoPNdetWmhA9KEsWNIGXT1UL0J0zoa4PVoSR9MG20uVMCJbuicaCpyxKuRKipXuSwFMW9efiSAiV7omC9+jrZm6Eqwz00NPbvZwIVxnoqU/MuBBmxkKAbHcJc0FbaaSfQnAghPcH3a1qqYSH/UF7QmOIygHBO3365s6NJ7ImxLfPAIl279RDVdyWEB3owemk8Hf/myXhHbxHTzEuJOGXCXCZYcKH7Ai/DXzygZ68hR3Qh7/0gNIkE8sOvQWhSO7qVzy+24SoQ60giIyEZVY716+4T35IAUch+lYdXQt8nk4nE2GVtusXXF/KLY6BZCWLc7prO2AcgGbC4s/f+gU/y/9/HxHOVvSFt3ehj7QaZCCsxrNmc7E++vo+JJwO9GU475K4tuhNhEk3VLw3PxoF6jREU2Y+rF3RDBWds4bpZubB2ocxSUdYh1oz5X7sf94F6nHuQVaETV9qDP9uf/xy3x5qmCUZdoQV40v9t5/ND29+XnUhyomwzYbNUFEfQc+Gg8V4LpquR6hPairC7jGiP73d36MzN5PJNjPC/jGpblWxu/8Y8s0m26sRmmZPMsLhYKZYGH7N5tdrERqXaFIf9lOSOynfj+/5G60XpYa5hYRwWEV/k/Cdpeujdh4eltBika2P0psZ3utfxTuuRGhewujnpc8Tvl+S8GwEERIn6FZLNP289Pc4PHXbLkg/pAJatdcSDu96uP7VP9sKZRriM4dWzbWEfQHqSx2ejQBCUk3burGOsMszbxbVpdBR6pHw97PVlUDOhCQ8hy07bZQWo+GvJ8s3ciekPDnq0IP1o8WN/Y1OjoTE22gdXux+nkYhN0LaU3lOn05LeAhJWC1dQj2dvgph0GoxhXDkBlcfBhOlH45StiWhAM9m4CIRDk21JQxeLCbl0mGYOhCGFU44sdWeMPCeRujxMPyDowQfCsSH4YUSzjyxMUJJoG2KUHpXwKYIpQk/RkLkFHTSn/KfKE7CZHiPsdU5GGWq74vjDx5NpKleg146y6yee+q3bCbqd/eXuZoUUDOpFGmPiJ9muhscX4jliEJXRbB/Dt9Oj4ZfHEwd4eyeZoNMp9kj6YaDhCE+UW9J9ekpSKmz12Gla3ZlOklPVLTORFrT0Sd0NtttrbPqt0Jmwm2nq9Bbs+Va9Y/s+7s9t/YBijlbgxK92N1K4M+DTQ0IerJSWgdyudtE6cNXr32w/uMMqPxUXO6nketx52+or80EC//qKon1HUMSPVy8zmREayvQNKKTrSpRKzmxIw4iM3JTw35NQXhBdyLWbXgAlgIGsgWsWEyQL6I6/24S1JtYhSicZpiIlzPcFXoHdA1tmu+/A6MR/jX0XAgTIBsKHl/62guYknAaI6C7LDjxIaHm4xqS6MWGb/uu2Lg278CN4yV8XIhViznVgSBCJmyVQEA+s2b8ei0mhLAruGQZDqFG23nxZcViIn6JFYeNDUIph8lXfJFyNo+ETwxSb3YsI/ypPB4BSvyyNQaMpHojhzRDHAdjJxTUrwOMnK9U/BZWQjNhwsIJpcBVFquCP7ZDv4AhzVt7f0fwawo27MCEx0jWiJUzIMFfxPBfcWjzhxA4lA+I2jSfv3v8lxfUmZiw1YLr4b4NWU7QrJlRjoFMZXVYLXpn0OyLf8pFNDB6/5H7Q/yE1DvOohe1Fhc/I6EYzmILm5IHGbiPCBj/KEENsehnXaL7F/oGkQNymIt0IuQKDqIcQfBqyHJCgo1PfJYC92zkjf4BgQUwE6x9P6MAAAAASUVORK5CYII="
						height="60px"
					/>
				</div>
				<br />
				{isImageEdit && (
					<input
						required
						type="file"
						name="blogImage"
						onChange={(event) => setBlogImage(event.target.files[0])}
					/>
				)}
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
				{isErrorWhileUpdating ? (
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

export default UpdatePost;
