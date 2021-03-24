# Portal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/portal.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/portal/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/portal
```

### NPM

```shell
npm install @leafygreen-ui/portal
```

## Example

```js
import Portal from '@leafygreen-ui/portal';

<Portal>
  <div>
    Portals transport their children to a div that is appended to the end of the
    document.body to or a node that can be specified with a container prop.
  </div>
</Portal>;
```

**Output HTML**

```html
<div>
  <div class="leafygreen-ui-xi606m">
    Portals transport their children to a div that is appended to the end of the
    document.body to or a node that can be specified with a container prop.
  </div>
</div>
```

## Properties

| Prop        | Type       | Description                                                                                                                                                               | Default                         |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `container` | `DOM Node` | Sets the container node, which will contain all of the portaled content. If no container is supplied, a div will be created and apened to the end of the `document.body`. | `document.createElement('div')` |
| `children`  | `node`     | The children will be rendered inside of the portaled container.                                                                                                           |                                 |
