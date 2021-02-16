import { useTheme } from '@material-ui/core';
import React from 'react';

import './index.css';

export const Spinner: React.FC = () => {
    const theme = useTheme();

    return (
        <div
            className='spinner'
            style={{
                borderColor: `${theme.palette.primary.light} ${theme.palette.primary.light} ${theme.palette.primary.light} ${theme.palette.primary.dark}`,
            }}
        >
            Loading...
        </div>
    );
};
