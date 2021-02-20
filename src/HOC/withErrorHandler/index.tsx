import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
} from '@material-ui/core';
import { AxiosInstance } from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAxiosErrorHandler } from '../../hooks/useAxiosErrorHandler';

export const withErrorHandler = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    axiosClient: AxiosInstance,
) => {
    return (props: P) => {
        const [error, clearError] = useAxiosErrorHandler(axiosClient);

        const history = useHistory();

        const handleRedirectLogout = () => {
            clearError();
            history.push('/logout');
        };

        const renderModal = () => {
            if (error) {
                return (
                    <Dialog open={Boolean(error)} onClose={clearError}>
                        <DialogTitle>Notification</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {error.response?.data.message}.{' '}
                                {error.response?.status === 401
                                    ? 'Press OK to re-login'
                                    : 'Press OK to clear error'}
                            </DialogContentText>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button
                                onClick={
                                    error.response?.status === 401
                                        ? handleRedirectLogout
                                        : clearError
                                }
                                variant='contained'
                                autoFocus
                                color='secondary'
                            >
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
            }
        };

        return (
            <>
                {renderModal()}
                <WrappedComponent {...props} />
            </>
        );
    };
};
