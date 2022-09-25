import React from 'react';

const ToDo = (props) => {
  // eslint-disable-next-line
  const { todo, id, status } = props.todo;
  // Animation Lines but only work for first line atm.
  // const toDoHeight = useRef();
  // const [height, setHeight] = useState(0);
  // useEffect(() => {
  //   setHeight(toDoHeight.current.clientHeight);
  //   console.log('todo: ' + toDoHeight.current.clientHeight);
  // }, []);
  // {/* <div className={`${!state ? ' w-full' : 'w-0'} h-[2px] bg-rose-500 flex -translate-y-3 duration-500`}></div> */}

  return (
    <div
      className={`${
        status ? 'decoration-transparent' : 'decoration-rose-500'
      } line-through duration-1000`}
    >
      {todo}
    </div>
  );
};

export default ToDo;
