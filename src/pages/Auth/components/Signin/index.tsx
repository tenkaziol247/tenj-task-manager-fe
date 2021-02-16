import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
    TextField,
    Button,
    Link,
    Box,
    Typography,
    makeStyles,
    Theme,
    Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login, authClearState } from '../../../../store/auth/action';
import { TRootState } from '../../../../store';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Must be 6 characters or than')
        .required('Password is required'),
});

const useStyles = makeStyles((theme: Theme) => ({
    gridItem: {
        marginBottom: theme.spacing(2),
    },
}));

export const Signin: React.FC = () => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            loginAccount(values);
        },
    });

    const history = useHistory();

    const dispatch = useDispatch();
    const { error } = useSelector((state: TRootState) => state.auth);

    const loginAccount = (credentials: { email: string; password: string }) => {
        dispatch(login(credentials));
    };

    const handleSwitchClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(authClearState());
        history.push('/auth/signup');
    };

    return (
        <div className='signin'>
            <Box fontSize='1.9rem' mt={2} mb={3}>
                <Typography
                    component='h3'
                    variant='inherit'
                    color='textPrimary'
                >
                    Sign in
                </Typography>
            </Box>
            {error && (
                <Box color='error.main' mb={2}>
                    {error.message}
                </Box>
            )}
            <form onSubmit={formik.handleSubmit}>
                <Grid container>
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            size='small'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label='Email'
                            placeholder='Enter your email'
                            id='signin__email'
                            name='email'
                            value={formik.values.email}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            onChange={formik.handleChange}
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                        variant='outlined'
                        fullWidth
                        size='small'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label='Password'
                        placeholder='Enter password'
                        id='signin__password'
                        name='password'
                        value={formik.values.password}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='password'
                    />
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <Box pt={3}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Log in
                        </Button>
                    </Box>
                </Grid>
            </form>
            <div className='signin__switch'>
                <Typography component='span' color='textPrimary'>
                    Don't have an account?{' '}
                </Typography>
                <Link href='#' onClick={handleSwitchClick}>
                    Create an account
                </Link>
            </div>
        </div>
    );
};
