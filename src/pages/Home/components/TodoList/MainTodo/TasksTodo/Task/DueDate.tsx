import { Box } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

import { ITask } from '../../../../../../../store/task/task.type';

interface Props {
    task: ITask;
}

export const DueDate: React.FC<Props> = ({ task }) => {
    const renderDueDate = () => {
        //get content render
        let content = (
            <>
                <b>Due Date: </b> Unknown
            </>
        );
        if (task.date && task.date.endAt) {
            content = (
                <>
                    <b>Due Date: </b> {moment(task.date.endAt).calendar()}
                </>
            );
        }

        //set style render
        if (task.completed) {
            return (
                <Box component='span' color='text.disabled'>
                    {content}
                </Box>
            );
        } else if (
            task.date &&
            task.date.endAt &&
            moment(task.date.endAt).isSame(moment(), 'day')
        ) {
            return (
                <Box component='span' color='error.main'>
                    {content}
                </Box>
            );
        } else {
            return content;
        }
    };
    return renderDueDate();
};
