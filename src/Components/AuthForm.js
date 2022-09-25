import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../firebaseConfig';
import { toDoUpdateHandler } from '../store/userDataSlice';
import Login from './Login';
import Register from './Register';

export const AuthForm = (props) => {
  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);

  const userData = useSelector((store) => store.userData);

  const dispatch = useDispatch();

  return (
    <>
      {!userData.isUserLoggedIn && (
        <div className="w-full flex flex-col">
          <div className="flex w-48 m-auto justify-between flex-row mt-10 text-white text-xl mb-10">
            {/* <div className={`${registerForm ? ' translate-x-[81px] w-24':'w-20'} border fixed h-11 bg-rose-500 rounded-2xl z-40 duration-500`}></div> */}
            <div
              className={`${
                loginForm
                  ? 'opacity-1 '
                  : 'text-rose-300  opacity-30 duration-1000 border-rose-300'
              } p-2 z-50 font-semibold border-b-4 cursor-pointer`}
              onClick={() => {
                setRegisterForm(false);
                setLoginForm(true);
              }}
            >
              Login
            </div>
            <div
              onClick={() => {
                setRegisterForm(true);
                setLoginForm(false);
              }}
              className={`${
                registerForm
                  ? 'opacity-1 '
                  : 'text-rose-300  opacity-30 duration-1000 border-rose-300'
              } p-2 z-50 font-semibold border-b-4 cursor-pointer`}
            >
              Register
            </div>
          </div>
          <Login
            formActive={loginForm}
            onCloseHamburger={() => {
              props.onCloseHamburger();
            }}
          />
          <Register
            formActive={registerForm}
            onCloseHamburger={() => {
              props.onCloseHamburger();
            }}
          />
        </div>
      )}
      {userData.isUserLoggedIn && (
        <>
          <p className="flex m-auto justify-center  mt-20 mb-5 font-rounded tracking-wider text-white font-semibold">
            {userData.userInformation.userMail}
          </p>
          <button
            onClick={() => {
              logout();
              dispatch(toDoUpdateHandler({todo: []}));
            }}
            className="flex m-auto bg-black p-4 pl-8 pr-8 text-white rounded-xl cursor-pointer"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
};
