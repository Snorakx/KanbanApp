import { combineReducers } from 'redux';

import todoList, { ITodoListReducer } from './todoListReducer';

export default combineReducers({
    todoList
});

export interface IState {
    todoList: ITodoListReducer;
}