import { actionTypes } from './actionTypes';
import {
    IGetAvatarFailure,
    IGetAvatarStart,
    IGetAvatarSuccess,
    IGetProfileFailure,
    IGetProfileStart,
    IGetProfileSuccess,
    IUpdateProfileFailure,
    IUpdateProfileStart,
    IUpdateProfileSuccess,
    IUserClearAll,
    IUserClearError,
    IUserInitState,
    IUserUpdateProperties,
    TUserAction,
} from './user.type';

const userInitState = {
    profile: null,
    avatar: null,
    loadingProfile: false,
    loadingAvatar: false,
    error: null,
};

const updateObject = (
    oldState: IUserInitState,
    updateProperties: IUserUpdateProperties,
) => {
    return {
        ...oldState,
        ...updateProperties,
    };
};

const getProfileStart = (state: IUserInitState, action: IGetProfileStart) => {
    return updateObject(state, { loadingProfile: true, error: null });
};

const getProfileSuccess = (
    state: IUserInitState,
    action: IGetProfileSuccess,
) => {
    return updateObject(state, {
        loadingProfile: false,
        profile: action.payload.profile,
    });
};

const getProfileFailure = (
    state: IUserInitState,
    action: IGetProfileFailure,
) => {
    return updateObject(state, {
        loadingProfile: false,
        error: action.payload.error,
    });
};

const updateProfileStart = (
    state: IUserInitState,
    action: IUpdateProfileStart,
) => {
    return updateObject(state, { loadingProfile: true, error: null });
};

const updateProfileSuccess = (
    state: IUserInitState,
    action: IUpdateProfileSuccess,
) => {
    return updateObject(state, {
        loadingProfile: false,
        profile: action.payload.profile,
    });
};

const updateProfileFailure = (
    state: IUserInitState,
    action: IUpdateProfileFailure,
) => {
    return updateObject(state, {
        loadingProfile: false,
        error: action.payload.error,
    });
};

const getAvatarStart = (state: IUserInitState, action: IGetAvatarStart) => {
    return updateObject(state, { loadingAvatar: true, error: null });
};

const getAvatarSuccess = (state: IUserInitState, action: IGetAvatarSuccess) => {
    return updateObject(state, {
        loadingAvatar: false,
        avatar: action.payload.avatar,
    });
};

const getAvatarFailure = (state: IUserInitState, action: IGetAvatarFailure) => {
    return updateObject(state, {
        loadingAvatar: false,
        avatar: null,
        error: action.payload.error,
    });
};

const userClearError = (state: IUserInitState, action: IUserClearError) => {
    return updateObject(state, {
        loadingAvatar: false,
        loadingProfile: false,
        error: null,
    });
};

const userClearAll = (state: IUserInitState, action: IUserClearAll) => {
    return updateObject(state, {
        profile: null,
        avatar: null,
        loadingProfile: false,
        loadingAvatar: false,
        error: null,
    });
};

export const userReducer = (
    state: IUserInitState = userInitState,
    action: TUserAction,
) => {
    switch (action.type) {
        case actionTypes.GET_PROFILE_START:
            return getProfileStart(state, action);
        case actionTypes.GET_PROFILE_SUCCESS:
            return getProfileSuccess(state, action);
        case actionTypes.GET_PROFILE_FAILURE:
            return getProfileFailure(state, action);
        case actionTypes.UPDATE_PROFILE_START:
            return updateProfileStart(state, action);
        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return updateProfileSuccess(state, action);
        case actionTypes.UPDATE_PROFILE_FAILURE:
            return updateProfileFailure(state, action);
        case actionTypes.GET_AVATAR_START:
            return getAvatarStart(state, action);
        case actionTypes.GET_AVATAR_SUCCESS:
            return getAvatarSuccess(state, action);
        case actionTypes.GET_AVATAR_FAILURE:
            return getAvatarFailure(state, action);
        case actionTypes.CLEAR_ERROR:
            return userClearError(state, action);
        case actionTypes.CLEAR_ALL_USER:
            return userClearAll(state, action);
        default:
            return state;
    }
};
