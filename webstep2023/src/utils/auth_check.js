/* Not exactly fool-proof */

function isAuthenticated() {
    let condition = localStorage.getItem("authToken") != null;
    console.log("Authentication token exists: " + condition);
    return condition; 
} 
export default isAuthenticated;