import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading: React.FC = () => {
    return (
        <span>
            <Spinner style={{ width: '3rem', height: '3rem' }} />
        </span>
    );
};
