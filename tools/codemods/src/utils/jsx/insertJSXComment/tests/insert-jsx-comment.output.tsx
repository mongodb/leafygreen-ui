import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  // Comment
  const TestOne = () => {
    return (
      /* testing comment */
      <MyComponent prop="before" />
    );
  };

  const TestTwo = () => {
    return (
      <>
        {/* testing comment */}
        <MyComponent prop="before" />
      </>
    );
  };

  const TestThree = () => {
    // comment
    return (
      /* testing comment */
      <MyComponent prop="before" />
    );
  };

  const TestFour = () => {
    return (
      // comment
      /* testing comment */
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
    return (
      /* testing comment */
      <MyComponent prop="before" />
    );
  };

  const TestSeven = () => {
    /* testing comment */
    return (
      /* testing comment */
      <MyComponent prop="before" />
    ); // comment
  };

  return (
    <>
      {/* testing comment */}
      <MyComponent prop="before" />
      {/* testing comment */}
      <MyComponent prop="before" />
      <MyComponent prop="after" />
      {/* testing comment */}

      {/* testing comment */}
      <MyComponent prop="before" />
      <MyComponent prop="after" />
      {/* testing comment */}

      {/* testing comment */}
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
