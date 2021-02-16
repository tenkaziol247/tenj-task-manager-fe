import React, { createContext, useEffect, useRef, useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import { routes } from './pages/routes';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from './store';
import { Routes } from './HOC/Routes';
import { withErrorHandler } from './HOC/withErrorHandler';
import { axiosClient } from './api/axiosClient';
import { checkState } from './store/auth/action';
import { getAvatar, getProfile, clearAllUser } from './store/user/action';
import { fetchTasks, clearAllTask } from './store/task/action';

const configTheme = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
    primary: {
        dark: '#01579b',
        main: '#0277bd',
        light: 'rgba(41, 181, 246, 0.2)',
    },
    secondary: {
        dark: '#F89200',
        main: '#FBBB20',
        light: '#FFDD76',
    },
};

const lightTheme = createMuiTheme({
    breakpoints: configTheme.breakpoints,
    palette: {
        type: 'light',
        primary: configTheme.primary,
        secondary: configTheme.secondary,
        background: {
            paper: '#ffffff',
            default: '#f1f2f6',
        },
    },
});

const darkTheme = createMuiTheme({
    breakpoints: configTheme.breakpoints,
    palette: {
        type: 'dark',
        primary: configTheme.primary,
        secondary: configTheme.secondary,
        background: {
            paper: '#242527',
            default: '#18191b',
        },
    },
});

interface ContextProps {
    handleSwitchTheme: () => void;
    isLightTheme: boolean;
}

export const ThemeContext = createContext<Partial<ContextProps>>({});

const App: React.FC = () => {
    const [isLightTheme, setIsLightTheme] = useState(true);

    const dispatch = useDispatch();

    const { uid } = useSelector((state: TRootState) => state.auth);

    useEffect(() => {
        dispatch(checkState());
    }, [dispatch]);

    useEffect(() => {
        if (uid) {
            //dispatch fetch tasks
            dispatch(fetchTasks());

            //dispatch get profile
            dispatch(getProfile());

            //dispatch get avatar
            dispatch(getAvatar(uid));
        }
    }, [uid, dispatch]);

    useEffect(() => {
        const lightThemeJSON = localStorage.getItem('lightTheme');
        if (lightThemeJSON) {
            const lightTheme: { isLightTheme: boolean } = JSON.parse(
                lightThemeJSON,
            );
            if (lightTheme.isLightTheme) {
                setIsLightTheme(true);
            } else {
                setIsLightTheme(false);
            }
        }
    }, []);

    const handleSwitchTheme = (): void => {
        localStorage.setItem(
            'lightTheme',
            JSON.stringify({ isLightTheme: !isLightTheme }),
        );
        setIsLightTheme((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ handleSwitchTheme, isLightTheme }}>
            <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
                <>
                    <Routes
                        routes={routes}
                        handleSwitchTheme={handleSwitchTheme}
                    />
                </>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default withErrorHandler(App, axiosClient);
