# v5 to v6

This major version includes a redesign of the side navigation, implements collapsible functionality, and improves screen-reader accessibility. While the API is largely unchanged, page layout needs to be adjusted to account for the new layout and behavior of the side navigation.

## Layout

The layout concerns that need to be accounted for:

- The side navigation has no implicit or explicit height. The application using the side navigation should set this manually, via implicit CSS mechanisms like flexbox / grid, or explicitly by setting the height CSS property. See below for our recommended approach.
- The side navigation should not go below the viewport, and should scroll independently of the rest of the page (the side navigation is built to support this behavior by default). This ensures that the collapse / expand button is always visible.

### Grid Layout (recommended)

We recommend using CSS grid over other approaches since we believe it provides the least brittle implementation for laying out the overall page. It supports adding a top navigation into the layout easily, and removes any need for exact pixel values (like for instance, the width of the navigation).

```css
.grid-container {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
}

.content {
  overflow-x: hidden;
  overflow-y: scroll;
}
```

```js
return (
  <div className="grid-container">
    <SideNav>{/* Navigation groups and items */}</SideNav>

    <div className="content">{/* Page content */}</div>
  </div>
);
```

### Flexbox Layout

The flexbox approach provides similar layout capabilities, though adding a top navigation requires additional work to do properly, and additional CSS is needed overall.

```css
.flex-container {
  display: flex;
  height: 100vh;
}

.side-nav {
  flex-shrink: 0;
  flex-grow: 0;
}

.content {
  overflow-x: hidden;
  overflow-y: scroll;
  flex-grow: 1;
}
```

```js
return (
  <div className="flex-container">
    <SideNav className="side-nav">
      {/* Side navigation groups and items */}
    </SideNav>

    <div className="content">{/* Page content */}</div>
  </div>
);
```

### Fixed / Absolute Positioning

We don't recommend using fixed or absolute positioning to position the navigation. Since the navigation is collapsible, it would require transitioning the width of margin or padding on the page content between two static pixel values. There are also additional `z-index` concerns with these approaches that aren't applicable to the navigation when using grid or flexbox positioning.

## Showing elements when navigation is collapsed

You may have noticed that you're able to display items in the side navigation when it's closed! This is done automatically when supplying a glyph to the side navigation group (`SideNavGroup`) or a side navigation item (`SideNavItem`). You can also do this manually for other items using our `CollapsedSideNavItem` component.
