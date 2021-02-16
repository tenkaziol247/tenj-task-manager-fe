import { Delete, FilterList } from '@material-ui/icons';
import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    makeStyles,
    IconButton,
    Box,
    Theme,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { deleteTasksCompleted } from '../../../../../../store/task/action';

interface Props {
    toggleSort: boolean;
    handleToggleSort: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: '0px 16px 8px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    box: {
        marginRight: 4,
        borderRadius: '50%',
        color: theme.palette.text.primary,
        background: theme.palette.background.paper,
    },
    boxActive: {
        background: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },
    button: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));

export const ActionsTodo: React.FC<Props> = ({
    toggleSort,
    handleToggleSort,
}) => {
    const classes = useStyles();

    const [toggleDeleteTasks, setToggleDeleteTasks] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleToggleDeleteTasks = (value: boolean) => {
        setToggleDeleteTasks(value);
    };

    const acceptDeleteTasks = () => {
        dispatch(deleteTasksCompleted());
        handleToggleDeleteTasks(false);
    };

    return (
        <div>
            <Box className={classes.root}>
                <Box
                    className={[
                        classes.box,
                        toggleDeleteTasks ? classes.boxActive : undefined,
                    ].join(' ')}
                >
                    <IconButton
                        size='small'
                        color='inherit'
                        onClick={() => handleToggleDeleteTasks(true)}
                    >
                        <Delete />
                    </IconButton>
                </Box>
                <Box
                    className={[
                        classes.box,
                        toggleSort ? classes.boxActive : undefined,
                    ].join(' ')}
                >
                    <IconButton
                        size='small'
                        color='inherit'
                        onClick={handleToggleSort}
                    >
                        <FilterList />
                    </IconButton>
                </Box>
            </Box>
            <Dialog
                open={toggleDeleteTasks}
                onClose={() => handleToggleDeleteTasks(false)}
            >
                <DialogTitle>DELETE COMPLETED TASKS</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want delete all tasks completed?
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        onClick={() => handleToggleDeleteTasks(false)}
                        variant='contained'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={acceptDeleteTasks}
                        variant='contained'
                        autoFocus
                        className={classes.button}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
