import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FormikProps, useFormik } from 'formik';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Box, makeStyles, Paper, Theme, Typography } from '@material-ui/core';

import { TRootState } from '../../../../../store';
import { TaskForm } from '../../../../../components/TaskForm';
import { ITask } from '../../../../../store/task/task.type';
import { IValueForm } from '../../../utils/home.type';
import { updateTask } from '../../../../../store/task/action';

interface Props {
    task: ITask;
}

const validationSchema = yup.object({
    taskName: yup.string().required('Task name is required'),
    grade: yup.string(),
    description: yup.string().required('Description is required'),
    startAt: yup.date().nullable(),
    endAt: yup
        .date()
        .nullable()
        .min(yup.ref('startAt'), 'Date should not be before start time'),
});

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

export const ViewTask: React.FC<Props> = ({ task }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdjustTaskName, setIsAdjustTaskName] = useState<boolean>(false);
    const [isAdjustPriority, setIsAdjustPriority] = useState<boolean>(false);
    const [
        isAdjustDifficultyLevel,
        setIsAdjustDifficultyLevel,
    ] = useState<boolean>(false);
    const [isAdjustStartTime, setIsAdjustStartTime] = useState<boolean>(false);
    const [isAdjustEndTime, setIsAdjustEndTime] = useState<boolean>(false);
    const [isAdjustDescription, setIsAdjustDescription] = useState<boolean>(
        false,
    );
    const minEndDate = useRef<Date | string | undefined>(task.date?.endAt);

    const dispatch = useDispatch();
    const { indication, error } = useSelector(
        (state: TRootState) => state.task,
    );

    useEffect(() => {
        if (indication === 'done' || indication === 'error') {
            setLoading(false);
            resetState();
        }
    }, [indication]);

    const formik: FormikProps<IValueForm> = useFormik<IValueForm>({
        initialValues: {
            taskName: task.taskName,
            grade: task.grade,
            priority: task.priority,
            description: task.description,
            startAt:
                task.date && task.date.startAt
                    ? new Date(task.date?.startAt)
                    : undefined,
            endAt:
                task.date && task.date.endAt
                    ? new Date(task.date?.endAt)
                    : undefined,
        },
        validationSchema,
        onSubmit: (values) => {
            handleSaveTask(values);
        },
    });

    const handleChangeStartTime = (date: MaterialUiPickersDate) => {
        formik.setFieldValue('startAt', date);
        if (date !== undefined) {
            minEndDate.current = date;
        }
    };

    const handleChangeEndTime = (date: MaterialUiPickersDate) => {
        formik.setFieldValue('endAt', date);
    };

    const handleSaveTask = (values: IValueForm) => {
        const data = {
            _id: task._id,
            updates: {
                taskName: values.taskName,
                description: values.description,
                completed: task.completed,
                grade: values.grade,
                priority: values.priority,
                date: {
                    startAt: values.startAt,
                    endAt: values.endAt,
                },
            },
        };
        setLoading(true);
        dispatch(updateTask(data));
    };

    const handleAdjustTaskname = (value: boolean) => {
        setIsAdjustTaskName(value);
    };

    const handleAdjustPriority = (value: boolean) => {
        setIsAdjustPriority(value);
    };

    const handleAdjustDifficultyLevel = (value: boolean) => {
        setIsAdjustDifficultyLevel(value);
    };

    const handleAdjustStartTime = (value: boolean) => {
        setIsAdjustStartTime(value);
    };

    const handleAdjustEndTime = (value: boolean) => {
        setIsAdjustEndTime(value);
    };

    const handleAdjustDescription = (value: boolean) => {
        setIsAdjustDescription(value);
    };

    const resetAdjust = () => {
        resetState();
        formik.setFieldValue('taskName', task.taskName);
        formik.setFieldValue('grade', task.grade);
        formik.setFieldValue('priority', task.priority);
        formik.setFieldValue('description', task.description);
        formik.setFieldValue(
            'startAt',
            task.date && task.date.startAt
                ? new Date(task.date?.startAt)
                : undefined,
        );
        formik.setFieldValue(
            'endAt',
            task.date && task.date.endAt
                ? new Date(task.date?.endAt)
                : undefined,
        );
    };

    const resetState = () => {
        setIsAdjustTaskName(false);
        setIsAdjustDifficultyLevel(false);
        setIsAdjustPriority(false);
        setIsAdjustStartTime(false);
        setIsAdjustEndTime(false);
        setIsAdjustDescription(false);
    };

    return (
        <Box className='viewTaskForm'>
            <Paper className={classes.paper}>
                <Typography component='h2' variant='h6'>
                    TASK DETAIL
                </Typography>
                {error && (
                    <Typography component='span' variant='subtitle2'>
                        {error.message}
                    </Typography>
                )}
                <Box mt={2} minWidth='300px'>
                    <TaskForm
                        formik={formik}
                        handleChangeStartTime={handleChangeStartTime}
                        handleChangeEndTime={handleChangeEndTime}
                        minEndDate={minEndDate.current}
                        loading={loading}
                        view={true}
                        isAdjustTaskName={isAdjustTaskName}
                        isAdjustPriority={isAdjustPriority}
                        isAdjustDifficultyLevel={isAdjustDifficultyLevel}
                        isAdjustStartTime={isAdjustStartTime}
                        isAdjustEndTime={isAdjustEndTime}
                        isAdjustDescription={isAdjustDescription}
                        handleAdjustTaskName={handleAdjustTaskname}
                        handleAdjustPriority={handleAdjustPriority}
                        handleAdjustDifficultyLevel={
                            handleAdjustDifficultyLevel
                        }
                        handleAdjustStartTime={handleAdjustStartTime}
                        handleAdjustEndTime={handleAdjustEndTime}
                        handleAdjustDescription={handleAdjustDescription}
                        resetAdjust={resetAdjust}
                    />
                </Box>
            </Paper>
        </Box>
    );
};
