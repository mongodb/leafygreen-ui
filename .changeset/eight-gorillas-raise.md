---
'@leafygreen-ui/icon': minor
---

Exports `createGlyphComponent` from the package. This provides a way to ensure parity between built-in icons and custom icons. By processing an icon with `createGlyphComponent`, consumers can ensure that props like `size`, `fill` and `role` behave as expected in both custom and default icons.

e.g.
```js
  import { createGlyphComponent, Size} from '@leafygreen-ui/icon'

  const myIconGlyph = createGlyphComponent('myIconName', (props) => <svg {...props} />)

  const MyIconComponent = createIconComponent({
    myIconName: myIconGlyph 
  })

  return (
    <MyIconComponent
      glyph="myIconName"
      size={Size.Large} 
      role="presentation"
    />
  )
```

