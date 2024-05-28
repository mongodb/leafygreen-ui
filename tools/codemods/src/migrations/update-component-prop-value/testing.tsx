// This file is to test the update-component-prop-value codemode with `yarn lg codemod update-component-prop-value tools/codemods/src/migrations/update-component-prop-value/testing.tsx`

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
