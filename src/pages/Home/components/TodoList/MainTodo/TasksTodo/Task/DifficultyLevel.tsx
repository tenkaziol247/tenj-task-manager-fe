import { Box } from '@material-ui/core';
import React from 'react';

import { ITask } from '../../../../../../../store/task/task.type';

interface Props {
    task: ITask;
}

export const DifficultyLevel: React.FC<Props> = ({ task }) => {
    const renderDifficultyLevel = () => {
        return (
            <Box
                color={
                    task.completed
                        ? 'text.disabled'
                        : task.grade === 'a'
                        ? 'success.main'
                        : task.grade === 'b'
                        ? 'warning.main'
                        : 'error.main'
                }
                border={1}
                borderRadius={4}
                px='4px'
                fontSize='0.8rem'
            >
                {task.grade === 'a'
                    ? 'Easy'
                    : task.grade === 'b'
                    ? 'Normal'
                    : 'Hard'}
            </Box>
        );
    };
    return renderDifficultyLevel();
};
