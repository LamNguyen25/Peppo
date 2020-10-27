import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError = 
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

        // If unexpected error do something with it
        if(!expectedError) {
            console.log(error);
            alert("An unexpected HTTP error occurred.");
        }
        // return the RESPONSE error from server (including any error that server throw)
    return Promise.reject(error);
});

export default {
    get : axios.get,
    post: axios.post,
    put : axios.put,
    delete: axios.delete,
  };