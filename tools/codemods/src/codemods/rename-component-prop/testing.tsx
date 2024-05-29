// This file is to test the rename-component-prop codemode with `yarn lg codemod rename-component-prop tools/codemods/src/migrations/rename-component-prop/testing.tsx`

import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <MyComponent prop="value" foo="bar">
      Hello
      <Child prop="value" />
    </MyComponent>
  );
};
