import axios from "axios";
import React, { useEffect, useState } from "react";

import backendBaseURL from "../../backendBaseURL";
import CategoryCard from "./CategoryCard";


function EachCategoryBlogPost(props) {
    const categoryDetails = props.categoryDetails;
    const categoryID = categoryDetails._id;

    const cardHeading = categoryDetails.categoryName.concat(" BLOGS")

    const [defaultBlogPosts, setDefaultBlogPosts] = useState([]);
    
    useEffect(function(){
        fetchFourBlogPostParticularCategory();
    }, []);

    async function fetchFourBlogPostParticularCategory() {
        try{
			const response = await axios.get(
				`${backendBaseURL}/api/blogPost/fourPostWithUserAndCategoryInfo/${categoryID}`
			);
			setDefaultBlogPosts(response.data);
		}
		catch(error){
			console.log(error.message);
		}
    }

    return (
        <React.Fragment>
            <CategoryCard 
                cardHeading={cardHeading} 
                blogsDisplay={defaultBlogPosts} 
            />
        </React.Fragment>
    );
}


export default EachCategoryBlogPost;