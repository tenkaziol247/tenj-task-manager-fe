import { actionTypes } from './actionTypes';

export interface IDate {
    startAt?: Date | string;
    endAt?: Date | string;
}

export interface IError {
    message: string;
}

export interface ITask {
    _id: string;
    taskName: string;
    description: string;
    grade: string;
    priority: string;
    completed: boolean;
    date: IDate;
    range: string;
    createdAt: string;
}

export interface ITasksInitState {
    list: ITask[];
    loading: boolean;
    error: IError | null;
    indication: string | null;
    selectedDate: moment.Moment | Date | null;
}

export interface ITaskClearAll {
    type: typeof actionTypes.CLEAR_ALL_TASK;
}

export interface IClearIndication {
    type: typeof actionTypes.CLEAR_INDICATION;
}

export interface ICreateTaskStart {
    type: typeof actionTypes.CREATE_TASK_START;
}

export interface ICreateTaskSuccess {
    type: typeof actionTypes.CREATE_TASK_SUCCESS;
    payload: {
        task: ITask;
    };
}

export interface ICreateTaskFailure {
    type: typeof actionTypes.CREATE_TASK_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IFetchTasksStart {
    type: typeof actionTypes.FETCH_TASKS_START;
}

export interface IFetchTasksSuccess {
    type: typeof actionTypes.FETCH_TASKS_SUCCESS;
    payload: {
        tasks: ITask[];
    };
}

export interface IFetchTasksFailure {
    type: typeof actionTypes.FETCH_TASKS_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IUpdateTaskStart {
    type: typeof actionTypes.UPDATE_TASK_START;
}

export interface IUpdateTaskSuccess {
    type: typeof actionTypes.UPDATE_TASK_SUCCESS;
    payload: {
        task: ITask;
    };
}

export interface IUpdateTaskFailure {
    type: typeof actionTypes.UPDATE_TASK_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IDeleteTaskStart {
    type: typeof actionTypes.DELETE_TASK_START;
}

export interface IDeleteTaskSuccess {
    type: typeof actionTypes.DELETE_TASK_SUCCESS;
    payload: {
        task: ITask;
    };
}

export interface IDeleteTaskFailure {
    type: typeof actionTypes.DELETE_TASK_FAILURE;
    payload: {
        error: IError;
    };
}

export interface IDeleteTasksCompletedStart {
    type: typeof actionTypes.DELETE_TASKS_COMPLETED_START;
}

export interface IDeleteTasksCompletedSuccess {
    type: typeof actionTypes.DELETE_TASKS_COMPLETED_SUCCESS;
}

export interface IDeleteTasksCompletedFailure {
    type: typeof actionTypes.DELETE_TASKS_COMPLETED_FAILURE;
    payload: {
        error: IError;
    };
}

export interface ISelectDate {
    type: typeof actionTypes.SELECT_DATE;
    payload: {
        date: moment.Moment | Date;
    };
}

export interface IClearSelectedDate {
    type: typeof actionTypes.CLEAR_SELECTED_DATE;
}

export type TasksAction =
    | IClearIndication
    | ITaskClearAll
    | ICreateTaskStart
    | ICreateTaskSuccess
    | ICreateTaskFailure
    | IFetchTasksStart
    | IFetchTasksSuccess
    | IFetchTasksFailure
    | IUpdateTaskStart
    | IUpdateTaskSuccess
    | IUpdateTaskFailure
    | IDeleteTaskStart
    | IDeleteTaskSuccess
    | IDeleteTaskFailure
    | IDeleteTasksCompletedStart
    | IDeleteTasksCompletedSuccess
    | IDeleteTasksCompletedFailure
    | ISelectDate
    | IClearSelectedDate;
