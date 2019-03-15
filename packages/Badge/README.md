# Badge

## Example
``` Javascript
<Badge
  variant='lightBlue'
  className='my-badge'
>
  New
</Badge>
```

**Output HTML**
```HTML
  <span class="leafygreen-ui-rhgfxf my-badge">New</span>
```


## Properties

### variant

**Type:** `string`

**Default:** `'default'`

Sets the style variant of the badge. Valid variants for badges are `'default'`, `'danger'`, `'warning'`, `'darkBlue'`, `'lightBlue'`, `'primary'`, `'outline'`, and `'dark'`.


### className

**Type:** `string`

**Default:** `''`

Adds a className to the class attribute.

### children

**Type:** `node`

**Default:** `null`

The content that will appear inside of the  `<Badge />` component.



### Custom Properties
You can use any custom properties and they will be spread against the root node. Specifying the `onClick` attribute will change the cursor style to pointer. 
