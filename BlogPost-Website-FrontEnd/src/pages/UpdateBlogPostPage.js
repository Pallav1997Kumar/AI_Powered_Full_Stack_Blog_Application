import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import UpdatePost from "../components/update post/UpdatePost";


function UpdateBlogPostPage(){
    return (
        <ErrorBoundary>
            <UpdatePost />
        </ErrorBoundary>
    );
}


export default UpdateBlogPostPage;