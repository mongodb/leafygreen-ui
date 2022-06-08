# @leafygreen-ui/code

## 11.0.1

### Patch Changes

- fd2f6de0: Updates to TSDocs, PropTypes, and Storybook files
- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
- Updated dependencies [6792bc44]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/icon-button@11.0.2
  - @leafygreen-ui/select@5.0.2
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 11.0.0

### Major Changes

- e13d2487: Moving leafygreen-provider to peerDependencies.
- Updated dependencies [500d6c60]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- 91e24dfe: Add `container` to copyable.js instance to help keep focus inside of a modal
- Updated dependencies [e13d2487]
- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/icon-button@11.0.0
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/icon@11.9.0
  - @leafygreen-ui/select@5.0.0

## 10.0.0

### Major Changes

- ab1fd9e: Updates Code to allign with visual brand update
  - Removes fixed width when Language picker is shown (`width` was formerly set to a static `700px`)

### Patch Changes

- Updated dependencies [ab1fd9e]
  - @leafygreen-ui/icon-button@10.0.0

## 9.5.0

### Minor Changes

- 1067fe9: Add support to specify starting value for line numbering.

## 9.4.0

### Minor Changes

- 548ca2c: Adds support for controlling the language switcher popover characteristics with `usePortal`, `portalClassName`, `portalContainer`, `scrollContainer`, and `popoverZIndex` props.
- 548ca2c: Add support for Dart language

## 9.3.0

### Minor Changes

- 70f3c2c: Add support for custom action buttons in the code component

### Patch Changes

- Updated dependencies [70f3c2c]
- Updated dependencies [70f3c2c]
  - @leafygreen-ui/hooks@7.1.1
  - @leafygreen-ui/select@3.1.0

## 9.2.0

### Minor Changes

- 2a945c7a: Adds support for Java `.properties` files

### Patch Changes

- Updated dependencies [d4a46e27]
- Updated dependencies [cec710ad]
  - @leafygreen-ui/icon@11.6.0
  - @leafygreen-ui/lib@9.0.1
  - @leafygreen-ui/select@3.0.7

## 9.1.0

### Minor Changes

- a30caf8f: Removes `clike` language support in Code component (previously removed by `highlight.js`)

## 9.0.0

### Major Changes

- 3c2fdcde: Upgrades `highlight.js` dependency from v10 to v11. This update will cause some syntax highlighting styles to change from previous versions of the Code component.

### Patch Changes

- Updated dependencies [cd4f9a27]
  - @leafygreen-ui/select@3.0.6

## 8.1.6

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/a11y@1.2.2
  - @leafygreen-ui/icon-button@9.1.6
  - @leafygreen-ui/select@3.0.5
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/tokens@0.5.3

## 8.1.5

### Patch Changes

- Updated dependencies [e1af3278]
- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
- Updated dependencies [e1af3278]
  - @leafygreen-ui/icon-button@9.1.5
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/select@3.0.3
  - @leafygreen-ui/a11y@1.2.1
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/tokens@0.5.2

## 8.1.4

### Patch Changes

- 74ffc369: Announces "copied" to screenreaders when text is copied
- Updated dependencies [1ffbb84c]
  - @leafygreen-ui/select@3.0.2

## 8.1.3

### Patch Changes

- Updated dependencies [faeb0ce0]
- Updated dependencies [650f6334]
  - @leafygreen-ui/icon@11.0.0
  - @leafygreen-ui/select@3.0.1

## 8.1.2

### Patch Changes

- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
  - @leafygreen-ui/leafygreen-provider@2.1.0
  - @leafygreen-ui/select@3.0.0

## 8.1.1

### Patch Changes

- 909ede70: Removes empty panel rendered when copyable is false

## 8.1.0

### Minor Changes

- 55ccd908: Adds ability for Code component to be rendered with a language switcher

### Patch Changes

- Updated dependencies [559ceb15]
  - @leafygreen-ui/select@2.1.0

## 8.0.9

### Patch Changes

- Updated dependencies [90321b36]
- Updated dependencies [90321b36]
  - @leafygreen-ui/icon-button@9.1.3
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/icon@10.2.1
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/tokens@0.5.1

## 8.0.8

### Patch Changes

