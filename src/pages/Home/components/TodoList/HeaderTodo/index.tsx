import { Box, IconButton, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import { SettingTodo } from './SettingTodo';
import { AvatarTodo } from './AvatarTodo';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px 8px',
        boxSizing: 'border-box',
    },
    boxLeft: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export const HeaderTodo: React.FC = () => {
    const classes = useStyles();

    return (
        <div className='headerTodo'>
            <Box className={classes.root}>
                <Box className={classes.boxLeft}>
                    <SettingTodo />
                </Box>
                <Box>
                    <AvatarTodo />
                </Box>
            </Box>
        </div>
    );
};
