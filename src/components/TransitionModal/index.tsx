import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

interface Props {
    handleCloseModal: () => void;
    open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
        },
        exit: {
            position: 'absolute',
            top: 8,
            right: 8,
            color: theme.palette.error.main,
        },
    }),
);

export const TransitionsModal: React.FC<Props> = ({
    handleCloseModal,
    open,
    children,
}) => {
    const classes = useStyles();

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 400,
                }}
            >
                <Fade in={open}>
                    <Box position='relative'>
                        <Box className={classes.exit}>
                            <IconButton
                                size='small'
                                color='inherit'
                                onClick={handleCloseModal}
                            >
                                <Clear />
                            </IconButton>
                        </Box>
                        {children}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
