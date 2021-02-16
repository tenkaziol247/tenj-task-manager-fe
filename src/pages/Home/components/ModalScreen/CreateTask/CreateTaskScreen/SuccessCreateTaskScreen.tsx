import {
    Box,
    Button,
    Grid,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import React, { SyntheticEvent } from 'react';

interface Props {
    handleContinueCreateTask: (e: SyntheticEvent) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: 500,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 800,
        },
    },
}));

export const SuccessCreateTaskScreen: React.FC<Props> = ({
    handleContinueCreateTask,
}) => {
    const classes = useStyles();
    const renderNotificationSuccess = () => {
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Box
                        display='flex'
                        flexDirection='column'
                        textAlign='center'
                        mb={2}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            mb={1}
                            color='success.main'
                        >
                            <Box mr={1}>
                                <CheckCircle />
                            </Box>
                            <Typography component='h5' variant='h5'>
                                SUCCESS
                            </Typography>
                        </Box>
                        <Typography component='p' variant='subtitle1'>
                            The new task has been created
                        </Typography>
                    </Box>
                    <Box textAlign='center'>
                        <Button
                            onClick={handleContinueCreateTask}
                            variant='contained'
                            color='primary'
                        >
                            Create new task
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        );
    };
    return renderNotificationSuccess();
};
