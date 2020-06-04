import * as actionTypes from "../actions/todoList/types/todolistTypes";
import { ISingleUserList, InGreenElement } from "../entities/todoSingleEl";
import { db } from "../constans/Config";

export interface ITodoListReducer {
  userList: ISingleUserList[];
  singleUserList: InGreenElement[];
  temp: InGreenElement[];
}

const defaultState = (): ITodoListReducer => ({
  temp: [],

  userList: [],

  singleUserList: [],
});

export default (state = defaultState(), action: any): ITodoListReducer => {
  switch (action.type) {
    case actionTypes.ADD_LIST: {
      return {
        ...state,
        userList: [...state.userList, action.list],
      };
    }

    case actionTypes.SET_NEW_ELEM: {
      return {
        ...state,
        singleUserList: [...state.singleUserList, action.newElem],
        temp: [...state.temp, action.newElem],
      };
    }

    case actionTypes.DEL_ELEM: {
      return {
        ...state,
        singleUserList: [
          ...state.singleUserList.filter((elem) => elem.id != action.id),
        ],
        temp: [...state.temp.filter((elem) => elem.id != action.id)],
      };
    }
    case actionTypes.DELETE_LIST: {
      return {
        ...state,
        userList: [...state.userList.filter((elem) => elem.id != action.id)],
      };
    }

    case actionTypes.TASK_LEVEL_UP: {
      return {
        ...state,

        ...state.temp.map((elem) => {
          if (elem.id === action.id) {
            elem.taskLevel++;
          }
        }),
        temp: [...state.temp.filter((elem) => elem.id != action.id)],
      };
    }
    case actionTypes.FILTER_TASK_LEVEL: {
      return {
        ...state,
        temp: [
          ...state.singleUserList.filter(
            (elem) => elem.taskLevel === action.index
          ),
        ],
      };
    }
    default: {
      return state;
    }
  }
};
