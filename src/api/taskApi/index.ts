import {
    IDataCreateTask,
    IDataUpdateTask,
    IParamsFetchTasks,
} from './taskApi.type';
import { axiosClient } from '../axiosClient';

export const taskApi = {
    createTask: function <T>(data: IDataCreateTask) {
        const url = '/tasks';
        return axiosClient.post<T>(url, data);
    },
    fetchTask: function <T>(params?: IParamsFetchTasks) {
        const url = '/tasks';
        return axiosClient.get<T>(url, { params });
    },
    updateTask: function <T>(data: IDataUpdateTask) {
        const url = `/tasks/${data._id}`;
        return axiosClient.patch<T>(url, data.updates);
    },
    deleteTask: function <T>(id: string) {
        const url = `/tasks/${id}`;
        return axiosClient.delete<T>(url);
    },
    deleteTasksCompleted: function () {
        const url = '/tasks/completedAll';
        return axiosClient.delete(url);
    },
};
