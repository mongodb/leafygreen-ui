import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  // Random Comment
  const Test = () => {
    return <MyComponent prop="before" />;
  };

  const TestTwo = () => {
    return (
      <>
        <MyComponent prop="before" />
      </>
    );
  };

  return (
    <>
      <MyComponent prop="before" />
      <MyComponent prop="before" />
      <MyComponent prop="after" />
      <MyComponent prop="before" />
      <MyComponent prop="after" />
      <MyComponent prop="before" />
      <Test />
      <TestTwo />
    </>
  );
};
