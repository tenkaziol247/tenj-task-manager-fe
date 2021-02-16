import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

import { ITask } from '../../../../../../../store/task/task.type';

interface Props {
    task: ITask;
}

const useStyles = makeStyles((theme: Theme) => ({
    textChecked: {
        textDecoration: 'line-through',
        color: theme.palette.text.disabled,
        fontWeight: 400,
    },
}));

export const TaskName: React.FC<Props> = ({ task }) => {
    const classes = useStyles();
    const renderTaskName = () => {
        return (
            <Typography
                component='h3'
                variant='inherit'
                className={task.completed ? classes.textChecked : ''}
            >
                {task.taskName}
            </Typography>
        );
    };
    return renderTaskName();
};
