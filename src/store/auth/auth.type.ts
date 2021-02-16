import { actionTypes } from './actionTypes';

export interface IError {
    message: string;
}

export interface IAuthInitState {
    token: string | null;
    uid: string | null;
    loading: boolean;
    error: IError | null;
}

export interface IAuthUpdateProperties {
    token?: string | null;
    uid?: string | null;
    loading?: boolean;
    error?: IError | null;
}

export interface IRegisterStart {
    type: typeof actionTypes.REGISTER_START;
}

export interface IRegisterSuccess {
    type: typeof actionTypes.REGISTER_SUCCESS;
    payload: {
        token: string;
        uid: string;
    };
}

export interface IRegisterFailure {
    type: typeof actionTypes.REGISTER_FAILURE;
    payload: {
        error: IError;
    };
}

export interface ILoginStart {
    type: typeof actionTypes.LOGIN_START;
}

export interface ILoginSuccess {
    type: typeof actionTypes.LOGIN_SUCCESS;
    payload: {
        uid: string;
        token: string;
    };
}

export interface ILoginFailure {
    type: typeof actionTypes.LOGIN_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IAuthClearState {
    type: typeof actionTypes.CLEAR_ALL_AUTH;
}

export type TAuthAction =
    | IRegisterStart
    | IRegisterSuccess
    | IRegisterFailure
    | ILoginStart
    | ILoginSuccess
    | ILoginFailure
    | IAuthClearState;
