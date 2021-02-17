import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { taskApi } from '../../api/taskApi';
import {
    IDataCreateTask,
    IDataUpdateTask,
} from '../../api/taskApi/taskApi.type';
import { actionTypes } from './actionTypes';
import {
    IClearIndication,
    IClearSelectedDate,
    ICreateTaskFailure,
    ICreateTaskStart,
    ICreateTaskSuccess,
    IDeleteTaskFailure,
    IDeleteTasksCompletedFailure,
    IDeleteTasksCompletedStart,
    IDeleteTasksCompletedSuccess,
    IDeleteTaskStart,
    IDeleteTaskSuccess,
    IError,
    IFetchTasksFailure,
    IFetchTasksStart,
    IFetchTasksSuccess,
    ISelectDate,
    ITask,
    ITaskClearAll,
    IUpdateTaskFailure,
    IUpdateTaskStart,
    IUpdateTaskSuccess,
} from './task.type';

//clear indication = ''
export const clearIndication = (): IClearIndication => {
    return {
        type: actionTypes.CLEAR_INDICATION,
    };
};

export const clearAllTask = (): ITaskClearAll => {
    return {
        type: actionTypes.CLEAR_ALL_TASK,
    };
};

//create task
const createTaskStart = (): ICreateTaskStart => {
    return {
        type: actionTypes.CREATE_TASK_START,
    };
};

const createTaskSuccess = (task: ITask): ICreateTaskSuccess => {
    return {
        type: actionTypes.CREATE_TASK_SUCCESS,
        payload: {
            task,
        },
    };
};

const createTaskFailure = (error: IError): ICreateTaskFailure => {
    return {
        type: actionTypes.CREATE_TASK_FAILURE,
        payload: {
            error,
        },
    };
};

export const createTask = (data: IDataCreateTask) => {
    return (
        dispatch: Dispatch<
            ICreateTaskStart | ICreateTaskSuccess | ICreateTaskFailure
        >,
    ) => {
        dispatch(createTaskStart());
        taskApi
            .createTask<ITask>(data)
            .then((response: AxiosResponse<ITask>) => {
                dispatch(createTaskSuccess(response.data));
            })
            .catch((error) => {
                dispatch(createTaskFailure(error));
            });
    };
};

//fetch all tasks
const fetchTasksStart = (): IFetchTasksStart => {
    return {
        type: actionTypes.FETCH_TASKS_START,
    };
};

const fetchTasksSuccess = (tasks: ITask[]): IFetchTasksSuccess => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        payload: {
            tasks: tasks,
        },
    };
};

const fetchTasksFailure = (error: IError): IFetchTasksFailure => {
    return {
        type: actionTypes.FETCH_TASKS_FAILURE,
        payload: {
            error: error,
        },
    };
};

export const fetchTasks = () => {
    return (
        dispatch: Dispatch<
            IFetchTasksStart | IFetchTasksSuccess | IFetchTasksFailure
        >,
    ) => {
        const JSONdata = localStorage.getItem('paramsFetch');
        let params: { completed?: string; sortBy?: string };
        if (JSONdata) {
            params = JSON.parse(JSONdata);
        } else {
            //set params default
            params = { completed: 'false', sortBy: 'createdAt:desc' };
        }
        if (params.completed === 'unset') {
            delete params.completed;
        }
        dispatch(fetchTasksStart());
        taskApi
            .fetchTask<ITask[]>(params)
            .then((response: AxiosResponse<ITask[]>) => {
                dispatch(fetchTasksSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchTasksFailure(error));
            });
    };
};

//update task
const updateTaskStart = (): IUpdateTaskStart => {
    return {
        type: actionTypes.UPDATE_TASK_START,
    };
};

const updateTaskSuccess = (task: ITask): IUpdateTaskSuccess => {
    return {
        type: actionTypes.UPDATE_TASK_SUCCESS,
        payload: {
            task,
        },
    };
};

const updateTaskFailure = (error: IError): IUpdateTaskFailure => {
    return {
        type: actionTypes.UPDATE_TASK_FAILURE,
        payload: {
            error,
        },
    };
};

export const updateTask = (data: IDataUpdateTask) => {
    return (
        dispatch: Dispatch<
            IUpdateTaskStart | IUpdateTaskSuccess | IUpdateTaskFailure
        >,
    ) => {
        dispatch(updateTaskStart());
        taskApi
            .updateTask<ITask>(data)
            .then((response: AxiosResponse<ITask>) => {
                dispatch(updateTaskSuccess(response.data));
            })
            .catch((error) => {
                dispatch(updateTaskFailure(error));
            });
    };
};

//delete task
const deleteTaskStart = (): IDeleteTaskStart => {
    return {
        type: actionTypes.DELETE_TASK_START,
    };
};

const deleteTaskSuccess = (task: ITask): IDeleteTaskSuccess => {
    return {
        type: actionTypes.DELETE_TASK_SUCCESS,
        payload: {
            task,
        },
    };
};

const deleteTaskFailure = (error: IError): IDeleteTaskFailure => {
    return {
        type: actionTypes.DELETE_TASK_FAILURE,
        payload: {
            error,
        },
    };
};

export const deleteTask = (id: string) => {
    return (
        dispatch: Dispatch<
            IDeleteTaskStart | IDeleteTaskSuccess | IDeleteTaskFailure
        >,
    ) => {
        dispatch(deleteTaskStart());
        taskApi
            .deleteTask<ITask>(id)
            .then((response: AxiosResponse<ITask>) => {
                dispatch(deleteTaskSuccess(response.data));
            })
            .catch((error) => {
                dispatch(deleteTaskFailure(error));
            });
    };
};

//delete many task completed
const deleteTasksCompletedStart = (): IDeleteTasksCompletedStart => {
    return {
        type: actionTypes.DELETE_TASKS_COMPLETED_START,
    };
};

const deleteTasksCompletedSuccess = (): IDeleteTasksCompletedSuccess => {
    return {
        type: actionTypes.DELETE_TASKS_COMPLETED_SUCCESS,
    };
};

const deleteTasksCompletedFailure = (
    error: IError,
): IDeleteTasksCompletedFailure => {
    return {
        type: actionTypes.DELETE_TASKS_COMPLETED_FAILURE,
        payload: {
            error,
        },
    };
};

export const deleteTasksCompleted = () => {
    return (
        dispatch: Dispatch<
            | IDeleteTasksCompletedStart
            | IDeleteTasksCompletedSuccess
            | IDeleteTasksCompletedFailure
        >,
    ) => {
        dispatch(deleteTasksCompletedStart());
        taskApi
            .deleteTasksCompleted()
            .then((response) => {
                dispatch(deleteTasksCompletedSuccess());
            })
            .catch((error) => {
                dispatch(deleteTasksCompletedFailure(error));
            });
    };
};

//select date
export const selectDate = (date: moment.Moment | Date): ISelectDate => {
    return {
        type: actionTypes.SELECT_DATE,
        payload: {
            date,
        },
    };
};

//clear selected date
export const clearSelectedDate = (): IClearSelectedDate => {
    return {
        type: actionTypes.CLEAR_SELECTED_DATE,
    };
};
