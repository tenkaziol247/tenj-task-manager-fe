import {
    Box,
    Button,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Theme,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { IDataUpdateProfile } from '../../../../../../api/userApi/userApi.type';
import { updateProfile } from '../../../../../../store/user/action';
import { TRootState } from '../../../../../../store';
import { Ellipse } from '../../../../../../components/Loader/Ellipse';

const validationSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters!')
        .max(24, 'Name must have at most 24 characters')
        .required('Name is required'),
    age: yup
        .number()
        .min(0, 'Age must be a positive number')
        .required('Age is required'),
});

interface IPropsStyles {
    isUpdateName?: boolean;
    isUpdateAge?: boolean;
    isReadySubmit?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    boxNameEdit: {
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        visibility: (props: IPropsStyles) =>
            props.isUpdateName ? 'hidden' : 'visible',
    },
    boxAgeEdit: {
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        visibility: (props: IPropsStyles) =>
            props.isUpdateAge ? 'hidden' : 'visible',
    },
    cancelButton: {
        marginRight: '8px',
        visibility: (props: IPropsStyles) =>
            !props.isReadySubmit ? 'hidden' : 'visible',
    },
    layerLoading: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export const UserForm: React.FC = () => {
    const [isReadySubmit, setIsReadySubmit] = useState<boolean>(false);
    const [isUpdateName, setIsUpdateName] = useState<boolean>(false);
    const [isUpdateAge, setIsUpdateAge] = useState<boolean>(false);

    const dispatch = useDispatch();
    const { profile, loadingProfile } = useSelector(
        (state: TRootState) => state.user,
    );

    const classes = useStyles({ isUpdateName, isUpdateAge, isReadySubmit });

    const formik = useFormik({
        initialValues: {
            name: profile?.name,
            age: profile?.age,
        },
        validationSchema,
        onSubmit: (values: IDataUpdateProfile) => {
            dispatch(updateProfile(values));
            setIsUpdateName(false);
            setIsUpdateAge(false);
            setIsReadySubmit(false);
        },
    });

    const handleStartUpdateName = (value: boolean) => {
        setIsUpdateName(value);
        if (value) {
            setIsReadySubmit(true);
        }
    };

    const handleStartUpdateAge = (value: boolean) => {
        setIsUpdateAge(value);
        if (value) {
            setIsReadySubmit(true);
        }
    };

    const handleCancelUpdate = () => {
        formik.setFieldValue('name', profile?.name);
        formik.setFieldValue('age', profile?.age);
        setIsUpdateName(false);
        setIsUpdateAge(false);
        setIsReadySubmit(false);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box
                boxSizing='border-box'
                width={1}
                paddingX={2}
                mb={2}
                position='relative'
            >
                <Box width={1} height={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={profile?.email}
                                variant='outlined'
                                fullWidth
                                size='small'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label='Email'
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box position='relative'>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label='User name'
                                    placeholder='Enter your name'
                                    id='userform__name'
                                    name='name'
                                    value={formik.values.name}
                                    error={
                                        formik.touched.name &&
                                        Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                    onChange={formik.handleChange}
                                    disabled={!isUpdateName}
                                />
                                <Box className={classes.boxNameEdit}>
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleStartUpdateName(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box position='relative'>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label='Age'
                                    placeholder='Enter your age'
                                    id='userform__age'
                                    name='age'
                                    value={formik.values.age}
                                    error={
                                        formik.touched.age &&
                                        Boolean(formik.errors.age)
                                    }
                                    helperText={
                                        formik.touched.age && formik.errors.age
                                    }
                                    onChange={formik.handleChange}
                                    disabled={!isUpdateAge}
                                />
                                <Box className={classes.boxAgeEdit}>
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleStartUpdateAge(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                mt={1}
                            >
                                <Box position='relative' textAlign='center'>
                                    <Box
                                        position='absolute'
                                        top='0'
                                        right='105%'
                                    >
                                        <Button
                                            className={classes.cancelButton}
                                            variant='contained'
                                            onClick={handleCancelUpdate}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='secondary'
                                        disabled={
                                            !isReadySubmit || loadingProfile
                                        }
                                    >
                                        Update
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {loadingProfile && (
                    <Box className={classes.layerLoading}>
                        <Ellipse />
                    </Box>
                )}
            </Box>
        </form>
    );
};
