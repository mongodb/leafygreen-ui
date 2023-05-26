# Generated Story Decorator

Chromatic & Storybook provide no way to programmatically define stories for multiple variants. For example, to test the `Button` component with every combination of variant, size, darkMode, and icon position, we would have to explicitly write each of these stories in the `*.stories.tsx file`, resulting in a lot of manual overhead work.

This custom decorator reads metadata from the storybook default export, and generates a single story that renders all combinations of props defined in the story metadata.

# Getting started

## Storybook Config

Add a `generate` parameter in the story meta object.

```tsx
// Button.stories.tsx
const meta: StoryMeta<typeof Button> = {
  component: Button,
  parameters: {
    default: 'Basic',
    // Define combinations of props to generate
    generate: {
      props: {
        darkMode: [false, true],
        rightGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
        leftGlyph: [undefined, <Icon glyph={'Cloud'} />],
        children: ['MongoDB', undefined],
        size: Object.values(Size),
        variant: Object.values(Variant),
      },
    },
  },
};
export default meta;
```

Export an empty story titled `Generated` from the story file

```tsx
// Button.stories.tsx
...
export const Generated = () => {};
```

This will create a story called "Generated", that renders all defined prop combinations.

![Decorator Demo](./docs/decorator-demo.png)

## Excluding prop combinations

You may not always want to test _every_ combination of props. For example, in Button we shouldn't be testing the case when `children`, `leftGlyph` and `rightGlyph` are _all_ undefined.

To exclude prop combinations, add `excludeCombinations` to the `generate` object:

```tsx
generate: {
  props: { ... }
  excludeCombinations: [
    {
      children: undefined,
      rightGlyph: undefined,
      leftGlyph: undefined,
    },
  ],
}
```

There are three methods of defining `excludeCombinations`.

### Mutually Exclusive combinations

Mutually exclusive combinations check that only one of the defined props exist on the instance. If they are both defined, then the instance is ignored.

For example, a component might accept a `children` prop, or a `title` prop, but never both.

Define mutually exclusive combinations as a tuple of prop keys

```tsx
generate: {
  props: {...},
  excludeCombinations: [
    // Will skip 'children' if 'title' is defined,
    // and vice-versa
    ['children', 'title']
  ],
}
```

### Conditional props

Conditional props will ignore a prop if another prop has a specific value.

For example, we may want to exclude a `description` prop if there is no `label` defined.

Define conditional props as a tuple of a prop key, and an object defining key-value pairs of prop conditions.

If multiple conditions are defined, they must _all_ be satisfied to exclude the instance. (i.e. AND comparator)

```tsx
generate: {
  props: {...},
  excludeCombinations: [
    /// Will skip the 'description' prop if 'label' is undefined
    [
      'description',
      {
        label: undefined,
      },
    ],
  ];
}
```

### Specific Combinations

Finally you can define a specific set of prop-value pairs that should be skipped.

For example, in Button we shouldn't be testing the case when `children`, `leftGlyph` and `rightGlyph` are _all_ undefined.

If multiple conditions are defined, they must _all_ be satisfied to exclude the instance. (i.e. AND comparator)

```tsx
generate: {
  props: {...},
  excludeCombinations: [
    {
      children: undefined,
      rightGlyph: undefined,
      leftGlyph: undefined,
    },
  ],
}
```

### Defining multiple combinations

You can exclude multiple combinations of props from being tested by adding them to the array:

```tsx
generate: {
  props: {...},
  excludeCombinations: [
    ['children', 'title'],
    [
      'description',
      {
        label: undefined,
      },
    ],
    {
      children: undefined,
      rightGlyph: undefined,
      leftGlyph: undefined,
    },
  ],
}
```
