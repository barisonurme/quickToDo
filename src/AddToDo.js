import moment from 'moment';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { addToDo, getToDos } from './firebaseConfig';
import { toDoUpdateHandler } from './store/userDataSlice';
// import { toDoAddHandler } from './store/userDataSlice';

const AddToDo = (props) => {
  const { addToDoActive } = props;
  const userInput = useRef();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userData);

  const addToDoHandler = async (event) => {
    event.preventDefault();
    props.finishAddTodo();
    // dispatch(toDoAddHandler(userInput.current.value));
    const dateNow = new Date();
    const timestamp = moment(dateNow).format('YYYY-MM-DD-HH-mm-ss');
    // console.log(userInput.current.value, timestamp, userData.userInformation.uid);
    await addToDo(
      userInput.current.value,
      userData.userInformation.uid,
      timestamp,
      userData.initialToDos
    );
    const response = await getToDos(userData.userInformation.uid);
    dispatch(toDoUpdateHandler(response));
  };
  return (
    <>
      <div>
        {ReactDOM.createPortal(
          <CSSTransition
            in={addToDoActive}
            unmountOnExit
            mountOnEnter
            timeout={200}
            classNames="my-node"
          >
            <div className="overflow-hidden fixed flex flex-col justify-start items-start bg-f w-full max-w-xl h-72 rounded-xl z-50 bg-gray-100 left-2/4 -translate-x-2/4 translate-y-2/4">
              <div className="flex justify-center h-24 w-full bg-rose-500 text-white items-center font-rounded text-2xl font-semibold tracking-wider">
                What to Add?
              </div>
              <div className="flex flex-col m-auto">
                <form>
                  <input
                    ref={userInput}
                    className="flex m-auto w-5/4 shadow-sm p-2 pl-10 pr-10 font-rounded tracking-wider text-gray-600 rounded-md"
                    placeholder="Type here..."
                  ></input>
                  <button
                    type="submit"
                    onClick={addToDoHandler}
                    className="flex m-auto bg-rose-500 text-white p-1 pr-4 pl-4 rounded-md mt-5"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </CSSTransition>,
          document.getElementById('modal')
        )}
        {ReactDOM.createPortal(
          <CSSTransition
            in={addToDoActive}
            unmountOnExit
            mountOnEnter
            timeout={200}
            classNames="backdrop"
          >
            <div
              className="fixed w-full h-screen bg-zinc-800 mix-blend-multiply z-40 opacity-80"
              onClick={props.onBackDropClick}
            ></div>
          </CSSTransition>,
          document.getElementById('backdrop')
        )}
      </div>
    </>
  );
};

export default AddToDo;
