import ErrorBoundary from "../components/error boundary/ErrorBoundary";
import WhatIsBlog from "../components/static component/WhatIsBlog";


function WhatIsBlogPage(){
    return(
        <ErrorBoundary>
            <WhatIsBlog />
        </ErrorBoundary>
    );
}


export default WhatIsBlogPage;