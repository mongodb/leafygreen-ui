import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  const props = {
    randomProp: 'value',
  };

  const Test = () => {
    return <MyComponent propToRemove="value2" {...props} />;
  };

  const TestTwo = () => {
    return (
      <>
        <MyComponent propToRemove="value2" {...props} />
      </>
    );
  };

  return (
    <>
      <MyComponent propToUpdate="another value" />
      <MyComponent propToUpdate="value" propToRemove="value2">
        Hello
        <Child propToUpdate="value" propToRemove="value2" />
        <MyComponent propToUpdate="another value" propToRemove="value2" />
      </MyComponent>
      <MyComponent propToUpdate="another value" propToRemove="value2" />
      <MyComponent propToRemove="value2" />
      <MyComponent propToRemove="value2" {...props} />
      <MyComponent propToUpdate="value" propToRemove="value2" {...props} />
      <MyComponent propToRemove="randome value" />
      <Test />
      <TestTwo />
    </>
  );
};
