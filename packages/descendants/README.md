# Descendants

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/descendants.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/descendants/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/descendants
```

### NPM

```shell
npm install @leafygreen-ui/descendants
```

## Overview

`Descendants` is an internal utility that allows components to track all rendered descendants.

This is useful when developing menus in order to track when items are rendered/un-rendered.

## Usage

There are 4 lines required to set up a pair of components as Parent/Descendent.

```tsx
/**
 * 1. Create a new Context
 *
 * We need to create a new Context object in order for the parent & child to know their relationships.
 * Without this, a descendant won't know what parent context it belongs to.
 * This also enables us to nest different descendant contexts
 * (e.g. A Menu that a second fly-out menu shouldn't track fly-out menu items as its own descendants)
 *
 */
const MyDescendantsContext = createDescendantsContext('MyDescendantsContext');

export const MyParent = ({ children, ...rest }: ComponentProps<'div'>) => {
  /**
   * 2. Initialize an empty `descendants` data structure and setter
   *
   * We call this _outside_ the Provider so we can access the `descendants` object
   * from the Parent level.
   */
  const { descendants, dispatch } = useInitDescendants<HTMLDivElement>();

  /**
   * 3. Pass the context & descendants data structure into the provider
   *
   * We need to pass the context value into the Provider in order for the Parent to have knowledge of its specific context (see fly-out menu example in step 1.)
   */
  return (
    <DescendantsProvider
      context={TestDescendantContext}
      descendants={descendants}
      dispatch={dispatch}
    >
      <div {...rest}>{children}</div>
    </DescendantsProvider>
  );
};

export const TestDescendant = ({
  children,
  ...rest
}: ComponentProps<'div'>) => {
  /**
   * 4. Establish a child component as a descendant of the given context
   *
   * We pass the context value into the hook in order to establish this element
   */
  const { index, ref } = useDescendant(TestDescendantContext);

  // This component has access to its index within the Parent context

  return (
    <div ref={ref} data-testid="leafygreen-item" data-index={index} {...rest}>
      {children}
    </div>
  );
};
```

## Architecture

This package heavily references the work of [`pacocoursey/use-descendants`](https://github.com/pacocoursey/use-descendants/tree/v0) and [`@reach-ui/descendants`](https://github.com/reach/reach-ui/tree/dev/packages/descendants). Many thanks to the authors of those packages!

The primary difference between this package and those mentioned above is the use of a reducer to avoid unnecessary rerenders.

## Evaluation & Benchmarks

Below is a comparison between this package, `pacocoursey` and `reach-ui`, as well as a control test. The control refers to rendering plain `div` elements, without any descendants tracking.

Overall, this package performed about 2x faster than `reach-ui` and 60% faster than `pacocoursey` in most metrics.

### Test format

Each package was tested using Jest with JSDOM and React Testing Library. Each package was tested 100x for each metric. The metrics tested are as follows:

1. **Render**: Render speed was tested by rendering 500 elements to the DOM

2. **Nested**: Nested render speed was tested by rendering 100 groups of 5 elements each to the DOM

3. **Insert**: Insertion was tested by first rendering 500 elements to the DOM, and then inserting an element at the 250th element

4. **Remove**: Removal speed was tested by first rendering 500 elements to the DOM, and then removing the 250th element

5. **Select**: Select speed is a proxy for "update" speed. This was tested by adding a click handler to a descendant element that registered its index to an outer context as "selected". The element would then render the attribute `data-selected="true"` to the DOM.
   The select speed was measured by first rendering 500 elements to the DOM, clicking the 250th element and measuring the speed to update the DOM with the above data attribute.

### Results

Below are the results of 100 iterations of the above listed tests:

```
// TBD
```
