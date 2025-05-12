---
'@leafygreen-ui/code': major
'@leafygreen-ui/gallery-indicator': major
'@leafygreen-ui/select': major
'@leafygreen-ui/table': major
'@leafygreen-ui/tabs': major
'@leafygreen-ui/text-area': major
'@leafygreen-ui/text-input': major
'@leafygreen-ui/toggle': major
---
Adds code splitting for test utilities
- Adds `/testing` entry point
- Removes `getTestUtils` from main bundle entry point

When using the component, testing utilities won't be included into your final bundle
```tsx
// App.tsx
import { Component } from `@leafygreen-ui/<package>`
```

Testing utilities (and their dependencies) will only be imported if you import them explicitly
```tsx
import { getTestUtils } from `@leafygreen-ui/<package>/testing`
```
