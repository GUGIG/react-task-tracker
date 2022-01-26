import { useCallback, useRef, useEffect } from "react";

const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return [reset, clear];
};

export default useTimeout;

/**
 * 1. [clear, reset]
 * 2. useTimeout(fn, delay)
 * 3. when clear, timeout should be cleared
 * 4. when reset, setTimeout should be
 */
