import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const spreadProps = {
  prop: true,
};

export const App = () => {
  return (
    <>
      <MyComponent>
        Hello
        <Child />
      </MyComponent>
      <MyComponent {...spreadProps} />
      <MyComponent prop={true} />
      <MyComponent prop={123} />
      <MyComponent prop="abc" />
      <MyComponent prop={null} />
    </>
  );
};
