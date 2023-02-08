import React from 'react';
import Logo from '../../img/WEBSTEP_logo.png';

export const WebstepLogo: React.FC = () => {
    const logoStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
    };
    return <img style={logoStyle} src={Logo} alt='logo missing' />;
};
