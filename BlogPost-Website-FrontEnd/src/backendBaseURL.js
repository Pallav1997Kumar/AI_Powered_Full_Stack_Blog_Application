const localBackendBaseURL = process.env.REACT_APP_BACKEND_LOCAL_BASEURL;
const productionBackendBaseURL = process.env.REACT_APP_BACKEND_PRODUCTION_BASEURL;;

let backendBaseURL;

if(process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"){
    backendBaseURL = localBackendBaseURL;
}
else if(process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"){
    backendBaseURL = productionBackendBaseURL;
}

export default backendBaseURL;