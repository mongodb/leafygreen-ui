---
'@leafygreen-ui/icon': minor
---

Updates `createIconComponent` to handle both number and string values passed to the `size` prop on custom glyphs. 

e.g.
```jsx
  import { createIconComponent, Size} from '@leafygreen-ui/icon'

  const myIcon = ({size}) => <svg height={size} width={size}> ... </svg>

  const MyCustomIcon = createIconComponent({myIcon})

  return (
    <MyCustomIcon glyph="myIcon" size={Size.Large} />
  )
```
