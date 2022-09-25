import { createSlice } from '@reduxjs/toolkit';
import { replaceToDoWithNewToDo } from '../firebaseConfig';

const userDataInitialState = {
  initialToDos: [],
  isUserLoggedIn: false,
  userInformation: {},
  isLoading: true,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: userDataInitialState,
  reducers: {
    toDoDeleteHandler(state, action) {
      const { id } = action.payload;
      let newTodo = [];
      state.initialToDos.forEach((todo) => {
        if (todo.id !== id) {
          newTodo.push(todo);
        }
      });
      state.initialToDos = newTodo;
    },
    toDoUpdateHandler(state, action) {
      if (action.payload === undefined) return;
      const { todo } = action.payload;
      state.initialToDos = [];
      todo.forEach((e) => {
        state.initialToDos.push({
          todo: e.todo,
          id: e.timestamp,
          timestamp: e.timestamp,
          status: e.status,
        });
      });
    },
    toDoAddHandler(state, action) {
      const dateNow = Date.now();
      state.initialToDos.push({
        id: dateNow,
        todo: action.payload,
        state: true,
      });
    },
    todoStateHandler(state, action) {
      const { id } = action.payload;
      for (let i = 0; i < state.initialToDos.length; i++) {
        if (id === state.initialToDos[i].id) {
          state.initialToDos[i].status = !state.initialToDos[i].status;
        }
      }
    },
    setIsUserLoggedIn(state, action) {
      state.isUserLoggedIn = action.payload;
    },
    setUserInfo(state, action) {
      const { userMail, uid } = action.payload;
      state.userInformation = { userMail: userMail, uid: uid };
    },
    clearUserInfo(state, action) {
      state.userInformation = {};
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  todoStateHandler,
  toDoUpdateHandler,
  toDoDeleteHandler,
  setIsUserLoggedIn,
  setUserInfo,
  clearUserInfo,
  setIsLoading,
} = userDataSlice.actions;

export default userDataSlice.reducer;
