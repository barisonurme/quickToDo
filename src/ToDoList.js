import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ToDos from './ToDos';

const ToDoList = (props) => {
  const userData = useSelector((store) => store.userData);
  const { bevelActive } = props.bevelActive;
  return (
    <div className={`mr-6 ml-6 ${bevelActive ? '' : 'mt-0'} duration-1000`}>
      {userData.initialToDos.length === 0 && !userData.isLoading && userData.isUserLoggedIn && <p className='fixed left-1/2 -translate-x-1/2 flex m-auto mt-10 font-rounded text-xl'>To Do List is Empty</p>}
      <TransitionGroup>
        {userData.initialToDos.map((todo) => (
          <CSSTransition key={todo.id} timeout={500} classNames="toDoFade">
            <ToDos key={todo.id} todo={todo} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ToDoList;
