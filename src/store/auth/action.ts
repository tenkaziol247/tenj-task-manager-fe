import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { userApi } from '../../api/userApi';
import {
    IDataCreateAccount,
    IDataLoginAccount,
    IResponseTokenAndUser,
} from '../../api/userApi/userApi.type';
import { actionTypes } from './actionTypes';
import {
    IAuthClearState,
    IError,
    ILoginFailure,
    ILoginStart,
    ILoginSuccess,
    IRegisterFailure,
    IRegisterStart,
    IRegisterSuccess,
} from './auth.type';

//clear state
export const authClearState = (): IAuthClearState => {
    return {
        type: actionTypes.CLEAR_ALL_AUTH,
    };
};

//register account
const registerStart = (): IRegisterStart => {
    return {
        type: actionTypes.REGISTER_START,
    };
};

const registerSuccess = (token: string, uid: string): IRegisterSuccess => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: {
            token,
            uid,
        },
    };
};

const registerFailure = (error: IError): IRegisterFailure => {
    return {
        type: actionTypes.REGISTER_FAILURE,
        payload: {
            error,
        },
    };
};

export const register = (accountData: IDataCreateAccount) => {
    return (
        dispatch: Dispatch<
            IRegisterStart | IRegisterSuccess | IRegisterFailure
        >,
    ) => {
        dispatch(registerStart());
        userApi
            .createAccount<IResponseTokenAndUser>(accountData)
            .then((response: AxiosResponse<IResponseTokenAndUser>) => {
                const uid = response.data.user._id;
                const token = response.data.token;
                localStorage.setItem('uid', uid);
                localStorage.setItem('token', token);
                dispatch(registerSuccess(token, uid));
            })
            .catch((error) => {
                dispatch(registerFailure(error));
            });
    };
};

//login
const loginStart = (): ILoginStart => {
    return {
        type: actionTypes.LOGIN_START,
    };
};

const loginSuccess = (token: string, uid: string): ILoginSuccess => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            token,
            uid,
        },
    };
};

const loginFailure = (error: IError): ILoginFailure => {
    return {
        type: actionTypes.LOGIN_FAILURE,
        payload: {
            error,
        },
    };
};

export const login = (data: IDataLoginAccount) => {
    return (
        dispatch: Dispatch<ILoginStart | ILoginSuccess | ILoginFailure>,
    ) => {
        dispatch(loginStart());
        userApi
            .loginAccount<IResponseTokenAndUser>(data)
            .then((response: AxiosResponse<IResponseTokenAndUser>) => {
                const token = response.data.token;
                const uid = response.data.user._id;
                localStorage.setItem('uid', uid);
                localStorage.setItem('token', token);
                dispatch(loginSuccess(token, uid));
            })
            .catch((error) => {
                dispatch(loginFailure(error));
            });
    };
};

//logout
export const logout = () => {
    return async (dispatch: Dispatch<IAuthClearState>) => {
        await userApi.logoutAccount();
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
        dispatch(authClearState());
    };
};

//check state
export const checkState = () => {
    return (dispatch: Dispatch<IAuthClearState | ILoginSuccess>) => {
        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('uid');
        if (!token || !uid) {
            dispatch(authClearState());
        } else {
            dispatch(loginSuccess(token, uid));
        }
    };
};
