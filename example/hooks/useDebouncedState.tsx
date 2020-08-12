import {
  Dispatch, SetStateAction, useState, useCallback, useRef, useEffect,
} from 'react';

export default function useRAFState<T>(
  initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialState);
  const ref = useRef<number | undefined>();

  const set = useCallback((newState: SetStateAction<T>) => {
    if (ref.current) {
      cancelAnimationFrame(ref.current);
    }
    ref.current = requestAnimationFrame(() => {
      setState(newState);
    });
  }, []);

  useEffect(() => () => {
    if (ref.current) {
      cancelAnimationFrame(ref.current);
    }
  }, [ref]);

  return [state, set];
}
