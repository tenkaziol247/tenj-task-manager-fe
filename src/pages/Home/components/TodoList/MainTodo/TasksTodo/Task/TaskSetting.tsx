import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Popover,
    Theme,
} from '@material-ui/core';
import { Delete, MoreHoriz, Pageview } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

interface Props {
    handleRemoveTask: () => void;
    handleViewTask: () => void;
    taskName: string;
    openViewTask: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minWidth: 140,
    },
    iconCustom: {
        minWidth: 30,
    },
    button: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    dialog: {
        marginBottom: 4,
        marginRight: 8,
    },
}));

export const TaskSetting: React.FC<Props> = ({
    handleRemoveTask,
    handleViewTask,
    taskName,
    openViewTask,
}) => {
    const classes = useStyles();
    const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (openViewTask) {
            handleClosePopover();
        }
    }, [openViewTask]);

    const handleOpenPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEle(e.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEle(null);
    };

    const handleDialogClick = (value: boolean) => {
        if (value) {
            handleClosePopover();
        }
        setOpen(value);
    };

    const handleAcceptRemoveTask = () => {
        handleDialogClick(false);
        handleRemoveTask();
    };

    const isOpen = Boolean(anchorEle);
    const id = isOpen ? 'taskSetting__popover' : undefined;

    return (
        <div className='taskSetting'>
            <IconButton
                size='small'
                color='inherit'
                onClick={handleOpenPopover}
            >
                <MoreHoriz />
            </IconButton>
            <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEle}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <Paper variant='outlined'>
                    <List dense component='nav' className={classes.root}>
                        <ListItem divider button onClick={handleViewTask}>
                            <ListItemIcon className={classes.iconCustom}>
                                <Pageview fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='View task' />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleDialogClick(true)}
                        >
                            <ListItemIcon className={classes.iconCustom}>
                                <Delete fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Delete task' />
                        </ListItem>
                    </List>
                </Paper>
            </Popover>
            <Dialog open={open} onClose={() => handleDialogClick(false)}>
                <DialogTitle>DELETE TASK</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want delete <b>{taskName}</b> task?
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialog}>
                    <Button
                        onClick={() => handleDialogClick(false)}
                        variant='contained'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAcceptRemoveTask}
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
