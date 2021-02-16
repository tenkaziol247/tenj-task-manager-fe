import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../store/auth/action';
import { TRootState } from '../../store';
import { Spinner } from '../../components/Loader/Spinner';

import './index.css';
import { clearAllUser } from '../../store/user/action';
import { clearAllTask } from '../../store/task/action';

export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, uid } = useSelector((state: TRootState) => state.auth);

    useEffect(() => {
        dispatch(logout());
        dispatch(clearAllUser());
        dispatch(clearAllTask());
    }, [dispatch]);

    const renderContent = () => {
        if (!loading && !uid) {
            return <Redirect to='/auth/signin' />;
        }
        return (
            <main className='logout'>
                <Box className='logout__content'>
                    <Spinner />
                </Box>
            </main>
        );
    };

    return renderContent();
};
