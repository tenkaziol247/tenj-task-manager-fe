import { IParamsFetchTasks } from '../../api/taskApi/taskApi.type';
import { IError } from '../auth/auth.type';
import { actionTypes } from './actionTypes';
import {
    ITasksInitState,
    TasksAction,
    ITask,
    ICreateTaskStart,
    ICreateTaskSuccess,
    ICreateTaskFailure,
    IFetchTasksStart,
    IFetchTasksSuccess,
    IFetchTasksFailure,
    IClearIndication,
    IUpdateTaskStart,
    IUpdateTaskSuccess,
    IUpdateTaskFailure,
    IDeleteTaskStart,
    IDeleteTaskSuccess,
    IDeleteTaskFailure,
    IDeleteTasksCompletedSuccess,
    IDeleteTasksCompletedStart,
    IDeleteTasksCompletedFailure,
    ITaskClearAll,
    ISelectDate,
    IClearSelectedDate,
} from './task.type';

const initialState = {
    list: [],
    loading: false,
    error: null,
    indication: '',
    selectedDate: null,
};

const updateObject = (
    oldState: ITasksInitState,
    newProperties: {
        list?: ITask[];
        task?: ITask;
        loading?: boolean;
        error?: IError | null;
        indication?: string;
        selectedDate?: moment.Moment | Date | null;
    },
) => {
    return { ...oldState, ...newProperties };
};

//find index insert to old list
const findIndexInsert = (newTask: ITask, oldList: ITask[]): number => {
    let indexFound = 0;

    const jsonData = localStorage.getItem('paramsFetch');
    let params: IParamsFetchTasks;
    if (jsonData) {
        params = JSON.parse(jsonData);
    } else {
        params = { completed: 'false', sortBy: 'createdAt:desc' };
    }

    const createdAtNewTask = new Date(newTask.createdAt);
    switch (params.sortBy) {
        case 'createdAt:desc':
            for (let i = 0; i < oldList.length; i++) {
                const createdAtTask = new Date(oldList[i].createdAt);
                if (createdAtTask < createdAtNewTask) {
                    break;
                }
                indexFound++;
            }
            break;
        case 'createdAt:asc':
            for (let i = 0; i < oldList.length; i++) {
                const createdAtTask = new Date(oldList[i].createdAt);
                if (createdAtTask > createdAtNewTask) {
                    break;
                }
                indexFound++;
            }
            break;
        case 'grade:asc':
            for (let i = 0; i < oldList.length; i++) {
                if (oldList[i].grade > newTask.grade) {
                    break;
                }
                indexFound++;
            }
            break;
        case 'grade:desc':
            for (let i = 0; i < oldList.length; i++) {
                if (oldList[i].grade < newTask.grade) {
                    break;
                }
                indexFound++;
            }
            break;
        case 'priority:desc':
            for (let i = 0; i < oldList.length; i++) {
                if (oldList[i].priority < newTask.priority) {
                    break;
                }
                indexFound++;
            }
            break;
        case 'date.endAt:asc':
            for (let i = 0; i < oldList.length; i++) {
                const oldT = oldList[i].date.endAt;
                const newT = newTask.date.endAt;
                if (oldT && newT) {
                    if (new Date(oldT) > new Date(newT)) {
                        break;
                    }
                }
                indexFound++;
            }
            break;
        default:
            break;
    }

    return indexFound;
};

//check field update "completed"?
const fieldUpdate = (newTask: ITask, oldList: ITask[]): string => {
    const jsonData = localStorage.getItem('paramsFetch');
    let params: IParamsFetchTasks;
    if (jsonData) {
        params = JSON.parse(jsonData);
    } else {
        params = { completed: 'false', sortBy: 'createdAt:desc' };
    }

    if (params.completed !== 'unset') {
        const index = oldList.findIndex((task) => task._id === newTask._id);
        if (index !== -1) {
            if (newTask.completed !== oldList[index].completed) {
                return 'updateCompleted';
            }
        }
        return 'nonUpdateCompleted';
    } else {
        const index = oldList.findIndex((task) => task._id === newTask._id);
        if (index !== -1) {
            if (newTask.completed !== oldList[index].completed) {
                return 'updateCompletedNotFilter';
            }
        }
        return 'nonUpdateCompletedNotFilter';
    }
};

const tasksClearIndication = (
    state: ITasksInitState,
    action: IClearIndication,
) => {
    return updateObject(state, { indication: '' });
};

const tasksClearAll = (state: ITasksInitState, action: ITaskClearAll) => {
    return updateObject(state, {
        list: [],
        loading: false,
        error: null,
        indication: '',
        selectedDate: null,
    });
};

const tasksCreateTaskStart = (
    state: ITasksInitState,
    action: ICreateTaskStart,
) => {
    return updateObject(state, { error: null });
};

const tasksCreateTaskSuccess = (
    state: ITasksInitState,
    action: ICreateTaskSuccess,
) => {
    const listDup = [...state.list];
    const indexFound = findIndexInsert(action.payload.task, listDup);
    listDup.splice(indexFound, 0, action.payload.task);
    return updateObject(state, {
        list: listDup,
        indication: 'success',
    });
};

const tasksCreateTaskFailure = (
    state: ITasksInitState,
    action: ICreateTaskFailure,
) => {
    return updateObject(state, {
        error: action.payload.error,
        indication: 'failure',
    });
};

const tasksFetchTasksStart = (
    state: ITasksInitState,
    action: IFetchTasksStart,
) => {
    return updateObject(state, { loading: true, error: null });
};

