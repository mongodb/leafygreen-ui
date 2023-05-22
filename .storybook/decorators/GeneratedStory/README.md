# Generated Story Decorator

Chromatic & Storybook provide no way to programmatically define stories for multiple variants. For example, to test the `Button` component with every combination of variant, size, darkMode, and icon position, we would have to explicitly write each of these stories in the `*.stories.tsx file`, resulting in a lot of manual overhead work.

This custom decorator reads metadata from the storybook default export, and generates a single story that renders all combinations of props defined in the story metadata.

## Storybook Config

Add a `generate` parameter in the story meta object.

```tsx
// Button.stories.tsx
const meta: StoryMeta<typeof Button> = {
  component: Button,
  parameters: {
    default: 'Basic',
    generate: {
      variant: Object.values(Variant),
      size: Object.values(Size),
      leftGlyph: [undefined, <Icon glyph={'Cloud'} />],
      rightGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
      darkMode: [false, true],
    },
  },
};
export default meta;
```

Export an empty story titled `Generated` from the story file

```tsx
// Button.stories.tsx

export const Generated = () => {};
```
