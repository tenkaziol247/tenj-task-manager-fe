import { actionTypes } from './actionTypes';

export interface IProfile {
    _id: string;
    email: string;
    name: string;
    age: number;
}

export interface IAvatar {
    url: string;
    random: number;
}

export interface IError {
    message: string;
}

export interface IUserInitState {
    profile: IProfile | null;
    avatar: IAvatar | null;
    loadingProfile: boolean;
    loadingAvatar: boolean;
    error: IError | null;
}

export interface IUserUpdateProperties {
    profile?: IProfile | null;
    avatar?: IAvatar | null;
    loadingProfile?: boolean;
    loadingAvatar?: boolean;
    error?: IError | null;
}

export interface IGetProfileStart {
    type: typeof actionTypes.GET_PROFILE_START;
}

export interface IGetProfileSuccess {
    type: typeof actionTypes.GET_PROFILE_SUCCESS;
    payload: {
        profile: IProfile;
    };
}

export interface IGetProfileFailure {
    type: typeof actionTypes.GET_PROFILE_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IUpdateProfileStart {
    type: typeof actionTypes.UPDATE_PROFILE_START;
}

export interface IUpdateProfileSuccess {
    type: typeof actionTypes.UPDATE_PROFILE_SUCCESS;
    payload: {
        profile: IProfile;
    };
}

export interface IUpdateProfileFailure {
    type: typeof actionTypes.UPDATE_PROFILE_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IGetAvatarStart {
    type: typeof actionTypes.GET_AVATAR_START;
}

export interface IGetAvatarSuccess {
    type: typeof actionTypes.GET_AVATAR_SUCCESS;
    payload: {
        avatar: IAvatar;
    };
}

export interface IGetAvatarFailure {
    type: typeof actionTypes.GET_AVATAR_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IUserClearError {
    type: typeof actionTypes.CLEAR_ERROR;
}

export interface IUserClearAll {
    type: typeof actionTypes.CLEAR_ALL_USER;
}

export type TUserAction =
    | IGetProfileStart
    | IGetProfileSuccess
    | IGetProfileFailure
    | IUpdateProfileStart
    | IUpdateProfileSuccess
    | IUpdateProfileFailure
    | IGetAvatarStart
    | IGetAvatarSuccess
    | IGetAvatarFailure
    | IUserClearError
    | IUserClearAll;
