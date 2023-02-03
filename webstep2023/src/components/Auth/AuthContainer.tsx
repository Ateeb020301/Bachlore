import React, { useState } from 'react';
import { GoogleLoginResponse } from 'react-google-login';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import './AuthContainer.css';

const clientId =
    '290518292142-kbr6migfr3t1e2i1t2uaur9kq3ej78o5.apps.googleusercontent.com';

export const AuthContainer: React.FC = () => {
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
        <LoginButton
            loginFunc={login}
            clientId={clientId}
            setRes={updateGoogleResponse}
        />
    );
    const logoutButton = (
        <LogoutButton logoutFunc={logout} clientId={clientId} />
    );
    const profilePicture = (
        <img
            src={response?.profileObj.imageUrl}
            alt='uh oh'
            style={{ borderRadius: '50%' }}
            className='profile-pic'
        />
    );

    /* TODO: Save token in localStorage */
    return (
        <div className='auth-container'>
            {loggedIn ? logoutButton : loginButton}
            {loggedIn && profilePicture}
        </div>
    );
};
