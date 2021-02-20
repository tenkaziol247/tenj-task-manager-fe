import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import { authReducer } from './auth/reducer';
import { userReducer } from './user/reducer';
import { taskReducer } from './task/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export type TRootState = ReturnType<typeof rootReducer>;
