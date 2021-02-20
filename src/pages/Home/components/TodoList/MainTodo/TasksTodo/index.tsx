import React, { useEffect, useRef, useState } from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { TRootState } from '../../../../../../store';
import { EmptyScreen } from './EmptyScreen';
import { Ellipse } from '../../../../../../components/Loader/Ellipse';
import { Task } from './Task';
import { ToolbarTodo } from './ToolbarTodo';
import { ITask } from '../../../../../../store/task/task.type';

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
        maxHeight: '100%',
        height: '100%',
    },
    roller: {
        overflowY: 'auto',
        overflowX: 'hidden',
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
    const [list, setList] = useState<ITask[]>([]);

    const { list: listOrigin, loading, selectedDate } = useSelector(
        (state: TRootState) => state.task,
    );

    useEffect(() => {
        if (selectedDate) {
            const tempList = listOrigin.filter((task: ITask) => {
                return moment(selectedDate).isSame(
                    moment(task.date.endAt),
                    'day',
                );
            });
            setList(tempList);
        } else {
            setList([...listOrigin]);
        }
    }, [selectedDate, listOrigin]);

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
        <div className={classes.tasksTodo}>
            <Box className={classes.layerAction}>
                <ToolbarTodo />
            </Box>
            <Box className={classes.roller}>
                {loading ? (
                    <Box height={1} position='relative'>
                        <Ellipse />
                    </Box>
                ) : (
                    renderTasks()
                )}
            </Box>
            <Box className={classes.layerBottom}></Box>
        </div>
    );
};
