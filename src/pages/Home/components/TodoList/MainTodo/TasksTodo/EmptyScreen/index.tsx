import {
    Box,
    IconButton,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { Add, DoneAll } from '@material-ui/icons';
import React from 'react';

interface Props {
    handleOpenModal: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.text.primary,
    },
}));

export const EmptyScreen: React.FC<Props> = ({ handleOpenModal }) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box>
                <DoneAll fontSize='large' />
                <Typography component='h4' variant='inherit'>
                    NO TASKS FOR TODAY
                </Typography>
                <Box mt={1}>
                    <Typography component='span' variant='inherit'>
                        Add a task
                    </Typography>
                    <IconButton size='small' onClick={handleOpenModal}>
                        <Add color='error' />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};
