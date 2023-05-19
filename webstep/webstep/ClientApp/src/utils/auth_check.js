/* Not exactly fool-proof */

function isAuthenticated() {
  let condition = localStorage.getItem("authToken") != null;

  return condition;
}
export default isAuthenticated;
