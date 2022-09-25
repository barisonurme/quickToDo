import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replaceToDoWithNewToDo } from './firebaseConfig';
import { todoStateHandler, toDoUpdateHandler } from './store/userDataSlice';
import ToDo from './ToDo';

const ToDos = (props) => {
  // eslint-disable-next-line
  const { todo, id, status } = props.todo;
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userData);

  const replaceToDoWithNewToDoHandler = () => {
    const oldTodo = userData.initialToDos;
    let newToDo = [];
    oldTodo.forEach((todo) => {
      if (todo.id !== id) {
        newToDo.push(todo);
      }
    });
    dispatch(toDoUpdateHandler({ todo: newToDo }));
    replaceToDoWithNewToDo(newToDo, userData.userInformation.uid);
  };
  return (
    <div className="mix-blend-normal w-full flex flex-col m-auto justify-start items-center cursor-pointer">
      <div
        onClick={async () => {
          dispatch(todoStateHandler({ id: id }));
          let updatedToDos = [];
          for (let i = 0; i < userData.initialToDos.length; i++) {
            let toDoStatus = userData.initialToDos[i].status;
            if (id === userData.initialToDos[i].id) {
              toDoStatus = !userData.initialToDos[i].status;
            }
            updatedToDos.push({
              id: userData.initialToDos[i].id,
              status: toDoStatus,
              timestamp: userData.initialToDos[i].id,
              todo: userData.initialToDos[i].todo,
            });
          }
          replaceToDoWithNewToDo(updatedToDos, userData.userInformation.uid);
        }}
        className="index mt-2 flex text-xl tracking-wider m-auto justify-between items-center p-2 bg-zinc-50 ml-4 mr-4 max-w-xl w-full rounded-xl border shadow font-rounded"
      >
        <span
          className={`ml-2 w-10/12 md:w-10/12 overflow-hidden md:ml-10 text-rose-500`}
        >
          <ToDo todo={props.todo} />
        </span>
        <div
          onClick={replaceToDoWithNewToDoHandler}
          className="bg-rose-500 p-2 rounded-full max-w-1/12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              d="m12 14.2-4.5 4.5q-.45.45-1.1.45-.65 0-1.1-.45-.45-.45-.45-1.1 0-.65.45-1.1L9.8 12 5.3 7.5q-.45-.45-.45-1.1 0-.65.45-1.1.45-.45 1.1-.45.65 0 1.1.45L12 9.8l4.5-4.5q.45-.45 1.1-.45.65 0 1.1.45.45.45.45 1.1 0 .65-.45 1.1L14.2 12l4.5 4.5q.45.45.45 1.1 0 .65-.45 1.1-.45.45-1.1.45-.65 0-1.1-.45Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ToDos;
