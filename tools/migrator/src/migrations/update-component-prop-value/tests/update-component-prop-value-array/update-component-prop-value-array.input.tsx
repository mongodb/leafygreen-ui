import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <>
      <MyComponent prop="value1" foo="bar" />
      <MyComponent prop="value2" foo="bar" />
      <MyComponent prop="value3" foo="bar" />
      <MyComponent prop="value4" foo="bar" />
    </>
  );
};
