import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import AddToDo from './AddToDo';
import './App.css';
import { AuthForm } from './Components/AuthForm';
import { getToDos } from './firebaseConfig';
import Loading from './Components/Loading';

import {
  clearUserInfo,
  setIsLoading,
  setIsUserLoggedIn,
  setUserInfo,
  toDoUpdateHandler,
} from './store/userDataSlice';

import ToDoList from './ToDoList';

function App() {
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [bevelActive, setBevelActive] = useState(true);
  const [addToDoActive, setAddToDoActive] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userData);

  const checkLoggedInHandler = async () => {
    const auth = getAuth();
    auth.onAuthStateChanged(checkLoggedIn);
    await checkLoggedIn();
  };

  const checkLoggedIn = async (data) => {
    dispatch(setIsLoading(true));
    await data;
    if (data) {
      dispatch(setIsUserLoggedIn(true));
      dispatch(setUserInfo({ userMail: data.email, uid: data.uid }));
      const response = await getToDos(data.uid);
      dispatch(toDoUpdateHandler(response));
      dispatch(setIsLoading(false));
    } else {
      dispatch(setIsUserLoggedIn(false));
      dispatch(setIsLoading(false));
      dispatch(clearUserInfo());
    }
    return data;
  };

  useEffect(() => {
    checkLoggedInHandler();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'rgb(34 197 94)',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'rgb(34 197 94)',
            },
          },
          error: {
            style: {
              background: 'rgb(244 63 94)',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'rgb(244 63 94)',
            },
          },
        }}
      />
      {/* Header */}
      <div
        className={`${
          hamburgerMenuActive ? 'h-screen' : 'h-40'
        } flex flex-row m-auto items-center duration-1000 justify-center bg-rose-500 mix-blend-multiply`}
      >
        <div className="flex flex-col w-full justify-center items-center h-20">
          <div className="text-white font-rounded font-black text-3xl">
            What
          </div>
          <div className="text-white font-rounded font-black text-5xl -mt-2">
            To do?
          </div>
          <AddToDo
            addToDoActive={addToDoActive}
            onBackDropClick={() => {
              setAddToDoActive(false);
            }}
            finishAddTodo={() => {
              setAddToDoActive(false);
            }}
          />

          <CSSTransition
            in={hamburgerMenuActive}
            timeout={500}
            classNames="my-node"
            unmountOnExit
            mountOnEnter
            onEnter={() => {
              setBevelActive(false);
            }}
            onExited={() => {
              setBevelActive(true);
            }}
          >
            <AuthForm
              onCloseHamburger={() => {
                setHamburgerMenuActive(false);
              }}
            />
          </CSSTransition>
          <div
            onClick={() => {
              if (userData.isUserLoggedIn) {
                setAddToDoActive(true);
              } else {
                setHamburgerMenuActive(true);
              }
            }}
            className={`duration-1000 ${
              hamburgerMenuActive ? '-bottom-32' : 'bottom-10'
            } -translate-x-2/4 left-2/4 cursor-pointer select-none fixed flex h-16 w-16 bg-rose-500 text-3xl justify-center items-center font-rounded font-bold rounded-full pb-1 text-white`}
          >
            +
          </div>
        </div>

        {/* Hamburger Menu */}
        <div
          onClick={() => {
            setHamburgerMenuActive(!hamburgerMenuActive);
          }}
          className="z-50 absolute right-5 md:right-10 top-5 md:top-14 flex-col justify-center h-20 w-10 cursor-pointer"
        >
          <div
            className={`${
              hamburgerMenuActive ? '-rotate-180' : ''
            } duration-500 p-1 h-8 flex flex-col justify-between items-end`}
          >
            <div
              className={`${
                hamburgerMenuActive ? '-rotate-45  origin-[100%]' : ''
              } bg-white h-0.5 duration-500 w-full`}
            ></div>
            <div
              className={`${
                hamburgerMenuActive ? 'opacity-0' : 'opacity-1'
              } bg-white h-0.5 duration-500 w-10/12`}
            ></div>
            <div
              className={`${
                hamburgerMenuActive
                  ? 'w-full rotate-45 origin-[100%]'
                  : 'w-8/12'
              } bg-white h-0.5 duration-500`}
            ></div>
          </div>
        </div>
      </div>

      {/* Hamburger Menu */}

      <svg
        className={`${!bevelActive ? 'h-0' : 'h-16'} duration-1000`}
        width="100%"
        height="120"
        viewBox="0 0 500 80"
        preserveAspectRatio="none"
      >
        <path
          className="mix-blend-multiply"
          d="M0,0 L0,40 Q250,80 500,40 L500,0 Z"
          fill="rgb(244 63 94)"
        />
      </svg>
      {/* Header */}

      <CSSTransition
        in={bevelActive}
        timeout={100}
        classNames="my-node"
        unmountOnExit
        mountOnEnter
      >
        <div>
          <ToDoList bevelActive={bevelActive} />
        </div>
      </CSSTransition>
      <CSSTransition
        in={bevelActive}
        timeout={100}
        classNames="my-node"
        unmountOnExit
        mountOnEnter
      >
        <>
          {!userData.isUserLoggedIn && !userData.isLoading && (
            <div className="flex flex-col m-auto justify-center mt-20 font-rounded text-center text-gray-600">
              In Order to Use
              <br />
              <span className="font-semibold">You should Login First.</span>
              <button
                onClick={() => {
                  setHamburgerMenuActive(true);
                }}
                className="m-auto p-2 pl-12 pr-12 border border-rose-500 text-xl mt-6 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white duration-1000"
              >
                Login
              </button>
            </div>
          )}
        </>
      </CSSTransition>

      <CSSTransition
        in={userData.isLoading}
        timeout={100}
        classNames="my-node"
        unmountOnExit
        mountOnEnter
      >
        <>{userData.isUserLoggedIn && <Loading />}</>
      </CSSTransition>
    </>
  );
}

export default App;
