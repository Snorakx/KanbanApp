import { combineReducers } from "redux";

import todoList, { ITodoListReducer } from "./todoListReducer";

export default combineReducers({
  todoList,
});

export interface IState {
  userList: ITodoListReducer;
  singleUserList: ITodoListReducer;
  temp: ITodoListReducer;
}
