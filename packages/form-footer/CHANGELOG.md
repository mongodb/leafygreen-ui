# @leafygreen-ui/form-footer

## 4.0.0

### Major Changes

- 9ef03272: - Updates `data-testid` on `<footer>` from `lg-form_footer-footer` to `lg-form_footer`.
  - Adds `primaryButtonProps`. This prop is an object that accepts all `Button` props but `variant` is limited to `primary` and `danger`.
  - Prop `primaryButton` is marked as `deprecated`. Please transition to `primaryButtonProps`.
  - Removes `cancelButtonText`. Use `cancelButtonProps` and pass the `children` property.
    ```js
    cancelButtonProps: {
      {
        children: 'hi';
      }
    }
    ```
  - Removes `onCancel`. Use `cancelButtonProps` and pass the `onClick` property.
    ```js
    cancelButtonProps: {
      {
        onClick: () => {};
      }
    }
    ```
  - Removes `backButtonText`. Use `backButtonProps` and pass the `children` property.
    ```js
    backButtonProps: {
      {
        children: 'hi';
      }
    }
    ```
  - Removes `onBackClick`. Use `backButtonProps` and pass the `onClick` property.
    ```js
    backButtonProps: {
      {
        onClick: () => {};
      }
    }
    ```

### Patch Changes

- Updated dependencies [ae44834e]
  - @leafygreen-ui/icon@12.4.0

## 3.1.4

### Patch Changes

- Updated dependencies [24ee033c]
  - @leafygreen-ui/banner@8.0.0

## 3.1.3

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/button@21.1.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/banner@7.0.20
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/palette@4.0.9

## 3.1.2

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/banner@7.0.19

## 3.1.1

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [e487fb24]
  - @leafygreen-ui/icon@11.29.1

## 3.1.0

### Minor Changes

- 5a9bf08a: Adds `cancelButtonProps` and `backButtonProps` to `FormFooter` component for customizing buttons.
  Marks `cancelButtonText`, `onCancel`, `backButtonText`, and `onBackClick` props as deprecated.
  [LG-3685](https://jira.mongodb.org/browse/LG-3685)

### Patch Changes

- Updated dependencies [8142d306]
  - @leafygreen-ui/icon@11.29.0

## 3.0.16

### Patch Changes

- 9e7d74b0: Adds `data-testids` to subcomponents of FormFooter

## 3.0.15

### Patch Changes

- Updated dependencies [dd4f3da8]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/banner@7.0.16
  - @leafygreen-ui/button@21.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 3.0.14

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/banner@7.0.15
  - @leafygreen-ui/button@21.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.9

## 3.0.13

### Patch Changes

- 4fcf2e94: Updates `PrimaryButton` type from `React.ReactChild` to `React.ReactElement`.
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/banner@7.0.13
  - @leafygreen-ui/button@21.0.5
  - @leafygreen-ui/leafygreen-provider@3.1.7

## 3.0.12

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/banner@7.0.12
  - @leafygreen-ui/button@21.0.3
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7

## 3.0.11

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/banner@7.0.11
  - @leafygreen-ui/button@21.0.2
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6

## 3.0.10

### Patch Changes

- Updated dependencies [cfba537d]
  - @leafygreen-ui/button@21.0.0

## 3.0.9

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/banner@7.0.10
  - @leafygreen-ui/button@20.3.1
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 3.0.8

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/button@20.2.1
  - @leafygreen-ui/banner@7.0.9

## 3.0.7

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1

## 3.0.6

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
- Updated dependencies [0cd471676]
- Updated dependencies [2dfc4d0ea]
  - @leafygreen-ui/banner@7.0.8
  - @leafygreen-ui/button@20.1.0
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4

## 3.0.5

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/banner@7.0.5
  - @leafygreen-ui/button@20.0.4
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3

## 3.0.4

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/banner@7.0.4
  - @leafygreen-ui/button@20.0.2

## 3.0.3

### Patch Changes

- Updated dependencies [1cff328a3]
- Updated dependencies [bf2fedf6d]
  - @leafygreen-ui/button@20.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.1

## 3.0.2

### Patch Changes

- 64eee134d: TSDoc: Updates some exported TSDoc interfaces. Storybook: Updates story files.
- Updated dependencies [64eee134d]
- Updated dependencies [64eee134d]
  - @leafygreen-ui/banner@7.0.3
  - @leafygreen-ui/lib@10.1.0

## 3.0.1

### Patch Changes

- ed0e425e5: Adds `polished` as an explicit dependency
- Updated dependencies [ed0e425e5]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [1a335d0b2]
- Updated dependencies [5e3959eb9]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/button@19.0.1
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/banner@7.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/banner@7.0.0
  - @leafygreen-ui/button@19.0.0

## 2.0.1

### Patch Changes

- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/button@18.0.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/banner@6.0.1
  - @leafygreen-ui/leafygreen-provider@3.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [0b6435fa]
- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/button@17.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/banner@6.0.0

## 1.0.2

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/banner@5.0.2
  - @leafygreen-ui/button@16.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4

## 1.0.1

### Patch Changes

- 3690df49: Makes `primaryButton` prop required
- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/button@16.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/banner@5.0.1
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3

## 1.0.0

### Major Changes

- e39d8469: Updates `FormFooter` for dark mode brand refresh.

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- 80d0c7bf: Spreads `...rest` props onto the internal `footer` element
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/banner@5.0.0
  - @leafygreen-ui/button@16.0.3
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2

## 0.10.3

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/button@16.0.0

## 0.10.2

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [fd2f6de0]
- Updated dependencies [422dbfcd]
- Updated dependencies [8d12b918]
- Updated dependencies [86a7f3c3]
  - @leafygreen-ui/banner@4.0.1
  - @leafygreen-ui/button@15.0.2
  - @leafygreen-ui/lib@9.3.0

## 0.10.1

### Patch Changes

- 4904e7db: Updating dependency versions on form footer
- Updated dependencies [3a14d852]
  - @leafygreen-ui/button@15.0.0

## 0.10.0

### Minor Changes

- ffd347c9: Cancel button is no longer displayed when the cancelButtonText prop is not set. Minor style updates.

### Patch Changes

- Updated dependencies [f3aad7e2]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [c1f9c4d4]
  - @leafygreen-ui/button@13.0.1
  - @leafygreen-ui/lib@9.2.1
