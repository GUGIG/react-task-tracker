import { useState } from "react";

const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (value) => {
    setValue((prevValue) => (typeof value === "boolean" ? value : !prevValue));
  };

  return [value, toggleValue];
};

export default useToggle;
