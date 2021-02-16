import { Box, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { FormikProps, useFormik } from 'formik';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import {
    clearIndication,
    createTask,
} from '../../../../../../store/task/action';
import { TRootState } from '../../../../../../store';
import { IValueForm } from '../../../../utils/home.type';
import { SuccessCreateTaskScreen } from './SuccessCreateTaskScreen';
import { TaskForm } from '../../../../../../components/TaskForm';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const validationSchema = yup.object({
    taskName: yup.string().required('Task name is required'),
    grade: yup.string(),
    description: yup.string().required('Description is required'),
    startAt: yup.date().nullable(),
    endAt: yup
        .date()
        .nullable()
        .min(yup.ref('startAt'), 'End time should not be before start time'),
});

export const CreateTaskScreen: React.FC = () => {
    const classes = useStyles();
    const minEndDate = useRef<Date | string | undefined>(new Date());
    const [successCreateTask, setSuccessCreateTask] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();
    const { error, indication } = useSelector(
        (state: TRootState) => state.task,
    );

    useEffect(() => {
        if (indication === 'success') {
            setSuccessCreateTask(true);
            setLoading(false);
        } else if (indication === 'failure') {
            setLoading(false);
        } else if (indication === '') {
            setSuccessCreateTask(false);
        }
    }, [indication]);

    const formik: FormikProps<IValueForm> = useFormik<IValueForm>({
        initialValues: {
            taskName: '',
            grade: 'b',
            priority: 'b',
            description: '',
            startAt: new Date(),
            endAt: new Date(new Date().getTime() + 60000),
        },
        validationSchema,
        onSubmit: (values) => {
            handleSubmitForm(values);
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

    const handleContinueCreateTask = (e: SyntheticEvent) => {
        dispatch(clearIndication());
        minEndDate.current = new Date();
        formik.handleReset(e);
    };

    const handleSubmitForm = (values: IValueForm) => {
        const data = {
            taskName: values.taskName,
            description: values.description,
            grade: values.grade,
            priority: values.priority,
            date: {
                startAt: values.startAt,
                endAt: values.endAt,
            },
        };
        setLoading(true);
        dispatch(createTask(data));
    };

    return (
        <Box className='createTaskForm'>
            <Paper className={classes.paper}>
                <Typography component='h2' variant='h6'>
                    {successCreateTask ? (
                        <>NOTIFICATION</>
                    ) : (
                        <>CREATE NEW TASK</>
                    )}
                </Typography>
                {error && (
                    <Typography component='span' variant='subtitle2'>
                        {error.message}
                    </Typography>
                )}
                <Box mt={2} minWidth='300px'>
                    {successCreateTask ? (
                        <SuccessCreateTaskScreen
                            handleContinueCreateTask={handleContinueCreateTask}
                        />
                    ) : (
                        <TaskForm
                            formik={formik}
                            handleChangeStartTime={handleChangeStartTime}
                            handleChangeEndTime={handleChangeEndTime}
                            minEndDate={minEndDate.current}
                            loading={loading}
                        />
                    )}
                </Box>
            </Paper>
        </Box>
    );
};
