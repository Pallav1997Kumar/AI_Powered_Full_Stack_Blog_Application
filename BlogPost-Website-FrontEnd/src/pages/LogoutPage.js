import Logout from "../components/authorization/Logout";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function LogoutPage(){
    return (
        <ErrorBoundary>
            <Logout />
        </ErrorBoundary>
    );
}


export default LogoutPage;