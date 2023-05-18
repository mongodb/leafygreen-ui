# Developing

## Can I Contribute?

We appreciate contributions of all kinds -- whether that is a bug fix, or a new component.

Before making a PR with a brand new component, hook or feature, it may be helpful to consider whether it solves the following:

- Can the feature be used across multiple MongoDB Products?
- Is it abstracting logic that many developers or components could utilize?
- Have you considered how to make this as generalizable as possible?

## Roadmap

If you're interested in contributing, and want to know what projects we have on deck, check out our roadmap [here](https://wiki.corp.mongodb.com/display/DESIGN/Design+Systems).

## Our Stack

### TypeScript

LeafyGreen uses TypeScript, to help make consumption of this library as intuitive and error-free as possible. If you're new to TypeScript, these resources may be able to help you get started:

1. [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
2. [TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)

### Emotion

For styling, we use the CSS-in-JS library, Emotion. To get started with Emotion check out their documentation [here](https://emotion.sh/docs/introduction).

We've created a wrapper around the Emotion library, which can be brought into new components as such:

`import { css, cx } from @leafygreen-ui/emotion`

When using the library, you must use our Emotion instance, because of constraits over how styles are injected into the page.

### React Design Patterns

As far as design patterns leveraged by our components we tend to favor:

- Functional components over class-based components
- Creating abstractable hooks where possible, that can be used across multiple components
- Native Array methods to bringing in other libraries, such as Lodash
- Using default exports over named exports

## Code Style

### Accessibility

Approaching components in an accessible manner is something we take seriously on this team. That being said, we have some technologies in place to enforce that new components, or updates to existing components, are being developed with these standards in mind.

1. `eslint-jsx-a11y`

This is a static AST checker for accessibility rules on JSX elements.

2.  `@storybook/addon-a11y`

We have an accessibility addon in Storybook which checks for `a11y` violations in components. While developing, please be sure that your component does not fail any accessibility checks here.

To note: The addon is not able to detect information on the DOM that is portaled. Therefore, if working with a portaled component, please be sure to test the component’s accessibility without portaling the content.

### Documentation

When you run the scaffold script, a `README` file will appear, which is a template for how we document our components. Beyond just `README` documentation, we use `@ts-docs` to self-document each component. Please follow this pattern when creating new components or adding props to existing components.

### Testing

#### Locally

We use @testing-library/react for writing tests locally. This library helps mock out user interactions with components. You can run all tests by running `yarn test` or turn on watch mode with `yarn test --watch`.

#### Linking

We also have a link script, such that you can test components that are in development in environments beyond Storybook. To do so, run `yarn run link -- [path-to-application]`.

## Creating a new component

- Run `yarn create-package <package-name>` to create a new component directory with default configurations
- Add the new component to `build.tsconfig.json`
- If you are using any `leafygreen-ui` dependencies in your new component, add the dependency to the component directory's `tsconfig.json`.
- Run `yarn run init` to link all packages before starting development

## Marking a Storybook story to be imported in mongodb.design

The mongodb.design website will automatically import the `*.story.tsx` file from its installed package directory to render its live example. By default, the first exported story from the `*.story.tsx` file will be rendered. To specify a different story to be rendered, define the following in the Storybook file's Meta object:

```
import { StoryMetaType } from '@leafygreen-ui/lib';

const meta: StoryMetaType<typeof Component> = {
  title: 'Components/name',
  component: Component,
  parameters: {
    default: 'StoryName',
  }
}

export default meta
```

The `StoryMetaType` utility type from `@leafygreen-ui/lib` will enforce parameters required for use with Chromatic and on `mongodb.design`

## Preventing an interface from being imported in mongodb.design's Code Docs

The mongodb.design website's code docs page will automatically import all exported interfaces. Interfaces and components marked with `@internal` and `@example` in TSDocs will be removed by default. To force an interface to be removed, add a `@noDocgen` flag to the TSDocs.
