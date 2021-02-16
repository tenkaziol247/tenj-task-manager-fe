import axios, { AxiosInstance } from 'axios';
import React from 'react';
import { useAxiosErrorHandler } from '../../hooks/useAxiosErrorHandler';

export const withErrorHandler = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    axiosClient: AxiosInstance,
) => {
    return (props: P) => {
        const [error, clearError] = useAxiosErrorHandler(axiosClient);

        return (
            <>
                <WrappedComponent {...props} />
            </>
        );
    };
};
