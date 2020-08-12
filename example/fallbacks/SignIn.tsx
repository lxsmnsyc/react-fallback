import React, { useCallback } from 'react';
import { useFallbackBoundaryRefresh } from '../..';
import useRAFState from '../hooks/useDebouncedState';

export default function SignIn(): JSX.Element {
  const [username, setUsername] = useRAFState('');

  const onChange = useCallback<React.FormEventHandler<HTMLInputElement>>((e) => {
    setUsername(e.currentTarget.value);
  }, [setUsername]);

  const refresh = useFallbackBoundaryRefresh();

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(() => {
    localStorage.setItem('username', username);
    refresh();
  }, [refresh, username]);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          name="username"
          onChange={onChange}
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
