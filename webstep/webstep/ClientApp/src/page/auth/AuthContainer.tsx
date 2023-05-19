import React, { useEffect, useState } from "react";
import { GoogleLoginResponse } from "react-google-login";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import "./AuthContainer.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import isAuthenticated from "../../utils/auth_check";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

const clientId =
  "79575982650-ke51dobd50k5nkf3n1gf91njdltp6ocl.apps.googleusercontent.com";

export const AuthContainer: React.FC = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState<GoogleLoginResponse>();

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  function updateGoogleResponse(r: GoogleLoginResponse) {
    setResponse(r);
  }

  const loginButton = (
    <LoginButton setRes={updateGoogleResponse} loginFunc={login} />
  );
  const logoutButton = <LogoutButton logoutFunc={logout} />;

  const profilePicture = (
    <img
      src={response?.profileObj.imageUrl}
      alt="uh oh"
      style={{ borderRadius: "50%" }}
      className="profile-pic"
    />
  );

  /* TODO: Save token in localStorage */
  return (
    <div className="auth-container">
      <Box sx={{ mx: 2 }}>{loggedIn && profilePicture}</Box>
      <Box sx={{ mx: 2 }}>{loggedIn ? logoutButton : loginButton}</Box>
      <ToastContainer />
    </div>
  );
};
