# @leafygreen-ui/modal

## 3.0.2

### Patch Changes

- fabc1c9: Conditionally enable `useEscapeKey` hook, to ensure that escapeKey events are not unintentionally blocked from propagating
- 232cf52: React-transition-group now dependency instead of peer dependency
- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/icon@4.0.0
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- 69792b8: Make react-transition-group an external dependency of the build
- Updated dependencies [11b2217]
- Updated dependencies [8fd107a]
  - @leafygreen-ui/lib@4.1.0
  - @leafygreen-ui/icon@3.0.1

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/icon@3.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0
  - @leafygreen-ui/portal@2.0.0

## 2.0.0

### Major Changes

- b04a66f: Move className prop to apply to root `div` rather than content `div`, and add contentClassName to style overlay container. Where using `className` currently, should update to `contentClassName`.

## 1.2.3

### Patch Changes

- 50853ca: Upgrade dependencies

## 1.2.2

- Updated dependencies [563dc2e]:
  - @leafygreen-ui/portal@1.1.7

## 1.2.1

### Patch Changes

- 725e0f3: Add `title` prop to Icon component, to make purpose more clear to screenreaders
- 4de039a: Further accessibility updates to make components compliant with a11y standards
- 3a24668: Replaced existing Escape handling with new useEscapeKey hook

## 1.2.0

### Minor Changes

- 27381f6: Modal content can receive focus

## 1.1.1

- Updated dependencies [eb49b56]:
  - @leafygreen-ui/icon@2.0.0
