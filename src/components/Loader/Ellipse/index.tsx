import { useTheme } from '@material-ui/core';
import React from 'react';

import './index.css';

export const Ellipse: React.FC = () => {
    const theme = useTheme();

    return (
        <div className='ellipse'>
            <div
                className='inner one'
                style={{ borderBottomColor: `${theme.palette.primary.main}` }}
            ></div>
            <div
                className='inner two'
                style={{ borderRightColor: `${theme.palette.primary.main}` }}
            ></div>
            <div
                className='inner three'
                style={{ borderTopColor: `${theme.palette.primary.main}` }}
            ></div>
        </div>
    );
};
