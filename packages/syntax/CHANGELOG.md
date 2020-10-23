# @leafygreen-ui/syntax

## 6.1.0

### Minor Changes

- 2643d4e7: Adds support for `xml` language

### Patch Changes

- Updated dependencies [5cf0c95c]
  - @leafygreen-ui/lib@6.1.0

## 6.0.1

### Patch Changes

- f56f5ab1: Fixes an issue where line highlighting might not span the entire component.
- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
- Updated dependencies [059ef833]
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/tokens@0.5.0

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/tokens@0.4.0

## 5.0.0

### Major Changes

- 50ea11ad: - Adds the line highlighting feature! This feature is supported through the `highlightLines` prop.
  - All code examples are now rendered as a table, making unhighlighted code render consistently with highlighted code.
  - Fixes an issue where users might be unable to manually copy code.

### Patch Changes

- 50ea11ad: Fixes issue where the Code and Syntax components would break when passed code with invalid syntax"

## 4.0.0

### Major Changes

- 729c79f8: Deprecates `variant` prop in favor of `darkMode` prop to control whether or not the component will appear in dark mode

## 3.1.0

### Minor Changes

- fe371e37: Adds `js` alias for JavaScript and `ts` alias for TypeScript

## 3.0.2

### Patch Changes

- f792966: Explicitly sets `font-family` for syntax component to `Source Code Pro`
- Updated dependencies [f792966]
  - @leafygreen-ui/tokens@0.3.0

## 3.0.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 3.0.0

### Major Changes

- 7373e7b: Updates Syntax component to use the Highlight.js plugin API to render syntax.

  This helps in a couple ways:

  - Lets us remove the only instance of `dangerouslySetInnerHTML` within LeafyGreen UI by rendering syntax highlighting through React directly.
  - Allows us to render the component's content as a Table. This allows us to fix an alignment issue between line numbers and wrapped text, as well as opens the door for future features.

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 2.8.0

### Minor Changes

- f558fef: Added syntax highlighting support for diffs

## 2.7.0

### Minor Changes

- e4d7ca4: Support 'csharp' in the language prop as a valid alternative to 'cs' for C# highlighting

## 2.6.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 2.6.0

### Minor Changes

- 9c34e9f: Adds 'rust' and 'ini' as supported syntaxes.

### Patch Changes

- Updated dependencies [75c0693]
  - @leafygreen-ui/palette@2.0.1

## 2.5.0

### Minor Changes

- beccf70: Adds Objective-C language highlight support

## 2.4.0

### Minor Changes

- f2fed7c: Code component styling updates

## 2.3.0

### Minor Changes

- c117a62: Adds support for Kotlin syntax highlighting

## 2.2.0

### Minor Changes

- 130919a: Adds support for GraphQL syntax highlighting

### Patch Changes

- Updated dependencies [6eb9d26]
  - @leafygreen-ui/lib@4.3.0

## 2.1.0

### Minor Changes

- db8a89a: Adds support for Swift syntax highlighting

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0
