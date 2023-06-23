import React, { useCallback, useState } from "react";
import { CounterProps } from "./useCounter.types";

export const useCounter = ({ initial = 0 }: CounterProps = {}) => {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  const decrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  return { count, increment, decrement };
};
