---
'@leafygreen-ui/tokens': minor
---

Creates scrollbar color tokens and `addScrollbarStyles`


#### `scrollbarColor`
Use the `scrollbar-color` CSS property to set the colors of the scrollbar thumb and track.
For Safari, use the `-webkit-scrollbar-thumb` and `-webkit-scrollbar-track` pseudo-elements.

Usage:

```tsx
import { scrollbarColor } from '@leafygreen-ui/tokens'

css`
  scrollbar-color: ${scrollbarColor[theme].thumb.primary.default} ${scrollbarColor[theme].track.primary.default};
  &::-webkit-scrollbar-thumb {
    background-color: ${scrollbarColor[theme].thumb.primary.default};
  }
  &::-webkit-scrollbar-track {
   background-color: ${scrollbarColor[theme].track.primary.default};
  }
`
```

#### `addScrollbarStyles`

A utility for quickly adding the above styles for a particular theme & variant.

```tsx
import { addScrollbarStyles } from '@leafygreen-ui/tokens'

css`
  ${addScrollbarStyles({theme, variant})};
`

```