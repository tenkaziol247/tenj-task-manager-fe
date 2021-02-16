import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { userApi } from '../../api/userApi';
import {
    IDataUpdateProfile,
    IResponseUser,
} from '../../api/userApi/userApi.type';
import { IError } from '../auth/auth.type';
import { actionTypes } from './actionTypes';
import {
    IAvatar,
    IGetAvatarFailure,
    IGetAvatarStart,
    IGetAvatarSuccess,
    IGetProfileFailure,
    IGetProfileStart,
    IGetProfileSuccess,
    IProfile,
    IUpdateProfileFailure,
    IUpdateProfileStart,
    IUpdateProfileSuccess,
    IUserClearAll,
    IUserClearError,
} from './user.type';

//clear error
export const clearError = (): IUserClearError => {
    return {
        type: actionTypes.CLEAR_ERROR,
    };
};

//clear all user
export const clearAllUser = (): IUserClearAll => {
    return {
        type: actionTypes.CLEAR_ALL_USER,
    };
};

//get profile
const getProfileStart = (): IGetProfileStart => {
    return {
        type: actionTypes.GET_PROFILE_START,
    };
};

const getProfileSuccess = (profile: IProfile): IGetProfileSuccess => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        payload: {
            profile,
        },
    };
};

const getProfileFailure = (error: IError): IGetProfileFailure => {
    return {
        type: actionTypes.GET_PROFILE_FAILURE,
        payload: {
            error,
        },
    };
};

export const getProfile = () => {
    return (
        dispatch: Dispatch<
            IGetProfileStart | IGetProfileSuccess | IGetProfileFailure
        >,
    ) => {
        dispatch(getProfileStart());
        userApi
            .getProfile<IResponseUser>()
            .then((response: AxiosResponse<IResponseUser>) => {
                dispatch(getProfileSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getProfileFailure(error));
            });
    };
};

//update profile
const updateProfileStart = (): IUpdateProfileStart => {
    return {
        type: actionTypes.UPDATE_PROFILE_START,
    };
};

const updateProfileSuccess = (profile: IProfile): IUpdateProfileSuccess => {
    return {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        payload: {
            profile,
        },
    };
};

const updateProfileFailure = (error: IError): IUpdateProfileFailure => {
    return {
        type: actionTypes.UPDATE_PROFILE_FAILURE,
        payload: {
            error,
        },
    };
};

export const updateProfile = (dataUpdates: IDataUpdateProfile) => {
    return (
        dispatch: Dispatch<
            IUpdateProfileStart | IUpdateProfileSuccess | IUpdateProfileFailure
        >,
    ) => {
        dispatch(updateProfileStart());
        userApi
            .updateProfile<IResponseUser>(dataUpdates)
            .then((response: AxiosResponse<IResponseUser>) => {
                dispatch(updateProfileSuccess(response.data));
            })
            .catch((error) => {
                dispatch(updateProfileFailure(error));
            });
    };
};

//get avatar
const getAvatarStart = (): IGetAvatarStart => {
    return {
        type: actionTypes.GET_AVATAR_START,
    };
};

const getAvatarSuccess = (avatar: IAvatar): IGetAvatarSuccess => {
    return {
        type: actionTypes.GET_AVATAR_SUCCESS,
        payload: {
            avatar,
        },
    };
};

const getAvatarFailure = (error: IError): IGetAvatarFailure => {
    return {
        type: actionTypes.GET_AVATAR_FAILURE,
        payload: {
            error,
        },
    };
};

export const getAvatar = (uid: string) => {
    return (
        dispatch: Dispatch<
            IGetAvatarStart | IGetAvatarSuccess | IGetAvatarFailure
        >,
    ) => {
        dispatch(getAvatarStart());
        userApi
            .getAvatar(uid)
            .then((response: AxiosResponse) => {
                const avatar = {
                    url: `${process.env.REACT_APP_BASE_URL}/users/${uid}/avatar`,
                    random: Math.random(),
                };
                dispatch(getAvatarSuccess(avatar));
            })
            .catch((error) => {
                dispatch(getAvatarFailure(error));
            });
    };
};
