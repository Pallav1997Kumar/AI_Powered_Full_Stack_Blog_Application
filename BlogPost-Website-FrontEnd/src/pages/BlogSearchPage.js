import BlogSearch from "../components/blog search/BlogSearch";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function BlogSearchPage(){
    return (
        <ErrorBoundary>
            <BlogSearch />
        </ErrorBoundary>
    );
}


export default BlogSearchPage;