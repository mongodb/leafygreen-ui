# @leafygreen-ui/input-option

## 4.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/a11y@3.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.3
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 4.0.2

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/a11y@3.0.1
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/tokens@3.1.1

## 4.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1
  - @leafygreen-ui/typography@21.0.1

## 4.0.0

### Major Changes

- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Adds missing `@lg-tools/` devDependencies.
  Updates `build`, `tsc` & `docs` scripts to use `lg-build *` cli
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/polymorphic@3.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/a11y@3.0.0
  - @leafygreen-ui/lib@15.0.0

## 3.0.12

### Patch Changes

- @leafygreen-ui/typography@20.1.9

## 3.0.11

### Patch Changes

- @leafygreen-ui/a11y@2.0.7
- @leafygreen-ui/leafygreen-provider@4.0.7
- @leafygreen-ui/emotion@4.1.1
- @leafygreen-ui/typography@20.1.8

## 3.0.10

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/polymorphic@2.0.9
  - @leafygreen-ui/a11y@2.0.6
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 3.0.9

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/a11y@2.0.5
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 3.0.8

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/typography@20.1.5

## 3.0.7

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/typography@20.1.4

## 3.0.6

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/a11y@2.0.4
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.7
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 3.0.5

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/a11y@2.0.3
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.6
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 3.0.4

### Patch Changes

- Updated dependencies [4d932fe13]
  - @leafygreen-ui/typography@20.1.1

## 3.0.3

### Patch Changes

- eb108e93b: [LG-4727](https://jira.mongodb.org/browse/LG-4727): The `description` props in these packages were previously wrapped in a `<p>`. However, in cases where a `ReactNode` was passed to the `description` prop, it would lead to a browser error. According to the HTML spec, `<p>` cannot contain block-level elements: https://www.w3.org/TR/html401/struct/text.html#h-9.3.1

  The latest version of `@leafygreen-ui/typography` will typecheck `description` to ensure the proper element is used.

  - If a `description` of type `string` or `number` is used, it will continue to be wrapped in a `<p>`
  - All other types of `description` will be wrapped in a `<div>`

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0

## 3.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/a11y@2.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/polymorphic@2.0.5
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 3.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/polymorphic@2.0.4
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/a11y@2.0.1
  - @leafygreen-ui/lib@14.0.1

## 3.0.0

### Patch Changes

- a3d63cb95: Export prop types for components already wrapped in polymorphic types
- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/a11y@2.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 2.0.2

### Patch Changes

- ecae9acc7: Updates `InputOptionContent` horizontal padding from 8px to 12px

## 2.0.1

### Patch Changes

- 157146b5c: Adds back `display:block` property, which was removed in style updates.

## 2.0.0

### Major Changes

- cfa830701: ### API changes

  - Renames `selected` prop to `checked` (this is done to avoid confusion with the `aria-selected` attribute, which is conditionally applied via the `highlighted` prop)
  - `checked` applies the `aria-checked` attribute
  - Note: `checked` _does not_ apply any styles. Any "checked" styles must be applied by the consuming component (this is consistent with previous behavior)
  - Adds `preserveIconSpace` prop to `InputOptionContent` to determine whether menu items should preserve space for a left glyph, or left align all text content. Use this prop in menus where some items may or may not have icons/glyphs, in order to keep text across menu items aligned.
  - Extends `AriaLabelPropsWithChildren` in `InputOptionProps`
    - [`AriaLabelPropsWithChildren`](../packages/a11y/src/AriaLabelProps.ts) allows a component to accept any of `aria-label`, `aria-labelledby` or `children` as sufficient text for screen-reader accessibility

  ### Styling changes

  - Updates `InputOption` and `InputOptionContent` styles to use updated `color` and `spacing` tokens
  - Exports `inputOptionClassName`, and `inputOptionContentClassName`.

  #### Spacing overview

  - block padding: 8px
  - inline padding: 12px
  - icon/text/chevron gap: 8px
  - label & description font-size: 13px
  - label & description line-height: 16px

  #### Colors overview

  - Left & right icon color: `color.[theme].icon.primary` tokens
  - Label & Description: use default `Label` & `Description` colors from `typography`
  - Background uses `color[theme].background.primary` tokens (including hover & focus states)
  - Wedge uses `palette.blue.base` for all modes
  - The `highlight` prop uses the `.focus` state color for Icon, Text & Background colors

  ### Internal updates

  - Establishes internal `InputOptionContext` to track `disabled`, `highlighted`, & `checked` attributes.

### Patch Changes

- cfa830701: Updates minimum wedge height from 16px to 24px
- cfa830701: Fixes a bug to prevent a highlighted disabled option title from changing text color.
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [db2d1d12c]
  - @leafygreen-ui/lib@13.6.1
  - @leafygreen-ui/a11y@1.5.0
  - @leafygreen-ui/typography@19.2.1

## 1.1.4

### Patch Changes

- Updated dependencies [4fb369df7]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/typography@19.2.0
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/tokens@2.9.0

## 1.1.3

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0

## 1.1.2

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/a11y@1.4.13
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/polymorphic@1.3.7
  - @leafygreen-ui/tokens@2.5.2

## 1.1.1

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1

## 1.1.0

### Minor Changes

- ffd11f24: Renders `aria-disabled` attribute when `disabled` is provided

### Patch Changes

- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/leafygreen-provider@3.1.11
  - @leafygreen-ui/a11y@1.4.12
  - @leafygreen-ui/lib@13.2.0
  - @leafygreen-ui/typography@18.1.0

## 1.0.13

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 1.0.12

### Patch Changes

- c5d95794: Exports `descriptionClassName` and adds `font-size: inherit;` to input descriptions.
- Updated dependencies [324d9730]
  - @leafygreen-ui/typography@17.0.2

## 1.0.11

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/typography@17.0.1

## 1.0.10

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## 1.0.9

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/polymorphic@1.3.6
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 1.0.8

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/polymorphic@1.3.5
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 1.0.7

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/a11y@1.4.6
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/polymorphic@1.3.4
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 1.0.6

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/polymorphic@1.3.3
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/lib@10.4.1

## 1.0.5

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 1.0.4

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/polymorphic@1.3.2
  - @leafygreen-ui/typography@16.5.0

## 1.0.3

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- 77320a6b8: Adds optional component `InputOptionContent` which adds predefined content styles
- ce0fcb3f6: Excludes `children` from story controls
- Updated dependencies [55d33e435]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/tokens@2.0.3

## 1.0.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/polymorphic@1.3.1
  - @leafygreen-ui/tokens@2.0.2

## 1.0.1

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [b9841decc]
- Updated dependencies [26e341a0b]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/polymorphic@1.2.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/tokens@2.0.1

## 1.0.0

### Major Changes

- ec2a3d66d: Creates an internal InputOption component, to share styles and functionality between various components like Combobox, Select, SearchInput and Menu

### Patch Changes

- Updated dependencies [0541bd776]
- Updated dependencies [ec2a3d66d]
  - @leafygreen-ui/lib@10.2.0
