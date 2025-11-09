import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import axios from "axios";

import { FaSearch } from "react-icons/fa";

import "../../style/blog search/BlogSearch.scss";

import backendBaseURL from "../../backendBaseURL.js";


function BlogSearch(){
    const navigate = useNavigate();

    const [searchItem, setSearchItem] = useState("");
    const [searchedResult, setSearchedResult] = useState([]);


    useEffect(function(){
        const getDelaySearch = setTimeout(function(){
            fetchSearchTextResults(searchItem);
        }, 500);
        return function(){
            clearTimeout(getDelaySearch);
        }
    }, [searchItem]);

    
    function resultClickHandler(event) {
        const data = JSON.parse(event.currentTarget.dataset.item);
        if(data.type === "Blog Post"){
            navigate(`/blogs/postId/${data._id}`);
        }
        else if(data.type === "Blog User"){
            navigate(`/blogs/username/${data.username}`);
        }
        else if(data.type === "Blog Category"){
            const categorySlug = data.categoryName.replaceAll(" ", "_").toLowerCase() + "_blogs";
			navigate(`/blogs/category/${categorySlug}`);
        }
    }


    async function fetchSearchTextResults(searchQuery) {
        if(searchQuery.trim().length < 3){
            setSearchedResult([]);
            return;
        }
        try {
            const response = await axios.get(
                `${backendBaseURL}/api/searchBlogOrUserOrCategory?searchText=${searchQuery}`
            );
            setSearchedResult(response.data);
        } 
        catch (error) {
           console.log(error); 
        }
    }

    return(
        <div className="blog-search-container">
            <div className="search-box">
                <input 
                    type="text" 
                    value={searchItem} 
                    placeholder="Search" 
                    onChange={(event) => setSearchItem(event.target.value)} 
                />
                <FaSearch />
            </div>
            {searchedResult.length > 0 &&
            <div className="search-result">
                {searchedResult.map(function(result, index){
                    let displayText; 
                    if(result.type === "Blog Category"){
                        displayText = `CATEGORY: ${result.categoryName}`;
                    }
                    else if(result.type === "Blog Post"){
                        displayText = `POST TITLE: ${result.postTitle}`;
                    }
                    else if(result.type === "Blog User"){
                        displayText = `AUTHOR: ${result.fullName} (${result.username})`;
                    }
                    return(
                        <div 
                            key={index} 
                            data-item={JSON.stringify(result)} 
                            onClick={resultClickHandler}
                        >
                            <h6>{displayText}</h6>
                        </div>                        
                    );
                })}
            </div>}
        </div>
    );
}

export default BlogSearch;