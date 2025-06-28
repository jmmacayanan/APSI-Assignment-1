import {useState} from "react";

function Counter() {
  const [count, setCount] = useState(0);

  
  function handleClick(){
    setCount(count + 1);
  };

  return(
    <div>
        <p>You clicked {count} times</p>
        <button style={{width: "100%", minHeight: "1000px"}} onClick={handleClick}>Click me!</button>
    </div>
  )
}

export default Counter;