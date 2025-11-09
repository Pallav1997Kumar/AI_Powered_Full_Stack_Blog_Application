import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import SingleBlogPost from "../components/single post/SingleBlogPost";


function SingleBlogPostPage(){
    return (
        <ErrorBoundary>
            <SingleBlogPost />
        </ErrorBoundary>
    );
}


export default SingleBlogPostPage;