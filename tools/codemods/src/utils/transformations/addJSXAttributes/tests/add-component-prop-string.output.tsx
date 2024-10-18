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
      <MyComponent prop="new-value">
        Hello
        <Child prop="child-value" />
      </MyComponent>
      {/* Please add manually */}
      <MyComponent {...spreadProps} />
      <MyComponent prop="existing-value">Hello</MyComponent>
    </>
  );
};
