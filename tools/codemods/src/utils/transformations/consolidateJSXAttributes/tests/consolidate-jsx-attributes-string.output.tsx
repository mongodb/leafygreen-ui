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
    return (
      /* Please update manually */
      <MyComponent propToRemove="value2" {...props} />
    );
  };

  const TestTwo = () => {
    return (
      <>
        {/* Please update manually */}
        <MyComponent propToRemove="value2" {...props} />
      </>
    );
  };

  return (
    <>
      <MyComponent propToUpdate="another value" />
      <MyComponent propToUpdate="value3">
        Hello
        <Child propToUpdate="value" propToRemove="value2" />
        <MyComponent propToUpdate="value3" />
      </MyComponent>
      <MyComponent propToUpdate="value3" />
      <MyComponent propToUpdate="value3" />
      {/* Please update manually */}
      <MyComponent propToRemove="value2" {...props} />
      <MyComponent propToUpdate="value3" {...props} />
      <MyComponent />
      <Test />
      <TestTwo />
    </>
  );
};
