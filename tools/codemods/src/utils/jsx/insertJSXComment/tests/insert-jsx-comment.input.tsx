import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  // Comment
  const TestOne = () => {
    return <MyComponent prop="before" />;
  };

  const TestTwo = () => {
    return (
      <>
        <MyComponent prop="before" />
      </>
    );
  };

  const TestThree = () => {
    // comment
    return <MyComponent prop="before" />;
  };

  const TestFour = () => {
    return (
      // comment
      <MyComponent prop="before" />
    );
  };

  const TestFive = () => {
    return (
      /* testing comment */
      <MyComponent prop="before" />
    );
  };

  const TestSix = () => {
    /* testing comment */
    return <MyComponent prop="before" />;
  };

  const TestSeven = () => {
    /* testing comment */
    return <MyComponent prop="before" />; // comment
  };

  return (
    <>
      <MyComponent prop="before" />
      <MyComponent prop="before" />
      <MyComponent prop="after" />
      <MyComponent prop="before" />
      <MyComponent prop="after" />
      <MyComponent prop="before" />
      <TestOne />
      <TestTwo />
      <TestThree />
      <TestFour />
      <TestFive />
      <TestSix />
      <TestSeven />
    </>
  );
};
