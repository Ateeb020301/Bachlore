import React from 'react';
import { Button } from 'reactstrap';
import HideIcon from '../../components/images/caret-up.svg';
import ShowIcon from '../../components/images/caret-down.svg';

interface DisplayTogglerProps {
    toggle: () => void;
    currentState: boolean;
}

const stickToEdgeStyle = { position: 'absolute' as 'absolute', right: '5px' };

const containerStyle = {
    width: '15px',
    height: '15px',
    backgroundSize: 'cover',
    backgroundColor: 'transparent',
};
export const DisplayToggler: React.FC<DisplayTogglerProps> = ({ toggle, currentState }) => {
    let image = currentState ? HideIcon : ShowIcon;
    return (
        <Button onClick={() => toggle()} style={stickToEdgeStyle} size='md' color='warning'>
            <div style={{ ...containerStyle, backgroundImage: 'url(' + image + ')' }}></div>
        </Button>
    );
};
