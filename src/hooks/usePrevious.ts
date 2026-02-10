import { useEffect, useRef } from 'react';

// Custom hook to get the previous value of a prop or state
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}