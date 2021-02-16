import React from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { TRootState } from '../../../../../../store';
import { EmptyScreen } from './EmptyScreen';
import { Ellipse } from '../../../../../../components/Loader/Ellipse';
import { Task } from './Task';
import { ToolbarTodo } from './ToolbarTodo';

interface Props {
    handleOpenModal: () => void;
    toggleToolbarTodo: boolean;
}

interface StylesProps {
    toggleToolbarTodo: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    tasksTodo: {
        position: 'relative',
        margin: '0px 4px 16px 20px',
        overflow: 'hidden',
    },
    roller: {
        overflowY: 'auto',
        height: '360px',
        boxSizing: 'border-box',
    },
    layerBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20px',
        background: `linear-gradient(to top, ${theme.palette.background.default}, transparent)`,
    },
    layerAction: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 50,
        width: 'calc(100% - 14px)',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-out',
        transform: (props: StylesProps) =>
            props.toggleToolbarTodo ? 'translateY(0)' : 'translateY(-100%)',
    },
}));

export const TasksTodo: React.FC<Props> = ({
    handleOpenModal,
    toggleToolbarTodo,
}) => {
    const classes = useStyles({ toggleToolbarTodo });

    const { list, loading } = useSelector((state: TRootState) => state.task);

    const renderTasks = (): JSX.Element[] | JSX.Element => {
        if (list.length === 0) {
            return <EmptyScreen handleOpenModal={handleOpenModal} />;
        } else {
            return (
                <Box color='text.primary'>
                    {list.map((task) => {
                        return <Task task={task} key={task._id} />;
                    })}
                </Box>
            );
        }
    };

    return (
        <Box className={classes.tasksTodo}>
            <Box className={classes.layerAction}>
                <ToolbarTodo />
            </Box>
            <Box className={classes.roller}>
                {loading ? (
                    <Box height={1} display='flex' alignItems='center'>
                        <Ellipse />
                    </Box>
                ) : (
                    renderTasks()
                )}
            </Box>
            <Box className={classes.layerBottom}></Box>
        </Box>
    );
};
