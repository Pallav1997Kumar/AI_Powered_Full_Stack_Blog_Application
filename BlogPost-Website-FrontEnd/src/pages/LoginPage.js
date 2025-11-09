import Login from "../components/authorization/Login";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function LoginPage(){
    return (
        <ErrorBoundary>
            <Login />
        </ErrorBoundary>
    );
}


export default LoginPage;