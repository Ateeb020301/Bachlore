import { GoogleLoginResponse } from "react-google-login";


const responseGoogle = (r: GoogleLoginResponse) => {
  console.log(r);
  return r;
};

export default responseGoogle;