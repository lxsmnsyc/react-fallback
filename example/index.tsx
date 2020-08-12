import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { FallbackBoundary, useFallbackBoundaryRefresh } from '..';
import useSignInRequired from './hooks/useSignInRequired';

const SignOut = () => {
  const refresh = useFallbackBoundaryRefresh();

  const signOut = useCallback(() => {
    localStorage.removeItem('username');
    refresh();
  }, [refresh]);

  return <button type="button" onClick={signOut}>Sign Out</button>;
};

const User = () => {
  const credentials = useSignInRequired();

  if (credentials.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{`Welcome, ${credentials.username}`}</h1>
      <SignOut />
    </>
  );
};

const App = () => (
  <FallbackBoundary>
    <User />
  </FallbackBoundary>
);

ReactDOM.render(<App />, document.getElementById('root'));
