import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import Home from "../components/static component/Home";


function HomePage(){
    return (
        <ErrorBoundary>
            <Home />
        </ErrorBoundary>
    );
}


export default HomePage;