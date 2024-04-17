import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <>
      <MyComponent firstProp="value3">
        Hello
        <Child firstProp="value" secondProp="value2" />
      </MyComponent>
      <MyComponent firstProp="value3" />
    </>
  );
};
