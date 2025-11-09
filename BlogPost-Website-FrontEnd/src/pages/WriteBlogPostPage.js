import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import WriteBlogPost from "../components/write post/WriteBlogPost";

function WriteBlogPostPage(){
    return (
        <ErrorBoundary>
            <WriteBlogPost />
        </ErrorBoundary>
    );
}


export default WriteBlogPostPage;