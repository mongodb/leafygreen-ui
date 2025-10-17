---
'@leafygreen-ui/loading-indicator': major
---

[LG-4735](https://jira.mongodb.org/browse/LG-4735)

The `Spinner` component has been re-written as a lightweight SVG-based spinning loading indicator component, to eliminate the use of Lottie player (a heavy run-time animation library). 
Importing `Spinner` component from the package root is not recommended, since this will also bundle the heavy `PageLoader` component, which still uses Lottie player. 

For simple loading spinners, prefer importing the spinner directly from  `@leafygreen-ui/loading-indicator/spinner`

Prop changes:
- Replaces `displayOption` (and `sizeOverride`) prop with a single `size` prop. The size mapping has also been updated to reflect the Figma spec. 
```
Size.XSmall: 16px;
Size.Small: 24px;
Size.Default: 48px;
Size.Large: 64px;
```
Run the codemod to auto-update this prop change 
```bash
lg codemod loading-spinner-v5
```

- Removes `baseFontSize` prop
- Removes the explicit `description` prop. 
These props will be _removed_ by the codemod, but the description will only be converted to a comment, and must be updated  manually.
To add a description to the spinner, use the `Description` component from `@leafygreen-ui/typography` directly.
```tsx
<div>
  <Spinner size="default" />
  <Description>Loading...</Description>
</div>
```
