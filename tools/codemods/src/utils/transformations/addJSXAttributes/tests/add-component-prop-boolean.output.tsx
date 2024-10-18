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
      <MyComponent prop={false}>
        Hello
        <Child />
      </MyComponent>
      {/* Please add manually */}
      <MyComponent {...spreadProps} />
      <MyComponent prop={true} />
    </>
  );
};
