import React, { useState, useEffect } from 'react';
import SignIn from '../fallbacks/SignIn';

interface SignInCredentialsLoading {
  loading: true;
  username: undefined;
}

interface SignInCredentialsSuccess {
  loading: false;
  username: string;
}

export type SignInCredentials = SignInCredentialsSuccess | SignInCredentialsLoading;

export default function useSignInRequired(): SignInCredentials {
  const [username, setUserName] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setUserName(localStorage.getItem('username') ?? undefined);

    const onStorage = () => {
      setUserName(localStorage.getItem('username') ?? undefined);
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  if (username) {
    return {
      loading: false,
      username,
    };
  }

  if (loading) {
    return {
      loading,
      username: undefined,
    };
  }

  throw <SignIn />;
}
