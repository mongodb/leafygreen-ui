import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const spreadProps = {
  prop: 'existing-value',
};

export const App = () => {
  return (
    <>
      <MyComponent>
        Hello
        <Child prop="child-value" />
      </MyComponent>
      <MyComponent {...spreadProps} />
      <MyComponent prop="existing-value">Hello</MyComponent>
    </>
  );
};