- Updated dependencies [99ea9436]
- Updated dependencies [ec27f36e]
  - @leafygreen-ui/icon-button@9.1.2
  - @leafygreen-ui/icon@10.0.0

## 8.0.7

### Patch Changes

- 16b902b5: Provides callback to sort() function in renderingPlugin to ensure that line numbers are being properly sorted before determining whether or not to highlight a line.

## 8.0.6

### Patch Changes

- b905c17d: Fixes issue where sublanguages like JSX would not render.

## 8.0.5

### Patch Changes

- 63a6c2f6: - Fixes issue where many applications had global styles for pre tags that added a second border and border radius to the pre element.
  - Fixes issue where code examples would be detected as multi-line when a single line example has preceding or subsequent new line characters.

## 8.0.4

### Patch Changes

- 717c7023: Fix issue where border wouldn't stretch the full height of the component with a wrapping, single line code example.

## 8.0.3

### Patch Changes

- Updated dependencies [f805b772]
  - @leafygreen-ui/icon@9.0.0

## 8.0.2

### Patch Changes

- a85c6d8d: Prevent default behavior when copy button is clicked to prevent accidental form submissions.
- Updated dependencies [bf8b83e1]
  - @leafygreen-ui/icon@8.0.1

## 8.0.1

### Patch Changes

- Updated dependencies [ba56b1cc]
  - @leafygreen-ui/icon@8.0.0

## 8.0.0

### Major Changes

- 4f3f7b9f: Fixes various bugs, makes accessibility improvements, tweaks the design, and improves maintainability of the `Code` component.

  Design changes:

  - Updates the syntax highlighting theme to improve contrast between comments and regular code, as well as making several optimizations for red-green colorblindness.
  - Tightens the top and bottom padding for the code component, especially for single line code examples.
  - Significantly tightens the left padding when line numbers are shown.
  - Right-aligns line numbers in their column to improve readability.

  Bug fixes:

  - Fixes an issue where iOS browsers would render code examples at a `20px` size, rather than the `13px` font size they're supposed to render as.
  - Sometimes code that's written as multi-line statements wouldn't have line numbers applied to each line of the statement. That should now be fixed.
  - Fixes an issue where line highlight gradients in dark mode in Safari would render multiple gradients when line numbers were shown.

  Under the hood updates:

  - Removes the Syntax component. This component was extremely tightly coupled with the code component to a point where it wasn't a feasible component when used independently. All functionality is now self-contained within the Code component code.
  - Line highlighting definitions written with tuples expressing ranges are no longer expanded, making for a more efficient implementation, and allowing us to remove an arbitrary restriction on the number of lines possible to highlight.
  - Tokens can now have multiple classNames expressing their "kind", allowing for more precise code highlighting.

### Patch Changes

- Updated dependencies [7df69248]
  - @leafygreen-ui/lib@6.2.0

## 7.3.1

### Patch Changes

- aae1e47e: Adds component to browser's Tab order when scrollable so those navigating via keyboard are able to scroll and view content appropriately

## 7.3.0

### Minor Changes

- c18f16e6: Improves compatibility with React v17

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/lib@6.1.1

## 7.2.0

### Minor Changes

- 611012de: Adds support for `http` language

### Patch Changes

- Updated dependencies [611012de]
  - @leafygreen-ui/syntax@6.2.0

## 7.1.0

### Minor Changes

- 2643d4e7: Adds support for `xml` language

### Patch Changes

- Updated dependencies [5cf0c95c]
- Updated dependencies [2643d4e7]
  - @leafygreen-ui/lib@6.1.0
  - @leafygreen-ui/syntax@6.1.0

## 7.0.1

### Patch Changes

- f56f5ab1: Fixes an issue where line highlighting might not span the entire component.
- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [f56f5ab1]
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/syntax@6.0.1
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/icon@7.0.1
  - @leafygreen-ui/icon-button@9.0.1
  - @leafygreen-ui/lib@6.0.1

## 7.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/icon-button@9.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/syntax@6.0.0

## 6.0.0

### Major Changes

- 50ea11ad: Deprecates the `multiline` prop in the Code component. Single line code examples are now detected automatically via the presence of line breaks in the string, and single line spacing is applied automatically.
- 50ea11ad: - Adds the line highlighting feature! This feature is supported through the `highlightLines` prop.
  - All code examples are now rendered as a table, making unhighlighted code render consistently with highlighted code.
  - Fixes an issue where users might be unable to manually copy code.

