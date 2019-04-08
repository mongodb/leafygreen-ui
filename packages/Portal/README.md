# Portal 

## Example 
```js 
  <Portal container={document.getElementById('root')}>
    <div>
      Portals transport their children to a div that is appended to
      the end of the document.body to or a node that
      can be specified with a container prop.
    </div>
  </Portal>
```

**Output HTML**
```HTML 
  <div id="root">
    <div class="leafygreen-ui-xi606m">
      Portals transport their children to a div that is appended to the end of the document.body to or a node that can be specified with a container prop.
    </div>
  </div>
```

## Properties

### container

**Type:** `DOM Node`

**Default:** `document.createElement('div')`

Sets the container node, which will contain all of the portaled content. If no container is supplied, a div will be created and appened to the end of the `document.body`. 

### children 

**Type:** `Node`

**Default:** `null`

The children will be rendered inside of the portaled container.
