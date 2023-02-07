import React from 'react';

import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

/* From: https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/components/Login.js */

interface LoginProps {
    clientId: string;
    loginFunc: () => void;
    setRes: (r: GoogleLoginResponse) => void;
}
export const LoginButton: React.FC<LoginProps> = ({
    loginFunc,
    clientId,
    setRes,
}) => {
    const onSuccess = (res: any) => {
        console.log('Login successful for ' + res.profileObj.givenName);
        refreshTokenSetup(res);
        loginFunc();
        setRes(res);
        localStorage.setItem('authToken', res.tokenId); /*experimental*/
    };

    const onFailure = (res: any) => {
        console.log('Login failed: res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
};
