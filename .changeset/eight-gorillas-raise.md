---
'@leafygreen-ui/icon': minor
---

Exports `createGlyphComponent` from the package. 
Use this to ensure any custom glyphs behave the same as build in Leafygreen icons.

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

