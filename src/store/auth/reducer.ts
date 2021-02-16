import { actionTypes } from './actionTypes';
import {
    IAuthClearState,
    IAuthInitState,
    IAuthUpdateProperties,
    ILoginFailure,
    ILoginStart,
    ILoginSuccess,
    IRegisterFailure,
    IRegisterStart,
    IRegisterSuccess,
    TAuthAction,
} from './auth.type';

const authInitState = {
    token: null,
    uid: null,
    loading: false,
    error: null,
};

const updateObject = (
    oldState: IAuthInitState,
    updateProperties: IAuthUpdateProperties,
) => {
    return {
        ...oldState,
        ...updateProperties,
    };
};

const registerStart = (state: IAuthInitState, action: IRegisterStart) => {
    return updateObject(state, { loading: true, error: null });
};

const registerSuccess = (state: IAuthInitState, action: IRegisterSuccess) => {
    return updateObject(state, {
        loading: false,
        uid: action.payload.uid,
        token: action.payload.token,
    });
};

const registerFailure = (state: IAuthInitState, action: IRegisterFailure) => {
    return updateObject(state, { loading: false, error: action.payload.error });
};

const loginStart = (state: IAuthInitState, action: ILoginStart) => {
    return updateObject(state, { loading: true, error: null });
};

const loginSuccess = (state: IAuthInitState, action: ILoginSuccess) => {
    return updateObject(state, {
        loading: false,
        uid: action.payload.uid,
        token: action.payload.token,
    });
};

const loginFailure = (state: IAuthInitState, action: ILoginFailure) => {
    return updateObject(state, { loading: false, error: action.payload.error });
};

const authClearState = (state: IAuthInitState, action: IAuthClearState) => {
    return updateObject(state, {
        loading: false,
        error: null,
        uid: null,
        token: null,
    });
};

export const authReducer = (
    state: IAuthInitState = authInitState,
    action: TAuthAction,
) => {
    switch (action.type) {
        case actionTypes.REGISTER_START:
            return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS:
            return registerSuccess(state, action);
        case actionTypes.REGISTER_FAILURE:
            return registerFailure(state, action);
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAILURE:
            return loginFailure(state, action);
        case actionTypes.CLEAR_ALL_AUTH:
            return authClearState(state, action);
        default:
            return state;
    }
};
