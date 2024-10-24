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
      {/* Please manually remove prop: prop */}
      <MyComponent {...spreadProps} />
      <MyComponent />
      <MyComponent />
      <MyComponent />
      <MyComponent />
    </>
  );
};
