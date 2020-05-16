import * as actionTypes from "../actions/todoList/types/todolistTypes";
import {
  ISingleElementList,
  ISingleUserList,
  InGreenElement,
} from "../entities/todoSingleEl";

export interface ITodoListReducer {
  // todoList: ISingleElementList[];
  // inGreenList: InGreenElement[];
  // inGreenListLevel2: InGreenElement[];
  // inGreenListLevel3: InGreenElement[];
  userList: ISingleUserList[];
  singleUserList: InGreenElement[];
  temp: InGreenElement[];
}

const defaultState = (): ITodoListReducer => ({
  // todoList: [],
  // inGreenList: [],
  // inGreenListLevel2: [],
  // inGreenListLevel3: [],
  temp: [],

  userList: [],

  singleUserList: [
    {
      name: "Task1",
      id: 1,
      taskLevel: 0,
    },
    {
      name: "Task2",
      id: 2,
      taskLevel: 1,
    },
    {
      name: "Task3",
      id: 3,
      taskLevel: 2,
    },
  ],
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
