import React from "react";
import { redirect } from "react-router-dom";

import { GoogleLogin, GoogleLoginResponse } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../../utils/refreshToken";
import responseGoogle from "../../utils/response";
import { ToastContainer, toast } from "react-toastify";

/* From: https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/components/Login.js */

const clientId =
  "79575982650-ke51dobd50k5nkf3n1gf91njdltp6ocl.apps.googleusercontent.com";

interface LoginProps {
  loginFunc: () => void;
  setRes: (r: GoogleLoginResponse) => void;
}

export const LoginButton: React.FC<LoginProps> = ({ loginFunc, setRes }) => {
  const onSuccess = (res: any) => {
    loginFunc();
    setRes(res);
    responseGoogle(res.profileObj);
    localStorage.setItem("authToken", res.tokenId); /*experimental*/
    localStorage.setItem(
      "response",
      JSON.stringify(res.profileObj)
    ); /*experimental*/
    toast.success("Login Successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onFailure = (res: any) => {
    console.log("Login failed: res:", res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Login"
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
};
