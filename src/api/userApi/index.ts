import { axiosClient } from '../axiosClient';
import {
    IDataCreateAccount,
    IDataLoginAccount,
    IDataUpdateProfile,
} from './userApi.type';

export const userApi = {
    createAccount: function <T>(data: IDataCreateAccount) {
        const url = '/users';
        return axiosClient.post<T>(url, data);
    },
    loginAccount: function <T>(data: IDataLoginAccount) {
        const url = '/users/login';
        return axiosClient.post<T>(url, data);
    },
    logoutAccount: () => {
        const url = '/users/logout';
        return axiosClient.post(url);
    },

    getProfile: function <T>() {
        const url = '/users/me';
        return axiosClient.get(url);
    },
    updateProfile: function <T>(data: IDataUpdateProfile) {
        const url = '/users/me';
        return axiosClient.patch<T>(url, data);
    },
    uploadAvatar: (formData: FormData, callback: (percent: number) => void) => {
        const url = '/users/me/avatar';
        return axiosClient.post(url, formData, {
            onUploadProgress: ({ loaded, total }: ProgressEvent) => {
                const percent = Math.round((loaded * 100) / total);
                callback(percent);
            },
        });
    },
    getAvatar: (uid: string) => {
        const url = `/users/${uid}/avatar`;
        return axiosClient.get(url);
    },
};
