import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import ContactUs from "../components/static component/ContactUs";


function ContactUsPage(){
    return (
        <ErrorBoundary>
            <ContactUs />
        </ErrorBoundary>
    );
}


export default ContactUsPage;