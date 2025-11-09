import AllBlogs from "../components/all blogs/AllBlogs";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function AllBlogsPage(){
    return (
        <ErrorBoundary>
            <AllBlogs /> 
        </ErrorBoundary>
    );
}


export default AllBlogsPage