import { useState, useCallback, useRef, memo, useEffect } from "react";

const Count = memo(({ cb }) => {
  const [count, setCount] = useState(0);
  const renders = useRef(0);
  useEffect(() => {
    renders.current++;
  });
  return (
    <div>
      <div>count: {count}</div>
      <div>renders: {renders.current}</div>
      <button onClick={() => setCount((c) => c + 1)}>increment</button>
    </div>
  );
});

const Study = () => {
  const [text, setText] = useState("");
  const callback = useCallback(() => {
    console.log("hi");
  }, []);
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div>{text}</div>
      <Count cb={callback} />
    </>
  );
};

export default Study;
