import DeletedAccount from "../components/authorization/DeletedAccount";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";


function DeletedAccountPage(){
    return (
        <ErrorBoundary>
            <DeletedAccount />
        </ErrorBoundary>
    );
}


export default DeletedAccountPage;