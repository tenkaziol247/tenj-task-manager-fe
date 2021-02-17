import { Box, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';

interface Props {
    handleOpenModal: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        fontSize: 40,
        [theme.breakpoints.down('xs')]: {
            fontSize: 34,
        },
    },
}));

export const CreateTaskButton: React.FC<Props> = ({ handleOpenModal }) => {
    const classes = useStyles();

    return (
        <Box bgcolor='secondary.main' color='common.white' borderRadius='50%'>
            <IconButton size='small' onClick={handleOpenModal} color='inherit'>
                <Add className={classes.icon} color='inherit' />
            </IconButton>
        </Box>
    );
};
