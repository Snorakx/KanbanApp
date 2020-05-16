import * as actiontypes from "./types/todolistTypes";
import {
  ISingleElementList,
  InGreenElement,
  ISingleUserList,
} from "../../entities/todoSingleEl";

export const setNewElemTodoList = (newElem: InGreenElement) => ({
  type: actiontypes.SET_NEW_ELEM,
  newElem,
});

export const deleteElemTodoList = (id) => ({
  type: actiontypes.DEL_ELEM,
  id,
});
export const addNewList = (list: ISingleUserList) => ({
  type: actiontypes.ADD_LIST,
  list,
});
export const taskLevelUp = (elem, lvl, id) => ({
  type: actiontypes.TASK_LEVEL_UP,
  elem,
  lvl,
  id,
});

export const filterTaskLevel = (index: number) => ({
  type: actiontypes.FILTER_TASK_LEVEL,
  index,
});
