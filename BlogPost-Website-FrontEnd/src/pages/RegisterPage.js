import Register from "../components/authorization/Register";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function RegisterPage(){
    return (
        <ErrorBoundary>
            <Register />
        </ErrorBoundary>
    );
}


export default RegisterPage;