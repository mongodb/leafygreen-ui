# @leafygreen-ui/descendants

## 0.3.0

### Minor Changes

- cfa830701: Adds & exports `getDescendantById` & `getDescendantByIndex` utilities

### Patch Changes

- cfa830701: Updates Descendant index properties after inserting & removing to ensure the index of the Descendant object matches the index within the Descendants list

## 0.2.0

### Minor Changes

- 659aa9eed: Adds `getDescendants` accessor function, returned from `useInitDescendants`. Use this method when referencing descendants from withing effects/callbacks where the `descendants` object may have updated, and could be stale.

## 0.1.1

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/hooks@8.1.3
