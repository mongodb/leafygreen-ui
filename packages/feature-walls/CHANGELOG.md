# @lg-private/feature-walls

## 5.0.1

### Patch Changes

- Updated dependencies [92693df]
- Updated dependencies [c6b4d3f]
- Updated dependencies [888a37d]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/emotion@5.1.0
  - @leafygreen-ui/card@13.2.0
  - @leafygreen-ui/icon@14.6.1
  - @leafygreen-ui/typography@22.2.0
  - @leafygreen-ui/badge@10.2.2
  - @leafygreen-ui/button@25.1.2
  - @leafygreen-ui/hooks@9.2.2
  - @leafygreen-ui/vertical-stepper@3.0.2

## 5.0.0

### Major Changes

- 1a9926f: [LG-5579](https://jira.mongodb.org/browse/LG-5579)

  **Package has been renamed and moved!** This package is now published under the `@leafygreen-ui` scope. All dependencies and import paths must be updated from `@lg-private/feature-walls` to `@leafygreen-ui/feature-walls`.

  - Removes exports for `Accordion` and `ExpandableGrid`
  - Removes `react-transition-group` dependency in favor of raw CSS transition

### Patch Changes

- Updated dependencies [f3a8bdc]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/vertical-stepper@3.0.1
  - @leafygreen-ui/descendants@3.0.5
  - @leafygreen-ui/typography@22.1.4
  - @leafygreen-ui/button@25.1.1
  - @leafygreen-ui/badge@10.2.1
  - @leafygreen-ui/card@13.1.2

## 4.1.1

### Patch Changes

- 408a10c: Adds a parent level stories file which will be displayed on .design

## 4.1.0

### Minor Changes

- 4969ac2: [LG-4860](https://jira.mongodb.org/browse/LG-4860): adds `onExpand` prop to `AccordionButton` and adds `onExpand` prop to feature object in `features` prop in `FeatureOverview` component

## 4.0.0

### Major Changes

- c9203f7: Removes `prop-types`. Updates LG core packages to latest

### Patch Changes

- Updated dependencies [c9203f7]
  - @leafygreen-ui/vertical-stepper@3.0.0

## 3.3.1

### Patch Changes

- a8683d9: [LG-4668](https://jira.mongodb.org/browse/LG-4668): use default cursor for expanded AccordionButton
- 6ac1e8c: [LG-4669](https://jira.mongodb.org/browse/LG-4669): fixes layout of `FeatureOverview` section
- 066c4ce: [LG-4670](https://jira.mongodb.org/browse/LG-4670): gracefully resize UI for buttons in `ActivationSteps` section, accordion panels in `FeatureOverview` section, and children container in `UseCases` section

## 3.3.0

### Minor Changes

- 7bc05af: [LG-4532](https://jira.mongodb.org/browse/LG-4532): Fixes `media` styles in `InfoBlock` instances where `variant="icon"`. Previously, `<img>` tags would resize to full container width and height

  Also extends the type of `description` prop in the `Header` component from `string` to `ReactNode`

## 3.2.0

### Minor Changes

- 793024d: Extend `maxColumns` prop in `UseCases` to accept 2 max columns. Add 100% width to `Section` rendered in `Card`

## 3.1.0

### Minor Changes

- 5280f82: Update `media` prop in `InfoBlock` component to be optional and add 1040px max-width to `Section` component rendered in `Card` UI

## 3.0.0

### Major Changes

- dcab77e: [LG-4412](https://jira.mongodb.org/browse/LG-4412)

  - `Section` component: adds `renderInCard` prop to render section in a card UI
  - `Section` component: removes children container div to give consumers more flexibility in styling `children`
  - `FeatureOverview`, `Templates`, and `UseCases` always render in card UI
  - Exports types for `ActivationStep`, `Template`, and `UseCase`

### Minor Changes

- dcab77e: [LG-4413](https://jira.mongodb.org/browse/LG-4413): `ActivationSteps` uses updated `VerticalStepper`. Steps always render `description` and `media` regardless of `currentStep`. [See v2.1.0](https://github.com/10gen/leafygreen-ui-private/blob/556389f3e613743a6d507ccd43a60f12d4557654/packages/vertical-stepper/CHANGELOG.md#210)

### Patch Changes

- Updated dependencies [dcab77e]
  - @leafygreen-ui/vertical-stepper@2.1.0

## 2.0.0

### Major Changes

- a3f1aa9: Uses updated `@leafygreen-ui/vertical-stepper` API ([see v2.0.0](https://github.com/10gen/leafygreen-ui-private/blob/0f78a7c4a1051dac1457be137e48955fb4753d91/packages/vertical-stepper/CHANGELOG.md#200))

### Minor Changes

- bf68ad1: Reduce top padding in content container for `InfoBlock` card variant from 32px to 24px
- 09be0ef: Exports `ActivationSteps` and `ActivationStepsProps`

### Patch Changes

- Updated dependencies [a3f1aa9]
  - @leafygreen-ui/vertical-stepper@2.0.0

## 1.0.0

### Major Changes

- f78419b: [LG-3710](https://jira.mongodb.org/browse/LG-3710): First major release of `@lg-private/feature-walls`

  - [LG-4395](https://jira.mongodb.org/browse/LG-4395): design QA
    - Tweaks `ExpandableGrid` view more button styles
    - Removes visible focus for `AccordionItem` and `AccordionButton` if selected
    - Fixes `ActivationSteps` completed message text color

### Patch Changes

- 8f076fb: Fixes naming of lg private packages from `@leafygreen-ui/*` to `@lg-private/*`
- Updated dependencies [8f076fb]
- Updated dependencies [f78419b]
  - @leafygreen-ui/vertical-stepper@1.1.0

## 0.7.0

### Minor Changes

- 9be4815: [LG-4364](https://jira.mongodb.org/browse/LG-4364): expands interactable surface of the `AccordionButton`
- ecbeee4: Adds the `UseCases` component which is mostly presentational for rendering multiple use cases in a flex container. UI will render in an expandable card if the number of use cases exceeds the `maxColumns` prop.

  In `ExpandableGrid` component...

  - Updates spacing
  - Uses `scrollHeight` instead of `offsetHeight` to calculate the starting collapsed height

## 0.6.0

### Minor Changes

- 59e95fb: Adds the `ActivationSteps` component which acts as a presentational wrapper for the VerticalStepper component.
- 2ec12a3: Adds the `FeatureOverview` component which is mostly presentational for rendering multiple features in an `Accordion` component with an adjacent media container.
- de076e3: - Adds the `Templates` component which is mostly presentational for rendering multiple templates in a flex container.
  - Updates `Section` component max-width from 1184px to 1040px

## 0.5.0

### Minor Changes

- d39e002: Adds the `ExpandableGrid` component which handles expand/collapse behavior when rendering a larger number of components.

## 0.4.0

### Minor Changes

- ee45cec: Adds the `Section` component to apply uniform title styling and spacing for different sections.
- ed07805: Adds the `Accordion` component which currently only supports rendering a single panel's content. Component can be controlled by passing in the `index` and `onIndexChange` props

  Keyboard interaction only supports the required W3 specs for `enter`, `space`, `tab`, and `shift+tab` but may be expanded in the future if the component is added to main LeafyGreen repo: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

## 0.3.0

### Minor Changes

- 9afe136: Adds the `InfoBlock` component, a versatile and customizable component for displaying key info in a structured manner. It is best suited for use cases where a combination of media (icons, illustrations, or images) and text needs to be presented together, optionally supplemented with badge(s) and a button. Common use cases may include feature use cases or templates

## 0.2.0

### Minor Changes

- c3a9674: - Establishes `@lg-private/feature-walls` package which will store a system of components for feature teams to develop, experiment, and maintain feature walls cohesively
  - Adds the `Header` component:
    - Required props include:
      - `title`
      - `primaryButtonProps`
    - Optional props include:
      - `subtitle`
      - `description`
      - `secondaryButtonProps`
