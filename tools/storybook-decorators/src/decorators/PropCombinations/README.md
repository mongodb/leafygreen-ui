# Prop Combinations Decorator

This custom decorator reads metadata from the storybook default export, and generates a single story that renders all combinations of props defined in the story metadata.

# Getting started

## Storybook Config

Add a `generate` parameter in the story meta object.

```tsx
// Button.stories.tsx
const meta: StoryMeta<typeof Button> = {
  component: Button,
  parameters: {
    default: 'LiveExample',
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

## Multiple generated stories

You can also break up the generated prop combinations into multiple stories.

To do this, list the generated story names in the `generate` parameter, and set the args you want to remain static on the individual story.

```tsx
const meta: StoryMeta<typeof Button> = {
  ...
  parameters: {
    generate: {
      stories: ['LargeSize', 'DefaultSize'],
      combineArgs: { ... },
    },
  }
}

...

export const DefaultSize: StoryType<typeof Button> = () => <></>;
DefaultSize.parameters = {
  generate: {
    args: {
      size: Size.Default,
    },
  },
};

export const LargeSize: StoryType<typeof Button> = () => <></>;
LargeSize.parameters = {
  generate: {
    args: {
      size: Size.Large,
    },
  },
};
```

# Options

## `args`

`ObjectOf(string, value)`

By default the decorator pulls args from the main `meta.args` value. However, you may need to set args that are different for the generated instances. In this case,
use `generate.args` to pass static props that are different from the main story args.

```tsx
const meta: StoryMeta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: { ... },
      args: { open: true }
    },
  },
};
export default meta;
```

## `decorator`

`(InstanceFn: StoryFn, context?: {args: Args}) => JSX.Element`

The GeneratedStory decorator will _not_ read the decorators value defined in `meta.decorators`. To add a wrapper around each instance, define a decorator within `generate`.

```tsx
const meta: StoryMeta<typeof Body> = {
  component: Body,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: { ... },
      decorator: (InstanceFn, context) => {
        return (
          <LeafyGreenProvider baseFontSize={context?.args.baseFontSize}>
            <InstanceFn />
          </LeafyGreenProvider>
        );
      },
    },
  },
};
```

## `excludeCombinations`

```ts
ArrayOf(
  oneOf(
    // Mutually exclusive props
    [propName, propName],
    // Conditional props
    [propName, ObjectOf(string, value)]
    // Specific combinations
    ObjectOf(string, value)
  )
)
```

You may not always want to test _every_ combination of props. For example, in Button we shouldn't be testing the case when `children`, `leftGlyph` and `rightGlyph` are _all_ undefined.

To exclude prop combinations, add `excludeCombinations` to the `generate` object:

```tsx
generate: {
  combineArgs: { ... }
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

Define mutually exclusive combinations as an array of prop keys

```tsx
generate: {
  combineArgs: {...},
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
  combineArgs: {...},
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
  combineArgs: {...},
  excludeCombinations: [
    {
      children: undefined,
      rightGlyph: undefined,
      leftGlyph: undefined,
    },
  ],
}
```

### Defining multiple exclude cases

You can define multiple exclude cases in one rule by setting the value to an array

```tsx
generate: {
  component: Toast,
  combineArgs: {
    progress: [0, 0.5, 1],
    variant: ['progress', 'success', 'note', 'info']
  },
  excludeCombinations: [
    // This rule excludes all combinations of progress & variant defined
    {
      progress: [0.5, 1],
      variant: ['success', 'note', 'info']
    },
  ],
}
```

### Defining multiple combinations

You can exclude multiple combinations of props from being tested by adding them to the array:

```tsx
generate: {
  combineArgs: {...},
  excludeCombinations: [
    ['children', 'title'],
    [
      'description',
      {
        label: [undefined, null, ''],
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
