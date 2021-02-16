import { Box, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

import { Flag } from '@material-ui/icons';
import { ITask } from '../../../../../../../store/task/task.type';

interface Props {
    task: ITask;
}

const useStyles = makeStyles((theme: Theme) => ({
    flag: {
        marginLeft: 8,
        display: 'flex',
        alignItems: 'center',
        color: 'transparent',
    },
    flagMedium: {
        color: theme.palette.primary.main,
    },
    flagHigh: {
        color: theme.palette.error.main,
    },
    flagDisabled: {
        color: theme.palette.text.disabled,
    },
}));

export const PriorityFlag: React.FC<Props> = ({ task }) => {
    const classes = useStyles();

    const classNameRender = (): string => {
        const classesName = [classes.flag];
        if (task.priority === 'a') {
        } else if (task.completed) {
            classesName.push(classes.flagDisabled);
        } else if (task.priority === 'b') {
            classesName.push(classes.flagMedium);
        } else {
            classesName.push(classes.flagHigh);
        }
        return classesName.join(' ');
    };

    const renderPriority = () => {
        return (
            <Box
                className={classNameRender()}
                title={
                    task.priority === 'b'
                        ? 'Priority: Medium'
                        : task.priority === 'c'
                        ? 'Priority: High'
                        : 'Priority: Low'
                }
            >
                <Flag fontSize='small' color='inherit' />
            </Box>
        );
    };
    return renderPriority();
};
