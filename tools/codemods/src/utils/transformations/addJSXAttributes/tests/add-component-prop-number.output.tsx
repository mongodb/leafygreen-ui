import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const spreadProps = {
  prop: 789,
};

export const App = () => {
  return (
    <>
      <MyComponent prop={123}>
        Hello
        <Child prop={456} />
      </MyComponent>
      {/* Please add manually */}
      <MyComponent {...spreadProps} />
      <MyComponent prop={789}>Hello</MyComponent>
    </>
  );
};
