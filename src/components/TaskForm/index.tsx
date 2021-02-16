import moment from 'moment';
import {
    Box,
    Button,
    Grid,
    makeStyles,
    MenuItem,
    TextField,
    Theme,
    FormHelperText,
    IconButton,
} from '@material-ui/core';
import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { FormikProps } from 'formik';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IValueForm } from '../../pages/Home/utils/home.type';
import { Ellipse } from '../Loader/Ellipse';
import { Edit } from '@material-ui/icons';

interface Props {
    formik: FormikProps<IValueForm>;
    handleChangeStartTime: (date: MaterialUiPickersDate) => void;
    handleChangeEndTime: (date: MaterialUiPickersDate) => void;
    minEndDate: Date | string | undefined;
    loading: boolean;
    view?: boolean;
    isAdjustTaskName?: boolean;
    isAdjustPriority?: boolean;
    isAdjustDifficultyLevel?: boolean;
    isAdjustStartTime?: boolean;
    isAdjustEndTime?: boolean;
    isAdjustDescription?: boolean;
    handleAdjustTaskName?: (value: boolean) => void;
    handleAdjustPriority?: (value: boolean) => void;
    handleAdjustDifficultyLevel?: (value: boolean) => void;
    handleAdjustStartTime?: (value: boolean) => void;
    handleAdjustEndTime?: (value: boolean) => void;
    handleAdjustDescription?: (value: boolean) => void;
    resetAdjust?: () => void;
}

interface IPropsStyles {
    isAdjustTaskName?: boolean;
    isAdjustPriority?: boolean;
    isAdjustDifficultyLevel?: boolean;
    isAdjustStartTime?: boolean;
    isAdjustEndTime?: boolean;
    isAdjustDescription?: boolean;
    isCancelAdjust?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
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
        width: '100%',
        height: '100%',
    },
    gridContainer: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: 500,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 800,
        },
    },
    textField: {
        minWidth: 280,
    },
    textFieldTimePicker: {
        minWidth: 280,
        '&.MuiFormControl-marginNormal': {
            marginTop: 0,
            marginBottom: 0,
        },
        '& .MuiFormHelperText-root': {
            display: 'none',
        },
    },
    errorText: {
        color: theme.palette.error.main,
    },
    buttonEdit: {
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '50%',
        backgroundColor: theme.palette.background.paper,
    },
    buttonAdjustTaskName: {
        visibility: (props: IPropsStyles) =>
            props.isAdjustTaskName ? 'hidden' : 'visible',
    },
    buttonAdjustPriority: {
        visibility: (props: IPropsStyles) =>
            props.isAdjustPriority ? 'hidden' : 'visible',
    },
    buttonAdjustDifficultyLevel: {
        visibility: (props: IPropsStyles) =>
            props.isAdjustDifficultyLevel ? 'hidden' : 'visible',
    },
    buttonAdjustStartTime: {
        visibility: (props: IPropsStyles) =>
            props.isAdjustStartTime ? 'hidden' : 'visible',
    },
    buttonAdjustEndTime: {
        visibility: (props: IPropsStyles) =>
            props.isAdjustEndTime ? 'hidden' : 'visible',
    },
    buttonAdjustDescription: {
        visibility: (props: IPropsStyles) =>
            props.isAdjustDescription ? 'hidden' : 'visible',
    },
    cancelButton: {
        position: 'absolute',
        top: 0,
        right: '110%',
        visibility: (props) =>
            props.isAdjustTaskName ||
            props.isAdjustPriority ||
            props.isAdjustDifficultyLevel ||
            props.isAdjustStartTime ||
            props.isAdjustEndTime ||
            props.isAdjustDescription
                ? 'visible'
                : 'hidden',
    },
}));