const tasksFetchTasksSuccess = (
    state: ITasksInitState,
    action: IFetchTasksSuccess,
) => {
    return updateObject(state, { loading: false, list: action.payload.tasks });
};

const tasksFetchTasksFailure = (
    state: ITasksInitState,
    action: IFetchTasksFailure,
) => {
    return updateObject(state, { loading: false, error: action.payload.error });
};

const tasksUpdateTaskStart = (
    state: ITasksInitState,
    action: IUpdateTaskStart,
) => {
    return updateObject(state, { error: null, indication: '' });
};

const tasksUpdateTaskSuccess = (
    state: ITasksInitState,
    action: IUpdateTaskSuccess,
) => {
    //update and display
    const listDup = [...state.list];
    const field = fieldUpdate(action.payload.task, listDup);
    if (field === 'updateCompleted') {
        const index = listDup.findIndex(
            (task) => task._id === action.payload.task._id,
        );
        if (index !== -1) {
            listDup.splice(index, 1);
        }
    } else if (field === 'updateCompletedNotFilter') {
        const index = listDup.findIndex(
            (task) => task._id === action.payload.task._id,
        );
        listDup[index] = action.payload.task;
    } else {
        const index = listDup.findIndex(
            (task) => task._id === action.payload.task._id,
        );
        if (index !== -1) {
            listDup.splice(index, 1);
            const indexInsert = findIndexInsert(action.payload.task, listDup);
            listDup.splice(indexInsert, 0, action.payload.task);
        }
    }
    return updateObject(state, { list: listDup, indication: 'done' });
};

const tasksUpdateTaskFailure = (
    state: ITasksInitState,
    action: IUpdateTaskFailure,
) => {
    return updateObject(state, {
        error: action.payload.error,
        indication: 'error',
    });
};

const tasksDeleteTaskStart = (
    state: ITasksInitState,
    action: IDeleteTaskStart,
) => {
    return updateObject(state, { error: null });
};

const tasksDeleteTaskSuccess = (
    state: ITasksInitState,
    action: IDeleteTaskSuccess,
) => {
    const listDup = state.list.filter(
        (task) => task._id !== action.payload.task._id,
    );
    return updateObject(state, { list: listDup });
};

const tasksDeleteTaskFailure = (
    state: ITasksInitState,
    action: IDeleteTaskFailure,
) => {
    return updateObject(state, { error: action.payload.error });
};

const tasksDeleteTasksCompletedStart = (
    state: ITasksInitState,
    action: IDeleteTasksCompletedStart,
) => {
    return updateObject(state, { loading: true, error: null });
};

const tasksDeleteTasksCompletedSuccess = (
    state: ITasksInitState,
    action: IDeleteTasksCompletedSuccess,
) => {
    const listDup = state.list.filter((task) => !task.completed);

    return updateObject(state, { loading: false, list: listDup });
};

const tasksDeleteTasksCompletedFailure = (
    state: ITasksInitState,
    action: IDeleteTasksCompletedFailure,
) => {
    return updateObject(state, { loading: false, error: action.payload.error });
};

const tasksSelectDate = (state: ITasksInitState, action: ISelectDate) => {
    return updateObject(state, { selectedDate: action.payload.date });
};

const tasksClearSelectedDate = (
    state: ITasksInitState,
    action: IClearSelectedDate,
) => {
    return updateObject(state, { selectedDate: null });
};

//Reducer
export const taskReducer = (
    state: ITasksInitState = initialState,
    action: TasksAction,
) => {
    switch (action.type) {
        case actionTypes.CLEAR_INDICATION:
            return tasksClearIndication(state, action);
        case actionTypes.CLEAR_ALL_TASK:
            return tasksClearAll(state, action);
        case actionTypes.CREATE_TASK_START:
            return tasksCreateTaskStart(state, action);
        case actionTypes.CREATE_TASK_SUCCESS:
            return tasksCreateTaskSuccess(state, action);
        case actionTypes.CREATE_TASK_FAILURE:
            return tasksCreateTaskFailure(state, action);
        case actionTypes.FETCH_TASKS_START:
            return tasksFetchTasksStart(state, action);
        case actionTypes.FETCH_TASKS_SUCCESS:
            return tasksFetchTasksSuccess(state, action);
        case actionTypes.FETCH_TASKS_FAILURE:
            return tasksFetchTasksFailure(state, action);
        case actionTypes.UPDATE_TASK_START:
            return tasksUpdateTaskStart(state, action);
        case actionTypes.UPDATE_TASK_SUCCESS:
            return tasksUpdateTaskSuccess(state, action);
        case actionTypes.UPDATE_TASK_FAILURE:
            return tasksUpdateTaskFailure(state, action);
        case actionTypes.DELETE_TASK_START:
            return tasksDeleteTaskStart(state, action);
        case actionTypes.DELETE_TASK_SUCCESS:
            return tasksDeleteTaskSuccess(state, action);
        case actionTypes.DELETE_TASK_FAILURE:
            return tasksDeleteTaskFailure(state, action);
        case actionTypes.DELETE_TASKS_COMPLETED_START:
            return tasksDeleteTasksCompletedStart(state, action);
        case actionTypes.DELETE_TASKS_COMPLETED_SUCCESS:
            return tasksDeleteTasksCompletedSuccess(state, action);
        case actionTypes.DELETE_TASKS_COMPLETED_FAILURE:
            return tasksDeleteTasksCompletedFailure(state, action);
        case actionTypes.SELECT_DATE:
            return tasksSelectDate(state, action);
        case actionTypes.CLEAR_SELECTED_DATE:
            return tasksClearSelectedDate(state, action);
        default:
            return state;
    }
};
