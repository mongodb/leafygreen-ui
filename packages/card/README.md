# Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/card.svg)

## Example

```Javascript
import Card from '@leafygreen-ui/card';

<Card
  as='div'
  className='card-styles'
>
  This is my card component
</Card>
```

**Output HTML**

```HTML
 <div class="leafygreen-ui-1xf4bcx">This is a card component</div>
```

## Properties

### className

**Type:** `string`

**Default:** `''`

Adds a className to the class attribute.

### children

**Type:** `node`

**Default:** `null`

The children of the rendered `Card` component.

### as

**Type:** `HTML Tag` or `React Element`

**Default:** `section`

Determines the root element. For example, `Link` or `a` tags can be supplied to replace `div` from being the DOM element that wraps the component.

#### Any other properties will be spread on the input element.
