# @lxsmnsyc/react-fallback

> Easy fallback UI handler for React

[![NPM](https://img.shields.io/npm/v/@lxsmnsyc/react-fallback.svg)](https://www.npmjs.com/package/@lxsmnsyc/react-fallback) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @lxsmnsyc/react-fallback
```

```bash
yarn add @lxsmnsyc/react-fallback
```
## Usage

`react-fallback` aims to easily present fallback UI whenever the main UI fails. Managing Fallback UIs can be cumbersome and can lead to nested component trees.

#### FallbackBoundary

`FallbackBoundary` is a React component that manages the fallback UI for the component tree. The rendered content of a `FallbackBoundary` may throw a valid React element which will be switched in place of the currently rendered UI.

```tsx
import { FallbackBoundary } from '@lxsmnsyc/react-fallback';

// ...
<FallbackBoundary>
  <FallibleComponent />
</FallbackBoundary>
```

Say, if we want to present the sign-in form if the user hasn't signed in yet, we may present the form inside the component.

```tsx
if (notSignedIn) {
  throw <SignIn />;
}
```

> Why throw instead of conditionally rendering the UI?

This is so that we can bail-out immediately of the render logic and so we can render the fallback immediately to prevent further effects to occur. For example, given that `useSignInRequired` and `useMobileOnly` throws a fallback UI:

```tsx
useMobileOnly();
const credentials = useSignInRequired();

return (
  <UserDetails credentials={credentials} />;
);
```

We don't have to check the user's authentication if the UI is only for mobile. Due to the nature of React hooks, we can't call `useSignInRequired` in a conditional way without producing another layer of component tree.

### useFallbackBoundaryRefresh

`useFallbackBoundaryRefresh` is a hook that provides a function you can call to refresh the nearest ancestor `FallbackBoundary`. If called without a valid React element as an argument, it will attempt to remount the children, otherwise, it will render the given element as a fallback UI.

```tsx
const refresh = useFallbackBoundaryRefresh();

// User has signed out, refresh the boundary to remount.
const signOut = () => {
  deleteCredentials();
  refresh();
};
```

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)