import { useState, useRef } from "react";
import useTimeout from "../../CustomHooks/useTImeout";

const UseTimeoutExample = () => {
  const [visible, setVisible] = useState("");

  const [count, setCount] = useState(1000);
  const [reset, clear] = useTimeout(() => setVisible("fade-out"), count);

  const inputRef = useRef(null);

  const resetDelayTime = () => {
    const input = parseInt(inputRef.current.value);
    setCount(input);
  };

  const resetTimeout = () => {
    setVisible("");
    reset();
  };

  return (
    <div>
      <div className={visible}>hooray</div>
      <button onClick={clear}>clear</button>
      <button onClick={resetTimeout}>reset</button>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={resetDelayTime}>reset delay time</button>
      </div>
    </div>
  );
};

export default UseTimeoutExample;
