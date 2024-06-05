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

  return (
    <>
      {/* disabled=false */}
      <MyComponent />
      <MyComponent state="another value" />
      <MyComponent {...props} />
      <MyComponent state="another value" {...props} />
      <MyComponent state="another value" />
      <MyComponent state="value">
        Hello
        <Child state="value" disabled={false} />
        <MyComponent state="another value" />
      </MyComponent>
      {/* disabled=true */}
      <MyComponent state="disabled" />
      <MyComponent state="disabled" />
      <MyComponent state="disabled" />
      <MyComponent state="disabled">
        Hello
        <Child state="value" disabled={true} />
        <MyComponent state="disabled" />
      </MyComponent>
      {/* Please update manually */}
      <MyComponent disabled={true} {...props} />
      <MyComponent state="disabled" {...props} />
    </>
  );
};