export const TaskForm: React.FC<Props> = ({
    formik,
    handleChangeStartTime,
    handleChangeEndTime,
    minEndDate,
    loading,
    view = false,
    isAdjustTaskName,
    isAdjustPriority,
    isAdjustDifficultyLevel,
    isAdjustStartTime,
    isAdjustEndTime,
    isAdjustDescription,
    handleAdjustTaskName = (value: boolean) => {},
    handleAdjustPriority = (value: boolean) => {},
    handleAdjustDifficultyLevel = (value: boolean) => {},
    handleAdjustStartTime = (value: boolean) => {},
    handleAdjustEndTime = (value: boolean) => {},
    handleAdjustDescription = (value: boolean) => {},
    resetAdjust = () => {},
}) => {
    const classes = useStyles({
        isAdjustTaskName,
        isAdjustPriority,
        isAdjustDifficultyLevel,
        isAdjustStartTime,
        isAdjustEndTime,
        isAdjustDescription,
    });

    return (
        <Box className={classes.root}>
            {loading && (
                <Box className={classes.layerLoading}>
                    <Ellipse />
                </Box>
            )}
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1} className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <Box position='relative' mb={1}>
                            <TextField
                                className={classes.textField}
                                variant='outlined'
                                fullWidth
                                size='small'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label='Task name'
                                placeholder='Enter task name'
                                id='taskform__taskname'
                                name='taskName'
                                value={formik.values.taskName}
                                error={
                                    formik.touched.taskName &&
                                    Boolean(formik.errors.taskName)
                                }
                                helperText={
                                    formik.touched.taskName &&
                                    formik.errors.taskName
                                }
                                onChange={formik.handleChange}
                                autoFocus
                                disabled={view ? !isAdjustTaskName : false}
                            />
                            {view && (
                                <Box
                                    className={[
                                        classes.buttonEdit,
                                        classes.buttonAdjustTaskName,
                                    ].join(' ')}
                                >
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleAdjustTaskName(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box position='relative' mb={1}>
                            <TextField
                                className={classes.textField}
                                select
                                fullWidth
                                variant='outlined'
                                size='small'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label='Difficulty level'
                                id='taskform__grade'
                                name='grade'
                                value={formik.values.grade}
                                onChange={formik.handleChange}
                                disabled={
                                    view ? !isAdjustDifficultyLevel : false
                                }
                            >
                                <MenuItem value='a'>Easy</MenuItem>
                                <MenuItem value='b'>Normal</MenuItem>
                                <MenuItem value='c'>Hard</MenuItem>
                            </TextField>
                            {view && (
                                <Box
                                    className={[
                                        classes.buttonEdit,
                                        classes.buttonAdjustDifficultyLevel,
                                    ].join(' ')}
                                >
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleAdjustDifficultyLevel(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box position='relative' mb={1}>
                            <TextField
                                className={classes.textField}
                                select
                                fullWidth
                                variant='outlined'
                                size='small'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label='Priority'
                                id='taskform__priority'
                                name='priority'
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                                disabled={view ? !isAdjustPriority : false}
                            >
                                <MenuItem value='a'>Low</MenuItem>
                                <MenuItem value='b'>Medium</MenuItem>
                                <MenuItem value='c'>High</MenuItem>
                            </TextField>
                            {view && (
                                <Box
                                    className={[
                                        classes.buttonEdit,
                                        classes.buttonAdjustPriority,
                                    ].join(' ')}
                                >
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleAdjustPriority(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box position='relative' mb={1}>
                            <MuiPickersUtilsProvider
                                libInstance={moment}
                                utils={MomentUtils}
                            >
                                <KeyboardDateTimePicker
                                    className={classes.textFieldTimePicker}
                                    size='small'
                                    inputVariant='outlined'
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    format='DD/MM/YYYY hh:mm A'
                                    id='taskform__startTime'
                                    label='Start time'
                                    placeholder='Choose a start time'
                                    name='startAt'
                                    value={formik.values.startAt}
                                    onChange={handleChangeStartTime}
                                    disabled={view ? !isAdjustStartTime : false}
                                />
                            </MuiPickersUtilsProvider>
                            {view && (
                                <Box
                                    className={[
                                        classes.buttonEdit,
                                        classes.buttonAdjustStartTime,
                                    ].join(' ')}
                                >
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleAdjustStartTime(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box position='relative' mb={0}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDateTimePicker
                                    className={classes.textFieldTimePicker}
                                    size='small'
                                    inputVariant='outlined'
                                    margin='normal'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    format='DD/MM/YYYY hh:mm A'
                                    id='taskform__endTime'
                                    label='End time'
                                    placeholder='Choose a end time'
                                    name='endAt'
                                    value={formik.values.endAt}
                                    onChange={handleChangeEndTime}
                                    minDate={minEndDate}
                                    minDateMessage={<></>}
                                    disabled={view ? !isAdjustEndTime : false}
                                />
                            </MuiPickersUtilsProvider>
                            {view && (
                                <Box
                                    className={[
                                        classes.buttonEdit,
                                        classes.buttonAdjustEndTime,
                                    ].join(' ')}
                                >
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleAdjustEndTime(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        <FormHelperText
                            error={
                                formik.touched.endAt &&
                                Boolean(formik.errors.endAt)
                            }
                            className={classes.errorText}
                        >
                            {formik.errors.endAt}
                        </FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <Box position='relative' mb={1}>
                            <TextField
                                className={classes.textField}
                                variant='outlined'
                                fullWidth
                                multiline
                                rows={6}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label='Description'
                                placeholder='Enter description'
                                id='taskform__description'
                                name='description'
                                value={formik.values.description}
                                error={
                                    formik.touched.description &&
                                    Boolean(formik.errors.description)
                                }
                                helperText={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                                onChange={formik.handleChange}
                                disabled={view ? !isAdjustDescription : false}
                            />
                            {view && (
                                <Box
                                    className={[
                                        classes.buttonEdit,
                                        classes.buttonAdjustDescription,
                                    ].join(' ')}
                                >
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            handleAdjustDescription(true)
                                        }
                                    >
                                        <Edit fontSize='small' />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Box position='relative'>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    disabled={loading}
                                >
                                    {view ? 'Save' : 'Create'}
                                </Button>
                                <Button
                                    variant='contained'
                                    className={classes.cancelButton}
                                    disabled={loading}
                                    onClick={resetAdjust}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
