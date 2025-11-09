import AllBlogsHomePageComponent from "../components/blog home/AllBlogsHomePageComponent";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function AllBlogsHomePage(){
    return (
        <ErrorBoundary>
            <AllBlogsHomePageComponent />
        </ErrorBoundary>
    );
}


export default AllBlogsHomePage;