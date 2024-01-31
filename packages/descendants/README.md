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

There are 4 steps required to set up a pair of components as Parent/Descendent.

```tsx
/**
 * 1. Create a new Context
 *
 * We need to create a new Context object
 * in order for the parent & child to know their relationships.
 *
 * Without this, a descendant won't know what parent context it belongs to.
 * This also enables us to nest different descendant contexts
 *
 * e.g.
 * A Menu that a second fly-out menu
 * shouldn't track fly-out menu items as its own descendants)
 *
 */
const MyDescendantsContext = createDescendantsContext('MyDescendantsContext');

export const MyParent = ({ children, ...rest }: ComponentProps<'div'>) => {
  /**
   * 2. Initialize an empty descendants list and setter
   *
   * We call this _outside_ the Provider
   * so we can access the `descendants` object
   * from the Parent level.
   */
  const { descendants, dispatch } = useInitDescendants<HTMLDivElement>();

  /**
   * 3. Pass the context, descendants list and setter into the provider
   *
   * We need to pass the context value into the Provider
   * in order for the Parent to have knowledge
   * of its specific context
   * (see fly-out menu example in step 1.)
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
   * 4. Establish a child component as a descendant
   *
   * Pass the context value into the hook
   * in order to establish this element
   */
  const { index, ref } = useDescendant(TestDescendantContext);

  // This component has access to its index within the Parent context

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};
```

## Prior Art

This package heavily references the work of [`pacocoursey/use-descendants`](https://github.com/pacocoursey/use-descendants/tree/v0) and [`@reach-ui/descendants`](https://github.com/reach/reach-ui/tree/dev/packages/descendants). Many thanks to the authors of those packages!

However, in addition to being internal and not available as a v1.0, these packages have a few shortcomings:

- `pacocoursey` relies on writing to the DOM inside a `useEffect`, which is highly non-idiomatic for React
- `pacocoursey` uses two refs to track descendants, which duplicates the space needed, and could be difficult to ensure they stay in sync
- `pacocoursey` must force-rerender descendant elements in order to have access to their index
- `reach-ui` does not enable users to props passed into a descendant from the `descendants` object
- `react-ui` is not compatible with React 18 and strict-mode
- Both `reach-ui` and `pacocoursey` must ignore the linter for `useEffect` dependencies

The primary architectural difference between this package and those mentioned above is the use of a reducer to avoid unnecessary rerenders.

## Architecture

1. We call a [context factory function](./src/DescendantsContext.tsx) to create a new descendants context

2. A parent component calls [`useInitDescendants`](./src/useInitDescendants.tsx) to establish a `descendants` state and `dispatch` state setter(s)

   a. `useInitDescendants` creates a [`DescendantsReducer`](./src/DescendantsReducer.ts) with `descendants` state and `dispatch` setter. (More on the `dispatch` function in [DescendantsReducer](#descendantsreducer))

3. The `descendants` state, `dispatch` and `context` are passed into [`DescendantsProvider`](./src/DescendantProvider.tsx) which establishes a new context provider for the passed-in context

4. A child component calls [`useDescendant`](./src/useDescendant.tsx) to establish itself as a descendant of the provided `context` argument

### `useDescendant`

At high level this hook reads `descendants` and `dispatch` from the established context, and makes a call to `dispatch` on initial render to register itself as a descendant. On un-mount it then makes a second call to `dispatch` to remove itself from the list. A descendant's internal `id` is a ref object established once on render. Its `index` is re-calculated each time `descendants` changes.

### DescendantsReducer

The DescendantsReducer holds the list of `descendants` and a `dispatch` function to modify the list.

When `dispatch` is called with the `"register"` action type, we do the following:

1. Check whether there is a registered descendant with the given id.
   a. If there is a descendant already registered, we leave the state un-modified

2. If there is no registered descendant with this `id`,
   a. Search the DOM with [`findDOMIndex`](./src/utils/findDOMIndex.ts) to find the index of the descendant element in the DOM
   b. Create a new descendant object
   c. Duplicate the list of descendants with our new descendant inserted at the given index
   d. Return the modified list

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
┌─────────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│   (x100)    │  render  │  nested  │  insert  │  remove  │  select  │
├─────────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│   control   │   4.9ms  │   6.1ms  │   3.0ms  │   2.9ms  │     N/A  │
│ pacocoursey │  37.1ms  │  44.5ms  │  17.4ms  │  17.0ms  │  11.6ms  │
│    reach    │  50.2ms  │  60.5ms  │  21.0ms  │  13.8ms  │   9.7ms  │
│  leafygreen │  23.4ms  │  29.2ms  │  12.5ms  │  12.5ms  │   9.1ms  │
└─────────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```
