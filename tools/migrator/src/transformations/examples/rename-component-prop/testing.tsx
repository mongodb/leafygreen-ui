import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <MyComponent prop="value" foo="bar">
      Hello
      <Child prop="value" />
    </MyComponent>
  );
};

// npx jscodeshift -t /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/examples/rename-component-prop/transform.ts /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/examples/rename-component-prop/testing.tsx --componentName="MyComponent" --from="prop" --to="newProp" --parser=tsx -p

// npx jscodeshift -t /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/examples/rename-component-prop/transform.ts /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/examples/rename-component-prop/testing.tsx --parser=tsx -p
