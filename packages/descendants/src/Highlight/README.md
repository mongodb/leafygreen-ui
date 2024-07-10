# Highlight Management

A suite of utilities for managing the highlight state of Descendants.

# Usage

```tsx
/** HighlightDemo.tsx */

const HighlightDemo = () => {
  // Initialize a new Descendants object
  const { getDescendants, dispatch } = useInitDescendants<HTMLDivElement>();
  // Initialize a new highlight state
  const { highlight, moveHighlight, setHighlight } =
    useHighlight(getDescendants);

  return (
    // Init the Descendants context provider
    <DescendantsProvider
      context={TestDescendantContext}
      descendants={getDescendants()}
      dispatch={dispatch}
    >
      {/* Init the Highlight context provider */}
      <HighlightProvider
        context={TestHighlightContext}
        highlight={highlight}
        setHighlight={setHighlight}
      >
        {items.map(item => (
          <HighlightItem key={item}>{item}</HighlightItem>
        ))}
      </HighlightProvider>
    </DescendantsProvider>
  );
};
```

```tsx
/** HighlightItem.tsx */

const HighlightItem = ({ children }: PropsWithChildren<{}>) => {
  const { ref, id } = useDescendant(TestDescendantContext);
  const { highlight } = useHighlightContext(TestHighlightContext);

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

## `options.onChange`: Responding to Highlight changes

To run side-effects after the highlight has been updated, provide an `onChange` callback to the `options` argument of `useHighlight`.

```ts
const { highlight, setHighlight } = useHighlight(getDescendants, {
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
const { highlight, setHighlight } = useHighlight(getDescendants, {
  // Exclude descendants with the `disabled` prop from receiving highlight
  filter: (descendant: Descendant) => !descendant.props.disabled,
});
```

When filtering using `descendant.props`, make sure to track the relevant props when registering the descendant:

```ts
const HighlightItem = ({
  children,
  disabled,
}: PropsWithChildren<{
  disabled: boolean;
}>) => {
  // Track relevant descendant props when registering the descendant
  const { ref, id } = useDescendant(TestDescendantContext, null, {
    disabled,
  });
  // ...
};
```
