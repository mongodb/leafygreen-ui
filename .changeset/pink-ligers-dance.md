---
'@leafygreen-ui/icon': minor
---

Updates `createIconComponent` to pass through `size` prop on custom glyphs. 

e.g.
```jsx
  import { createIconComponent } from '@leafygreen-ui/icon'

  const myIcon = ({size}) => <svg height={size} width={size}> ... </svg>

  const MyCustomIcon = createIconComponent({myIcon})

  return (
    <MyCustomIcon glyph="myIcon" size={large} />
  )
```
