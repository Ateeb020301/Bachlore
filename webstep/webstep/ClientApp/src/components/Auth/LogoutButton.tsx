import React from 'react';
import { GoogleLogout } from 'react-google-login';

interface LogoutButtonProps {
    clientId: string;
    logoutFunc: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
    logoutFunc,
    clientId,
}) => {
    const onSuccess = () => {
        console.log('Logout made successfully');
        logoutFunc();
        localStorage.removeItem('authToken'); /*experimental*/
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
};
