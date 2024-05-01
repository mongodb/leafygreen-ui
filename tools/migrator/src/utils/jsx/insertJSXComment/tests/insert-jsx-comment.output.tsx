import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  // Random Comment
  const Test = () => {
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
      <Test />
      <TestTwo />
    </>
  );
};
