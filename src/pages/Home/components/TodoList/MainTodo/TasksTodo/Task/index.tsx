import {
    Box,
    Checkbox,
    CircularProgress,
    Fade,
    FormControlLabel,
    LinearProgress,
    makeStyles,
    Paper,
    Slide,
    Theme,
    Typography,
    withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deleteTask, updateTask } from '../../../../../../../store/task/action';
import { ITask } from '../../../../../../../store/task/task.type';
import { TransitionsModal } from '../../../../../../../components/TransitionModal';
import { DueDate } from './DueDate';
import { DifficultyLevel } from './DifficultyLevel';
import { TaskName } from './TaskName';
import { PriorityFlag } from './PriorityFlag';
import { TaskSetting } from './TaskSetting';
import { ViewTask } from '../../../../ModalScreen/ViewTask';

interface Props {
    task: ITask;
}

const CustomCheckbox = withStyles({
    root: {
        '&$checked': {
            color: green[900],
        },
    },
    checked: {},
})((props) => <Checkbox color='default' {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: '4px 10px 12px 14px',
        margin: '0 12px 8px 0',
        cursor: 'pointer',
    },
    paperSuccess: {
        backgroundColor: theme.palette.background.default,
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export const Task: React.FC<Props> = ({ task }) => {
    const classes = useStyles();
    const [loadingCheckbox, setLoadingCheckbox] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

    const [openView, setOpenView] = useState<boolean>(false);

    useEffect(() => {
        setLoadingCheckbox(false);
    }, [task]);

    const dispatch = useDispatch();

    const handleChangeCheckbox = () => {
        const data = { _id: task._id, updates: { completed: !task.completed } };
        setLoadingCheckbox(true);
        dispatch(updateTask(data));
    };

    const handleRemoveTask = () => {
        setLoadingDelete(true);
        dispatch(deleteTask(task._id));
    };

    const handleOpenViewModal = () => {
        setOpenView(true);
    };

    const handleCloseViewModal = () => {
        setOpenView(false);
    };

    const renderTitle = () => {
        if (task.date && task.date.startAt) {
            return `Start at: ${moment(task.date.startAt).calendar()}`;
        }
        return `Start at: Unknown`;
    };

    return (
        <>
            <Slide
                in={Boolean(task)}
                timeout={200}
                direction='left'
                mountOnEnter
                unmountOnExit
            >
                <Paper
                    variant='outlined'
                    className={[
                        classes.paper,
                        `${task.completed ? classes.paperSuccess : undefined}`,
                    ].join(' ')}
                >
                    <Box height='2px'>
                        {loadingDelete ? <LinearProgress /> : null}
                    </Box>
                    <Box className={classes.box}>
                        <FormControlLabel
                            checked={task.completed}
                            onChange={handleChangeCheckbox}
                            control={
                                loadingCheckbox ? (
                                    <Box m='10px 12px 9.8px 11px'>
                                        <CircularProgress size={16} />
                                    </Box>
                                ) : (
                                    <CustomCheckbox />
                                )
                            }
                            label={
                                <Box
                                    mt='4px'
                                    display='flex'
                                    alignItems='center'
                                >
                                    <TaskName task={task} />
                                    <PriorityFlag task={task} />
                                </Box>
                            }
                        />
                        <Box color='text.secondary'>
                            <TaskSetting
                                handleRemoveTask={handleRemoveTask}
                                handleViewTask={handleOpenViewModal}
                                taskName={task.taskName}
                                openViewTask={openView}
                            />
                        </Box>
                    </Box>
                    <Box className={classes.box}>
                        <Typography component='p' title={renderTitle()}>
                            <DueDate task={task} />
                        </Typography>
                        <DifficultyLevel task={task} />
                    </Box>
                </Paper>
            </Slide>
            <TransitionsModal
                open={openView}
                handleCloseModal={handleCloseViewModal}
            >
                <ViewTask task={task} />
            </TransitionsModal>
        </>
    );
};
