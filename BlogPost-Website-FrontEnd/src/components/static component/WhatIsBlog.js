import { lazy, Suspense } from "react";
import "../../style/static component/WhatIsBlog.scss";

const WIBYoutube = lazy(() =>
	import("./WhatIsBlog Lazy Component/WIBYoutube.js")
);
const WIBVideo1 = lazy(() =>
	import("./WhatIsBlog Lazy Component/WIBVideo1.js")
);
const WIBVideo2 = lazy(() =>
	import("./WhatIsBlog Lazy Component/WIBVideo2.js")
);


function WhatIsBlog() {
	return (
		<div>
			<div className="blog-defination-and-video">
				<div className="blog-video">
					<Suspense fallback="Loading...">
						<WIBYoutube />
					</Suspense>
				</div>
				<div className="blog-defination">
					<h3>What is a blog?</h3>
					<h5>Definition of a blog</h5>
					<p>
						Blogs are a type of regularly updated websites that provide insight
						into a certain topic. The word blog is a combined version of the
						words “web” and “log.” At their inception, blogs were simply an
						online diary where people could keep a log about their daily lives
						on the web. They have since morphed into an essential forum for
						individuals and businesses alike to share information and updates.
						In fact, many people even make money blogging as professional
						full-time bloggers.
					</p>
					<p>
						As the publishing world has evolved, and more of it has moved
						online, blogs have come to occupy a central position in this digital
						content world. Blogs are a source of knowledge, opinion and concrete
						advice. While not yet posed to replace journalism as an art form,
						people increasingly look to trusted blogs to find answers to their
						questions, or to learn how to do something.{" "}
					</p>
				</div>
			</div>
			<div className="blog-defination-and-video">
				<div className="blog-video">
					<Suspense fallback="Loading...">
						<WIBVideo1 />
					</Suspense>
				</div>
				<div className="blog-defination">
					<h3>What to include in a blog</h3>
					<p>
						Once you’ve created your blog, it’s time to think about your blog
						posts. When figuring out your content type, think about your target
						audience. Be sure to produce evergreen copy and regularly update
						your blog content.{" "}
					</p>
					<p>
						Blog posts should be relatively easy to read and understand, but
						should nonetheless provide a complete summary of the topic at hand.
						Check out this article for a complete explanation of how to write a
						blog post and read through our best blog post templates for
						inspiration.
					</p>
					<p>
						Writing a blog starts with knowing how to write a catchy blog title.
						The title is the first thing that readers see before they even reach
						your blog. Your title will appear on Google, and most potential
						readers will judge you by those few words alone. Consider what
						keywords people would search for to get to your blog or blog post.
						If you need guidance, a title generator can point you in the right
						direction.
					</p>
					<p>
						By getting into your readers’ minds, you can optimize your blog and
						your writing to become a content powerhouse.{" "}
					</p>
				</div>
			</div>
			<div className="blog-defination-and-video">
				<div className="blog-video">
					<Suspense fallback="Loading...">
						<WIBVideo2 />
					</Suspense>
				</div>
				<div className="blog-defination">
					<h3>How to start a blog?</h3>
					<p>
						First, head to a website builder and create an account. Then, choose
						your favorite customizable blog template to fit the style and needs
						of your blog design. Finally, you add your authentic content, create
						blog posts and hit publish.{" "}
					</p>
					<h3>How to make your blog succeed?</h3>
					<p>
						After launching your blog, you can add elements to your blog to
						please both readers and Google. Those elements range from quick
						supplements, such as adding quality visuals to your blog posts, to
						doing intensive keyword research for SEO purposes. To get a full
						sense of how to boost your blog, check out these essential blogging
						tools.
					</p>
					<p>
						You'll also want to understand more about your blog analytics - how
						it's performing in terms of how much traffic it generates and where
						that traffic is coming from.{" "}
					</p>
					<p>
						You also need to know how to promote your blog to make it
						successful. While social media is an accessible blog promotion
						channel for most, look at these highly recommended tips for how to
						promote your blog. Here’s to becoming the next viral sensation.
					</p>
				</div>
			</div>
		</div>
	);
}

export default WhatIsBlog;
