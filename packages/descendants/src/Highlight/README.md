# Highlight Management

A suite of utilities for managing the highlight state of Descendants.

# Background

Keeping track of which element in a list should be focused/highlighted is a common pattern across the UI library. This package creates a common pattern for implementing this behavior.

# Glossary of terms

## Highlight

An element that currently shows in a _highlighted_ state. This is distinct from the “checked” state. Technically implemented using either DOM activeElement (focus), or the aria-selected attribute. (see Accessibility)

## Focus

The DOM activeElement, one of at least 2 ways to implement “highlight”

## Checked

A distinct state from “highlighted” — a list element can be either “highlighted”, “checked” or both. “Checked” represents a component’s current value, (i.e. the selected item in a Select menu). When using DOM activeElement to represent “highlight”, the “checked” state should be represented using the aria-current attribute.

# Usage

```tsx
/** HighlightDemo.tsx */
const MyDescendantContext = createDescendantsContext();
const MyHighlightContext = createHighlightContext();

const HighlightDemo = () => {
  // Initialize a new Descendants tracker
  const { Provider: MyDescendantsProvider, getDescendants } =
    useInitDescendants(MyDescendantContext);

  // Initialize a new highlight tracker
  const { Provider: MyHighlightProvider } = useHighlight(
    MyHighlightContext,
    getDescendants,
  );

  return (
    /* Init the Descendants context provider */
    <MyDescendantsProvider>
      {/* Init the Highlight context provider */}
      <MyHighlightProvider>
        {items.map(item => (
          <HighlightItem key={item}>{item}</HighlightItem>
        ))}
      </MyHighlightProvider>
    </MyDescendantsProvider>
  );
};
```

```tsx
/** HighlightItem.tsx */

const HighlightItem = ({ children }: PropsWithChildren<{}>) => {
  const { ref, id } = useDescendant(MyDescendantContext);
  const { highlight } = useHighlightContext(MyHighlightContext);

  const isHighlighted = highlight?.id === id;

  return (
    <div
      ref={ref}
      style={{
        color: isHighlighted ? 'red' : 'black',
      }}
    >
      {children}
    </div>
  );
};
```

## `options.onInit`: Setting the initial highlight

To set the initial highlight (or run side-effects once on init), provide an `onInit` callback to the `options` argument of `useHighlight`.

```ts
const { getDescendants, Provider } = useInitDescendants(MyDescendantContext);
const { setHighlightAbsolute } = useHighlight(
  MyHighlightContext,
  getDescendants,
  {
    // Fired once when the descendants are initialized
    onInit: () => {
      setHighlightAbsolute(0);
    },
  },
);
```

## `options.onChange`: Responding to Highlight changes (running side-effects)

To run side-effects after the highlight has been updated, provide an `onChange` callback to the `options` argument of `useHighlight`.

```ts
const { ... } = useHighlight(MyHighlightContext, getDescendants, {
  // Fired when the highlight state changes
  onChange: (next: Descendant | undefined) => {
    if (next) {
      // Focus the element when highlight is updated
      next.ref.current.focus();
    }
  },
});
```

## `options.filter`: Filtering descendants

Occasionally some descendants should not be able to be highlighted. In these cases, provide a `filter` function to the `options` argument of `useHighlight`.

```ts
const { ... } = useHighlight(MyHighlightContext, getDescendants, {
  // Exclude descendants with the `disabled` prop from receiving highlight
  filter: (descendant: Descendant) => !descendant.props.disabled,
});
```

Note: When filtering using `descendant.props`, make sure to track the relevant props when registering the descendant:

```ts
const HighlightItem = ({
  children,
  disabled,
}: PropsWithChildren<{
  disabled: boolean;
}>) => {
  const { ref, id } = useDescendant(MyDescendantContext, null, {
    disabled, // <- Track relevant descendant props when registering the descendant
  });

  return (
    <div
      ref={ref}
      style={{
        color: isHighlighted ? 'red' : 'black',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
};
```
