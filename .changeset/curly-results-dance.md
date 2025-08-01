---
'@leafygreen-ui/code-editor': minor
---

**Performance**: Reduce bundle size by 31% (from ~610KB to ~422KB) through lazy module loading architecture

- **New lazy loading system**: Introduced `useModuleLoaders()` and `useLazyModules()` hooks for dynamic, type-safe module importing based on editor configuration
- **Architecture migration**: Replaced `@uiw/react-codemirror` wrapper with native CodeMirror v6 packages for granular control over module loading
- **Extension hooks library**: Added reusable CodeMirror extension hooks (`useLanguageExtension`, `useThemeExtension`, etc.) that can be used by consumers
- **Conditional loading**: Language-specific modules and core extensions now load only when needed based on enabled features
- **Testing updates**: Enhanced test utilities to handle asynchronous editor initialization
- **Dependencies**: Added `@leafygreen-ui/typography` for improved loading state presentation

This change maintains full API compatibility while significantly improving bundle performance through smarter module loading.
