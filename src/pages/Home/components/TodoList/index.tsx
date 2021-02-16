import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import { TransitionsModal } from '../../../../components/TransitionModal';
import { clearIndication } from '../../../../store/task/action';
import { CreateTaskButton } from '../ModalScreen/CreateTask/CreateTaskButton';
import { CreateTaskScreen } from '../ModalScreen/CreateTask/CreateTaskScreen';
import { HeaderTodo } from './HeaderTodo';
import { MainTodo } from './MainTodo';

const useStyles = makeStyles((theme) => ({
    box: {
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: 12,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    button: {
        position: 'absolute',
        bottom: 24,
        right: 20,
    },
}));

export const TodoList: React.FC = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const handleOpenModalCreateTask = (): void => {
        dispatch(clearIndication());
        setOpen(true);
    };

    const handleCloseModalCreateTask = (): void => {
        setOpen(false);
    };

    return (
        <Box className={classes.box}>
            <HeaderTodo />
            <MainTodo handleOpenModal={handleOpenModalCreateTask} />
            <Box className={classes.button}>
                <CreateTaskButton handleOpenModal={handleOpenModalCreateTask} />
                <TransitionsModal
                    open={open}
                    handleCloseModal={handleCloseModalCreateTask}
                >
                    <CreateTaskScreen />
                </TransitionsModal>
            </Box>
        </Box>
    );
};
