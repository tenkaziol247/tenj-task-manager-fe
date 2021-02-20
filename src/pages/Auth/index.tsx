import {
    Box,
    Grid,
    makeStyles,
    Paper,
    Theme,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from '../../components/Loader/Spinner';
import { TRootState } from '../../store';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';

import './index.css';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100%',
    },
    welcome: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        color: theme.palette.common.white,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    content: {
        minWidth: '310px',
        height: '100%',
        boxSizing: 'border-box',
        padding: '4px',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    content__container: {
        height: '100%',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        textAlign: 'center',
        padding: '32px',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('md')]: {
            padding: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
        },
    },
}));

export const Auth: React.FC = () => {
    const classes = useStyles();
    const { loading } = useSelector((state: TRootState) => state.auth);

    return (
        <main>
            <Box component='section' className='auth'>
                <Grid container className={classes.root}>
                    <Grid item xs={undefined} md={7} lg={8}>
                        <Box minWidth={1} minHeight={1} position='relative'>
                            <Box className={classes.welcome}>
                                <Typography
                                    component='h2'
                                    variant='h4'
                                    color='inherit'
                                >
                                    WELCOME TO <strong>TENJ</strong> APP
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Box className={classes.content}>
                            <Box className={classes.content__container}>
                                {loading ? (
                                    <Box>
                                        <Spinner />
                                    </Box>
                                ) : (
                                    <Switch>
                                        <Route
                                            path='/auth/signup'
                                            exact={true}
                                            component={Signup}
                                        />
                                        <Route
                                            path='/auth/signin'
                                            exact={true}
                                            component={Signin}
                                        />
                                    </Switch>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </main>
    );
};
