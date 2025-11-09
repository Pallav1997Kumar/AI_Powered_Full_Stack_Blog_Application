import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import "../../style/static component/HomePage.scss";
import Button from "react-bootstrap/Button";

import blogComputerImage from "../../images/new-blog-post-free-photo.webp";


function Home() {
	const dispatch = useDispatch();

	useEffect(function () {
		dispatch(getAllBlogCategory());
	}, []);

	return (
		<div className="home-page">
			<div className="top">
				<h1>React Blog Poster</h1>
				<h3>A website where you can publish your blog content</h3>
			</div>
			<div className="flex-container">
				<div className="flex-container-left">
					<h2>Create a blog.</h2>
					<h4>Share your story with the world. </h4>
					<h4>
						Stand out with a professionally-designed blog website that can be
						customized to fit your brand.{" "}
					</h4>
					<h4>
						Build, manage, and promote your blog with React Blog Pster's
						built-in suite of design and marketing tools.
					</h4>
					<div className="flex-container-left-btn">
						<Button variant="light">
							<Link className="link" to="/login">
								Get Started
							</Link>
						</Button>
					</div>
				</div>
				<div className="flex-container-right">
					<img src={blogComputerImage} />
				</div>
			</div>
			<div className="blog-home">
				<h5>Want to see others blog post</h5>
				<p>Explore the others users blog post for free. </p>
				<div className="button">
					<Button variant="light">
						<Link className="link" to="/blogsHome">
							Click Here
						</Link>
					</Button>
				</div>
			</div>
			<div className="blog-introduction">
				<h5>Want to know what is blog</h5>
				<p>You can know about blogging by clicking on button below</p>
				<div className="button">
					<Button variant="light">
						<Link className="link" to="/what_is_blog">
							Click Here
						</Link>
					</Button>
				</div>
			</div>
			<div className="blog-search">
				<h5>Want to search for specific blog</h5>
				<p>You will be redirected to search page after clicking on button below</p>
				<div className="button">
					<Button variant="light">
						<Link className="link" to="/blogSearch">
							Click Here
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Home;
