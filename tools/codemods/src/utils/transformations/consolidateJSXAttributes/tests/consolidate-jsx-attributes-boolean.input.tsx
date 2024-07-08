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
      <MyComponent disabled={false} {...props} />
      <MyComponent state="another value" disabled={false} {...props} />
      <MyComponent state="another value" disabled={false} />
      <MyComponent state="value" disabled={false}>
        Hello
        <Child state="value" disabled={false} />
        <MyComponent state="another value" disabled={false} />
      </MyComponent>
      {/* disabled=true */}
      <MyComponent disabled />
      <MyComponent state="another value" disabled />
      <MyComponent state="another value" disabled={true} />
      <MyComponent state="value" disabled={true}>
        Hello
        <Child state="value" disabled={true} />
        <MyComponent state="another value" disabled={true} />
      </MyComponent>
      <MyComponent disabled={true} {...props} />
      <MyComponent state="another value" disabled={true} {...props} />
    </>
  );
};
