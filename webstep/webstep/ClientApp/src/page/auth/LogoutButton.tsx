import React from "react";
import { GoogleLogout } from "react-google-login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { toast, ToastContainer } from "react-toastify";

const clientId =
  "79575982650-ke51dobd50k5nkf3n1gf91njdltp6ocl.apps.googleusercontent.com";

interface LogoutProps {
  logoutFunc: () => void;
}

export const LogoutButton: React.FC<LogoutProps> = ({ logoutFunc }) => {
  const onSuccess = () => {
    logoutFunc();
    localStorage.removeItem("authToken"); /*experimental*/
    localStorage.removeItem("response"); /*experimental*/
    toast.success("Logout Successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
};
