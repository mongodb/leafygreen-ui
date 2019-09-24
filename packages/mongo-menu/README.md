# MongoMenu

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/mongo-menu.svg)

## Example

```js
<MongoMenu
  user={{
    name: text('name', 'Alex Smith'),
    email: text('email', 'alex.smith@mongodb.com'),
  }}
  activeProduct="Atlas"
/>
```

## Output HTML

```html
<button class="leafygreen-ui-ces1qx">
  <div class="leafygreen-ui-3ya065">
    <span class="leafygreen-ui-30ehe9">Alex Smith</span>
    <svg
      width="16"
      height="16"
      role="img"
      viewBox="0 0 16 16"
      data-leafygreen-ui="icon-ref"
      class="leafygreen-ui-3khtt"
    >
      <title>Caret Up Icon</title>
      <path
        d="M11.327 10H4.673c-.598 0-.898-.775-.475-1.227L7.525 5.21a.638.638 0 01.948 0l3.33 3.562c.422.452.122 1.227-.476 1.227z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  </div>
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div>
  <div class="leafygreen-ui-1hfv1rt">
    <div class="leafygreen-ui-3aunlx" role="menu">
      <section
        data-leafygreen-ui="menu-group-section"
        class="leafygreen-ui-a2kf98"
      >
        <h3 class="leafygreen-ui-i2e27j">Alex Smith</h3>
        <p class="leafygreen-ui-1jozpc5">alex.smith@mongodb.com</p>
        <a
          href="https://account.mongodb.com"
          class="leafygreen-ui-1q7ajb0"
          aria-disabled="false"
        >
          <span class="leafygreen-ui-r6z5ec">MongoDB Account</span>
        </a>
      </section>
      <section data-leafygreen-ui="menu-group-section">
        <a
          data-leafygreen-ui="menu-item-container"
          class="leafygreen-ui-ucjlf9"
          role="menuitem"
          aria-disabled="false"
          href="https://cloud.mongodb.com"
        >
          <div class="leafygreen-ui-imu641">Atlas</div>
          <div class="leafygreen-ui-1gm050l">cloud.mongodb.com</div>
        </a>
        <a
          data-leafygreen-ui="menu-item-container"
          class="leafygreen-ui-5qb06p"
          role="menuitem"
          aria-disabled="false"
          href="https://university.mongodb.com"
        >
          <div class="leafygreen-ui-ehg4t4">University</div>
          <div class="leafygreen-ui-w4lksn">university.mongodb.com</div>
        </a>
        <a
          data-leafygreen-ui="menu-item-container"
          class="leafygreen-ui-5qb06p"
          role="menuitem"
          aria-disabled="false"
          href="https://support.mongodb.com"
        >
          <div class="leafygreen-ui-ehg4t4">Cloud Support</div>
          <div class="leafygreen-ui-w4lksn">support.mongodb.com</div>
        </a>
      </section>
      <span
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-tce50e"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-ehg4t4">Logout</div>
      </span>
    </div>
  </div>
</div>
```

## Properties

### user: { name, email }

**Type:** `object`

**Default:** {}

Object that contains information about the active user. {name: 'string', email: 'string'}

### activeProduct

**Type:** `'atlas', 'university', 'support'`

MongoDB product that is currently active.

### onProductChange

**Type:** `function`

**Default:** `() => {}`

Callback invoked after the user clicks a product.

### onLogout

**Type:** `function`

**Default:** `() => {}`

Callback invoked after the user clicks logout.
