import React, { useRef } from 'react';
import toast from 'react-hot-toast';

import { login, signInWithGooglePopUp } from '../firebaseConfig';
import { FaGoogle } from 'react-icons/fa';

const Login = (props) => {
  const { formActive } = props;

  const userEmailInput = useRef();
  const userPasswordInput = useRef();
  const submitFormHandler = async (e) => {
    e.preventDefault();
    const user = await login(
      userEmailInput.current.value,
      userPasswordInput.current.value
    );
    if (user !== undefined) {
      toast.success('Login is Successful');
      props.onCloseHamburger();
    }
  };

  const googleSignIn = async () => {
    const response = await signInWithGooglePopUp();
    if (response !== undefined) {
      toast.success('Login is Successful');
      props.onCloseHamburger();
    }
  };

  return (
    <>
      {formActive && (
        <div className="w-4/5 flex m-auto flex-col max-w-2xl">
          <form onSubmit={submitFormHandler} className="w-full  mt-2">
            <label type="mail" className="flex justify-center mb-2 text-white">
              E-mail
            </label>
            <input
              ref={userEmailInput}
              className="flex w-full border  text-xl p-1 pl-4  shadow-xl rounded-md"
            ></input>
            <label className="flex justify-center mt-4 mb-2 text-white">
              Password
            </label>
            <input
              ref={userPasswordInput}
              type="password"
              className="flex w-full border text-md p-1 pl-4  shadow-xl rounded-md"
            ></input>
            <button className="flex m-auto bg-black text-white w-full items-center justify-center p-2 mt-8 rounded-md">
              Login
            </button>
          </form>
          <div className="flex w-full items-center">
            <div className="h-px bg-gray-50 flex-1 shadow-xl"></div>
            <span className="p-6 text-white">or</span>
            <div className="h-px bg-gray-50 flex-1 shadow-xl"></div>
          </div>
          <div className="w-full">
            <button
              onClick={googleSignIn}
              className="flex m-auto text-white rounded-md w-42 items-center justify-center p-2"
            >
              <FaGoogle className="mr-2" />
              Login with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
