# Contributing to codemods

## Getting Started

All codemods/migrations can be found under `src/migrations` and each migration should have its own directory.

```
src
 ┣ migrations                                     # directory for all migrations
 ┃ ┣ <name-of-migration>                          # directory for individual migration
 ┃ ┃ ┣ tests                                      # directory for migration tests
 ┃ ┃ ┃ ┗ <name-of-migration>                      # directory for a specific test
 ┃ ┃ ┃ ┃ ┣ <name-of-migration>.input.tsx          # input file for test
 ┃ ┃ ┃ ┃ ┣ <name-of-migration>.output.tsx         # output file for test
 ┃ ┃ ┃ ┃ ┗ transform.spec.ts                      # jest test file
 ┃ ┃ ┣ testing.tsx                                # (optional) file used to test `yarn lg codemod...`
 ┃ ┃ ┗ transform.ts                               # transformer function (file that modifies the code )
 ┃ ┗ ...
 ┗ ...
```

Utils can be found under `src/utils`

```
src
 ┣ utils                                          # directory for all utils
 ┃ ┣ transformations                              # directory for reusable transformations
 ┃ ┃ ┣ <name-of-transformation>                   # directory for individual transformation
 ┃ ┃ ┃ ┣ tests                                    # directory for transformation tests
 ┃ ┃ ┃ ┃ ┣ <test-name>                            # directory for a specific test
 ┃ ┃ ┃ ┃ ┃ ┣ <test-name>.input.tsx                # input file for test
 ┃ ┃ ┃ ┃ ┃ ┣ <test-name>.output.tsx               # output file for test
 ┃ ┃ ┃ ┃ ┃ ┗ transform.spec.ts
 ┃ ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┃ ┣ <name-of-transformation>.ts              # transformation code
 ┃ ┃ ┃ ┣ index.ts                                 # file to add exports
 ┃ ┃ ┃ ┗ transform.ts                             # transfomer function used for testing purposes
 ┃ ┃ ┗ ...
 ┃ ┗ ...
 ┗ ...
```

## Creating a codemod

This package uses [jscodeshift](https://github.com/facebook/jscodeshift) to parse source code into an abstract syntax tree([AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)).

Each codemod needs a transformer function. A transformer function takes in a file to transform, a reference to the jscodeshift library and an optional list of options. This function will parse the source code from the file into an AST, perform the transformation on the AST, then convert the modified AST back into source code.

e.g.

```jsx
/**
 * Example transformer function to consolidate props
 *
 * @param file the file to transform
 * @param jscodeshiftOptions an object containing at least a reference to the jscodeshift library
 * @param options an object containing options to pass to the transform function
 * @returns Either the modified file or the original file
 */
export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: TransformerOptions,
) {
  const source = j(file.source); // Use jscodeshift (j) to parse the source code into an AST

  const {
    propToRemove = 'propToRemove',
    propToUpdate = 'propToUpdate',
    propMapping = {
      value2: 'value3',
    },
    propToRemoveType = 'string',
    componentName = 'MyComponent',
  } = options;

  const elements = source.findJSXElements(componentName);
  if (elements.length === 0) return file.source;

  elements.forEach(element => {
    // Perform transformations on the AST
    consolidateJSXAttributes({
      j,
      element,
      propToRemove,
      propToUpdate,
      propMapping,
      propToRemoveType,
    });
  });

  return source.toSource(); // Return the transformed source code
}
```

Using a tool like [AST Explorer](https://astexplorer.net/) can help you visualize and experiment with Abstract Syntax Trees (ASTs)

## Testing

To test codemods, we need to create an input and output file. We then pass the input file through the transformer function and use [Jest](https://jestjs.io/) to verify if the transformed input file matches the output file.

e.g.

`input.tsx`

```tsx
import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <>
      <MyComponent propToUpdate="another value" />
      <MyComponent propToUpdate="value" propToRemove="value2" />
    </>
  );
};
```

`output.tsx`

```tsx
import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <>
      <MyComponent propToUpdate="another value" />
      <MyComponent propToUpdate="value3" />
    </>
  );
};
```

`test.spec.ts`

```js
const formattedOutput = prettier.format(output, { parser });
const formattedExpected = prettier.format(expected, { parser });

// Format output and expected with prettier for white spaces and line breaks consistency
expect(formattedOutput).toBe(formattedExpected);
```