### Patch Changes

- 50ea11ad: Fixes issue where the Code and Syntax components would break when passed code with invalid syntax"
- Updated dependencies [65d5ed4d]
- Updated dependencies [50ea11ad]
- Updated dependencies [50ea11ad]
  - @leafygreen-ui/icon@6.7.0
  - @leafygreen-ui/syntax@5.0.0
  - @leafygreen-ui/icon-button@8.0.2

## 5.0.0

### Major Changes

- 729c79f8: Deprecates `variant` prop in favor of `darkMode` prop to control whether or not the component will appear in dark mode

### Patch Changes

- Updated dependencies [729c79f8]
  - @leafygreen-ui/syntax@4.0.0

## 4.0.4

### Patch Changes

- Updated dependencies [fe371e37]
- Updated dependencies [a84219f1]
  - @leafygreen-ui/syntax@3.1.0
  - @leafygreen-ui/icon-button@8.0.0

## 4.0.3

### Patch Changes

- e599707: Require lodash dependencies instead of inlining them.
- 8c867bb: Reduces server side effect warnings
- Updated dependencies [e49d66b]
- Updated dependencies [e599707]
- Updated dependencies [8c867bb]
  - @leafygreen-ui/icon@6.5.0
  - @leafygreen-ui/hooks@4.2.0
  - @leafygreen-ui/icon-button@7.0.5

## 4.0.2

### Patch Changes

- Updated dependencies [ab4c074]
  - @leafygreen-ui/icon-button@7.0.0

## 4.0.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/icon-button@6.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/syntax@3.0.1

## 4.0.0

### Major Changes

- 7373e7b: Updates Syntax component to use the Highlight.js plugin API to render syntax.

  This helps in a couple ways:

  - Lets us remove the only instance of `dangerouslySetInnerHTML` within LeafyGreen UI by rendering syntax highlighting through React directly.
  - Allows us to render the component's content as a Table. This allows us to fix an alignment issue between line numbers and wrapped text, as well as opens the door for future features.

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
- Updated dependencies [7373e7b]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/syntax@3.0.0
  - @leafygreen-ui/icon-button@6.1.2

## 3.5.0

### Minor Changes

- 6233a34: Adds `onCopy` callback, invoked when copy button is clicked

## 3.4.6

### Patch Changes

- Updated dependencies [1d86d56]
- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0
  - @leafygreen-ui/icon-button@6.0.0

## 3.4.5

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0
  - @leafygreen-ui/icon-button@5.0.4

## 3.4.4

### Patch Changes

- cf6167e: Build and consume individual glyph components
- Updated dependencies [2fc4ef9]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0
  - @leafygreen-ui/icon-button@5.0.3

## 3.4.3

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
- Updated dependencies [9c34e9f]
  - @leafygreen-ui/icon@5.0.3
  - @leafygreen-ui/syntax@2.6.0
  - @leafygreen-ui/icon-button@5.0.1

## 3.4.2

### Patch Changes

- Updated dependencies [5aafd72]
  - @leafygreen-ui/icon-button@5.0.0
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1

## 3.4.1

### Patch Changes

- Updated dependencies [4c268a5]
  - @leafygreen-ui/icon@5.0.0
  - @leafygreen-ui/icon-button@4.1.5

## 3.4.0

### Minor Changes

- beccf70: Adds Objective-C language highlight support

### Patch Changes

- Updated dependencies [e1568c6]
- Updated dependencies [beccf70]
  - @leafygreen-ui/icon@4.3.0
  - @leafygreen-ui/syntax@2.5.0
  - @leafygreen-ui/icon-button@4.1.4

## 3.3.0

### Minor Changes

- f2fed7c: Adds copy functionality to Code component

### Patch Changes

- Updated dependencies [f2fed7c]
  - @leafygreen-ui/syntax@2.4.0

## 3.2.0

### Minor Changes

- c117a62: Enables Kotlin language support

### Patch Changes

- Updated dependencies [c117a62]
  - @leafygreen-ui/syntax@2.3.0

## 3.1.0

### Minor Changes

- a0d0d7b: Enables Swift language support

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/syntax@2.0.0
