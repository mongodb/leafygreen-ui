import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <>
      <MyComponent prop="value1Mapped" foo="bar" />
      <MyComponent prop="value2Mapped" foo="bar" />
      <MyComponent prop="value3Mapped" foo="bar" />
      <MyComponent prop="value4Mapped" foo="bar" />
    </>
  );
};
