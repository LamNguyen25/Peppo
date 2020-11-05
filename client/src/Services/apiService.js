import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiUrl = "http://localhost:3001";
// Connect to the server in Firebase
// const apiGetAccessCode  = 'https://us-east1-peppo-4e1a1.cloudfunctions.net/app/login/createNewAccessCode';
// const apiValidateAccessCode = "https://us-east1-peppo-4e1a1.cloudfunctions.net/app/login/ValidateAccessCode";
const apiGetAccessCode = apiUrl + '/login/createNewAccessCode';
const apiValidateAccessCode = apiUrl + '/login/ValidateAccessCode';


const tokenKey  = "token"; // key-value name

// Get current user by decoding JWT in Local Storage
export function getCurrentUser() {
    // Always try to catch this because invalid token make the app crash
    // localStorage.getItem('token')    // get the token header
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt).phoneNumber;
    } catch (ex) {
        return null;
    }
}

export async function getAccessCode(phoneNumber) {
    const {data:{token:jwt}} = await http.post(apiGetAccessCode, { phoneNumber });
    console.log(jwt);
    localStorage.setItem(tokenKey, jwt);
}

export async function validateAccessCode(phoneNumber, accessCode) {
    const response = await http.post(apiValidateAccessCode, {phoneNumber, accessCode});
    return response;
}
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export default {
    getAccessCode,
    validateAccessCode,
    getCurrentUser,
    loginWithJwt,
    logout,
};

