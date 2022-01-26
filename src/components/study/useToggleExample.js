import useToggle from "../../CustomHooks/useToggle";

const UseToggleExample = () => {
  const [val, toggleValue] = useToggle(true);
  return (
    <div>
      <h3>useToggle</h3>
      <div style={{ backgroundColor: "#eeeeee" }}>{val.toString()}</div>
      <button onClick={() => toggleValue()}>toggle</button>
      <button onClick={() => toggleValue(true)}>true</button>
      <button onClick={() => toggleValue(false)}>false</button>
    </div>
  );
};

export default UseToggleExample;
