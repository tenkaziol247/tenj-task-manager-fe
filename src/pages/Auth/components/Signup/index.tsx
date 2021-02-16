import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Grid,
    Link,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TRootState } from '../../../../store';
import { register, authClearState } from '../../../../store/auth/action';

const validationSchema = yup.object({
    name: yup.string().required('Your name is required'),
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Must be 6 characters or than')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must match'),
});

const useStyles = makeStyles((theme: Theme) => ({
    gridItem: {
        marginBottom: theme.spacing(2),
    },
}));

export const Signup: React.FC = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema,
        onSubmit: (values) => {
            submitRegisterForm(values);
        },
    });

    const history = useHistory();

    const dispatch = useDispatch();
    const { error } = useSelector((state: TRootState) => state.auth);

    const submitRegisterForm = (data: {
        name: string;
        email: string;
        password: string;
    }) => {
        dispatch(register(data));
    };

    const handleSwitchClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(authClearState());
        history.push('/auth/signin');
    };

    return (
        <div className='signup'>
            <Box fontSize='1.9rem' mt={2} mb={3}>
                <Typography
                    component='h3'
                    variant='inherit'
                    color='textPrimary'
                >
                    Sign up
                </Typography>
            </Box>
            {error && <Box color='error.main'>{error.message}</Box>}
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
                            label='Your name'
                            placeholder='Enter your name'
                            id='__name'
                            name='name'
                            value={formik.values.name}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                            onChange={formik.handleChange}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            size='small'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label='Email'
                            placeholder='Enter email'
                            id='__email'
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
                            onBlur={formik.handleBlur}
                        />
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
                            id='__password'
                            name='password'
                            value={formik.values.password}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type='password'
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            size='small'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label='Re-enter Password'
                            placeholder='Re-enter password'
                            id='__passwordConfirmation'
                            name='passwordConfirmation'
                            value={formik.values.passwordConfirmation}
                            error={
                                formik.touched.passwordConfirmation &&
                                Boolean(formik.errors.passwordConfirmation)
                            }
                            helperText={
                                formik.touched.passwordConfirmation &&
                                formik.errors.passwordConfirmation
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
                                Create account
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            <Box>
                <Typography component='span' color='textPrimary'>
                    Already have an account?{' '}
                </Typography>
                <Link href='#' onClick={handleSwitchClick}>
                    Sign in
                </Link>
            </Box>
        </div>
    );
};
