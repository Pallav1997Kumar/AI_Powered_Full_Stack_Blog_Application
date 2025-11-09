import EditProfile from "../components/edit profile/EditProfile";
import ErrorBoundary from "../components/error boundary/ErrorBoundary";

function EditProfilePage(){
    return(
        <ErrorBoundary>
            <EditProfile />
        </ErrorBoundary>
    );
}


export default EditProfilePage;