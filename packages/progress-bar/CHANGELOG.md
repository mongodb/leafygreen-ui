# @leafygreen-ui/progress-bar

## 1.0.3

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- 6f30c55: Updates ProgressBar `useScreenReaderAnnouncer` to deterministically return a consistent status message (primarily a concern in React 17 strict mode)
- Updated dependencies [1a5c69f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/hooks@9.1.4
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3
  - @leafygreen-ui/a11y@3.0.5

## 1.0.2

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/a11y@3.0.4
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/hooks@9.1.3
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2
  - @lg-tools/test-harnesses@0.3.4

## 1.0.1

### Patch Changes

- 6068faa: - properly propagate `darkMode` downwards from any providers or context wrapped around the `ProgressBar` component
- Updated dependencies [a638649]
- Updated dependencies [13a2ac4]
  - @leafygreen-ui/tokens@3.2.1
  - @leafygreen-ui/icon@14.2.0

## 1.0.0

### Major Changes

- 7a01501: Official release of @leafygreen-ui/progress-bar.
