import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';

type Result = [AxiosError | null, () => void];

export const useAxiosErrorHandler = (client: AxiosInstance): Result => {
    const [error, setError] = useState<AxiosError | null>(null);

    const reqInterceptors = client.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            const token = localStorage.getItem('token');
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
    );

    const resInterceptors = client.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            setError(error);
            if (error.response) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject(error.message);
            }
        },
    );

    useEffect(() => {
        return () => {
            client.interceptors.request.eject(reqInterceptors);
            client.interceptors.response.eject(resInterceptors);
        };
    }, [reqInterceptors, resInterceptors, client]);

    const errorConfirmHandler = (): void => {
        setError(null);
    };

    return [error, errorConfirmHandler];
};
