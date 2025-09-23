# Menu

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/menu.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/menu/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/menu
```

### Yarn

```shell
yarn add @leafygreen-ui/menu
```

### NPM

```shell
npm install @leafygreen-ui/menu
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

### Basic Usage

```tsx
import { Menu, MenuItem } from '@leafygreen-ui/menu';

function BasicExample() {
  const [open, setOpen] = useState(false);

  return (
    <Menu trigger={<Button>Open Menu</Button>} open={open} setOpen={setOpen}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem disabled>Disabled Option</MenuItem>
    </Menu>
  );
}
```

### With Descriptions and Icons

```tsx
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import Icon from '@leafygreen-ui/icon';

<Menu trigger={<Button>Actions</Button>}>
  <MenuItem
    glyph={<Icon glyph="Edit" />}
    description="Make changes to this item"
  >
    Edit
  </MenuItem>
  <MenuItem glyph={<Icon glyph="Copy" />} description="Create a duplicate">
    Duplicate
  </MenuItem>
  <MenuItem
    variant="destructive"
    glyph={<Icon glyph="Trash" />}
    description="Permanently delete this item"
  >
    Delete
  </MenuItem>
</Menu>;
```

### With SubMenus and Groups

```tsx
import {
  Menu,
  MenuItem,
  SubMenu,
  MenuGroup,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import Icon from '@leafygreen-ui/icon';

<Menu trigger={<Button>File</Button>}>
  <MenuItem glyph={<Icon glyph="Plus" />}>New</MenuItem>
  <MenuItem glyph={<Icon glyph="ImportantWithCircle" />}>Open</MenuItem>

  <MenuSeparator />

  <SubMenu title="Recent Files" glyph={<Icon glyph="Clock" />}>
    <MenuItem>Document1.pdf</MenuItem>
    <MenuItem>Spreadsheet.xlsx</MenuItem>
    <MenuItem>Presentation.pptx</MenuItem>
  </SubMenu>

  <MenuSeparator />

  <MenuGroup title="Export Options" glyph={<Icon glyph="Export" />}>
    <MenuItem>Export as PDF</MenuItem>
    <MenuItem>Export as CSV</MenuItem>
    <SubMenu title="Image Formats">
      <MenuItem>PNG</MenuItem>
      <MenuItem>JPEG</MenuItem>
      <MenuItem>SVG</MenuItem>
    </SubMenu>
  </MenuGroup>
</Menu>;
```

### Controlled vs Uncontrolled

```tsx
// Controlled Menu
function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      trigger={<Button>Controlled Menu</Button>}
      open={isOpen}
      setOpen={setIsOpen}
    >
      <MenuItem onClick={() => setIsOpen(false)}>Close Menu</MenuItem>
    </Menu>
  );
}

// Uncontrolled Menu with initial state
<Menu trigger={<Button>Uncontrolled Menu</Button>} initialOpen={false}>
  <MenuItem>Item 1</MenuItem>
  <MenuItem>Item 2</MenuItem>
</Menu>;
```

### Custom Trigger Function

```tsx
<Menu
  trigger={({ onClick, children }) => (
    <Button onClick={onClick} rightGlyph={<Icon glyph="CaretDown" />}>
      Custom Trigger
      {children}
    </Button>
  )}
>
  <MenuItem>Option A</MenuItem>
  <MenuItem>Option B</MenuItem>
</Menu>
```

### With FocusableMenuItem

Use `FocusableMenuItem` when you need to include interactive elements like inputs within menu items:

```tsx
import { Menu, MenuItem, FocusableMenuItem } from '@leafygreen-ui/menu';
import TextInput from '@leafygreen-ui/text-input';

<Menu trigger={<Button>Search Menu</Button>}>
  <FocusableMenuItem>
    <TextInput placeholder="Search..." aria-label="Search" />
  </FocusableMenuItem>
  <MenuSeparator />
  <MenuItem>Recent Search 1</MenuItem>
  <MenuItem>Recent Search 2</MenuItem>
</Menu>;
```

### Compact Variant

```tsx
<Menu variant={MenuVariant.Compact} trigger={<Button size="small">Compact Menu</Button>}>
  <MenuItem>Compact Item 1</MenuItem>
  <MenuItem description="This description will be hidden">
    Compact Item 2
  </MenuItem>
  <MenuItem>Compact Item 3</MenuItem>
</Menu>
```

## Usage with NextJS Link components

We recommend using `Menu` with NextJS's link components in the following pattern:

```tsx
import NextLink from 'next/link';

function CustomLink({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
}

<Menu trigger={<Button>Navigation</Button>}>
  <MenuItem as={CustomLink} href="/dashboard">
    Dashboard
  </MenuItem>
  <SubMenu title="Settings">
    <MenuItem as={CustomLink} href="/settings/profile">
      Profile
    </MenuItem>
    <MenuItem as={CustomLink} href="/settings/security">
      Security
    </MenuItem>
  </SubMenu>
</Menu>;
```

This pattern is recommended because the `SubMenu` component expects to pass styling through the `className` prop, which would not apply correctly if it was passed to `NextLink`.

## Accessibility

The Menu component includes comprehensive keyboard navigation and accessibility features:

### Keyboard Navigation

- **Arrow Keys**: Navigate between menu items
  - `↓` (Down): Move to next menu item, or first item if at the end
  - `↑` (Up): Move to previous menu item, or last item if at the beginning
  - `→` (Right): Open SubMenu or move to first item in SubMenu
  - `←` (Left): Close SubMenu or move to parent menu
- **Enter/Space**: Activate the focused menu item
- **Escape**: Close the menu
- **Tab**: Close the menu and move focus to the next focusable element

### ARIA Support

- Menu elements have appropriate `role="menu"` and `role="menuitem"` attributes
- SubMenus include `aria-expanded` and `aria-haspopup` attributes
- Active items are marked with `aria-current="true"`
- Disabled items have `aria-disabled="true"`
- Menu groups are properly labeled with `aria-labelledby`

## API

# Menu

## Properties

| Prop               | Type                                           | Description                                                                                               | Default       |
| ------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| `children`         | `ReactNode`                                    | The menu items, submenus, groups, and separators                                                          |               |
| `trigger`          | `ReactElement` \| `function`                   | Element or function that triggers the menu. Function signature: `({ onClick, children }) => ReactElement` |               |
| `open`             | `boolean`                                      | Controls whether the menu is open or closed                                                               | `false`       |
| `setOpen`          | `function`                                     | Callback to control the open state: `(open: boolean) => void`                                             |               |
| `initialOpen`      | `boolean`                                      | Initial open state for uncontrolled usage                                                                 | `false`       |
| `shouldClose`      | `function`                                     | Callback to determine if menu should close: `() => boolean`                                               | `() => true`  |
| `onOpen`           | `function`                                     | Callback fired when menu opens (after transition)                                                         |               |
| `onClose`          | `function`                                     | Callback fired when menu closes (after transition)                                                        |               |
| `align`            | `'top'` \| `'bottom'` \| `'left'` \| `'right'` | Alignment of the menu relative to its trigger                                                             | `'bottom'`    |
| `justify`          | `'start'` \| `'middle'` \| `'end'`             | Justification of the menu relative to its trigger                                                         | `'end'`       |
| `maxHeight`        | `number`                                       | Maximum height of the menu in pixels                                                                      | `256`         |
| `darkMode`         | `boolean`                                      | Determines if the component renders in dark mode                                                          | `false`       |
| `renderDarkMenu`   | `boolean`                                      | Whether the menu should always render dark, regardless of theme context                                   | `true`        |
| `variant`          | `'default'` \| `'compact'`                     | Visual variant of the menu. Compact hides descriptions                                                    | `'default'`   |
| `refEl`            | `HTMLElement`                                  | Reference element for positioning (alternative to trigger)                                                |               |
| `adjustOnMutation` | `boolean`                                      | Whether menu should reposition on DOM mutations                                                           | `false`       |
| `renderMode`       | `'inline'` \| `'portal'` \| `'top-layer'`      | Rendering mode. Use `'top-layer'` for modern browsers                                                     | `'top-layer'` |
| `id`               | `string`                                       | ID for the menu dropdown element                                                                          |               |
| `data-testid`      | `string`                                       | Test ID for the menu element                                                                              |               |
| ...                | native `ul` attributes                         | Any other props are spread to the root `ul` element                                                       |               |

_Note: Some props like `portalContainer`, `scrollContainer`, `portalClassName`, and `popoverZIndex` are deprecated. Use `renderMode="top-layer"` instead._

# MenuItem

## Properties

| Prop          | Type                                               | Description                                                                             | Default     |
| ------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------- |
| `children`    | `ReactNode`                                        | Content to appear inside of the MenuItem                                                |             |
| `href`        | `string`                                           | If supplied, renders the MenuItem as an `<a>` tag instead of a `<button>`               |             |
| `as`          | `React.ElementType`                                | Determines what element the MenuItem renders as (e.g., 'a', 'button', custom component) | `'button'`  |
| `onClick`     | `function`                                         | Callback fired when the MenuItem is clicked                                             |             |
| `active`      | `boolean`                                          | Whether the MenuItem appears in an active state                                         | `false`     |
| `disabled`    | `boolean`                                          | Whether the MenuItem is disabled and non-interactive                                    | `false`     |
| `description` | `ReactNode`                                        | Additional content displayed below the main text (hidden in compact variant)            |             |
| `glyph`       | `React.ReactElement`                               | Icon displayed to the left of the MenuItem text                                         |             |
| `rightGlyph`  | `React.ReactElement`                               | Icon displayed to the right of the MenuItem text                                        |             |
| `variant`     | `'default'` \| `'destructive'`                     | Visual variant of the MenuItem                                                          | `'default'` |
| `className`   | `string`                                           | CSS class applied to the root `<li>` element                                            |             |
| ...           | native attributes of component passed to `as` prop | Any other props are spread to the rendered element                                      |             |

# SubMenu

SubMenu allows you to create nested menu structures with expandable sections.

## Properties

| Prop          | Type                                   | Description                                                           | Default    |
| ------------- | -------------------------------------- | --------------------------------------------------------------------- | ---------- |
| `children`    | `ReactNode`                            | Menu items, submenus, groups, or separators to display in the submenu |            |
| `title`       | `string`                               | Text displayed in the submenu trigger                                 |            |
| `open`        | `boolean`                              | Controls whether the submenu is expanded                              | `false`    |
| `setOpen`     | `function`                             | Callback to control the open state: `(open: boolean) => void`         |            |
| `initialOpen` | `boolean`                              | Initial open state for uncontrolled usage                             | `false`    |
| `active`      | `boolean`                              | Whether the SubMenu trigger appears active                            | `false`    |
| `disabled`    | `boolean`                              | Whether the SubMenu is disabled and non-interactive                   | `false`    |
| `description` | `ReactNode`                            | Additional content displayed below the title                          |            |
| `glyph`       | `React.ReactElement`                   | Icon displayed to the left of the SubMenu title                       |            |
| `href`        | `string`                               | If supplied, renders the SubMenu trigger as an `<a>` tag              |            |
| `as`          | `React.ElementType`                    | Determines what element the SubMenu trigger renders as                | `'button'` |
| `onEntered`   | `function`                             | Callback fired when the submenu finishes opening                      |            |
| `onExited`    | `function`                             | Callback fired when the submenu finishes closing                      |            |
| `className`   | `string`                               | CSS class applied to the root element                                 |            |
| ...           | native `anchor` or `button` attributes | Any other props are spread to the trigger element                     |            |

# MenuGroup

MenuGroup provides visual grouping and labeling for related menu items.

## Properties

| Prop        | Type                    | Description                                                 | Default |
| ----------- | ----------------------- | ----------------------------------------------------------- | ------- |
| `children`  | `ReactNode`             | Menu items, submenus, or separators to display in the group |         |
| `title`     | `string`                | Label displayed at the top of the group                     |         |
| `glyph`     | `React.ReactElement`    | Icon displayed to the left of the group title               |         |
| `className` | `string`                | CSS class applied to the root element                       |         |
| ...         | native `div` attributes | Any other props are spread to the root `<div>` element      |         |

# MenuSeparator

MenuSeparator provides visual separation between menu items or groups.

## Properties

MenuSeparator accepts no props and renders a horizontal divider line.

```tsx
import { MenuSeparator } from '@leafygreen-ui/menu';

<MenuSeparator />;
```

# FocusableMenuItem

FocusableMenuItem allows you to include interactive elements (like inputs) within menu items while maintaining proper keyboard navigation.

## Properties

| Prop        | Type                   | Description                                                   | Default |
| ----------- | ---------------------- | ------------------------------------------------------------- | ------- |
| `children`  | `ReactNode`            | Interactive content to display within the focusable menu item |         |
| `className` | `string`               | CSS class applied to the root element                         |         |
| ...         | native `li` attributes | Any other props are spread to the root `<li>` element         |         |

## Utilities

### getLgIds

The `getLgIds` utility function generates consistent data-lgid values for menu components, useful for testing and automation.

```tsx
import { getLgIds } from '@leafygreen-ui/menu';

const lgIds = getLgIds('my-menu');
// Returns: {
//   root: 'my-menu',
//   item: 'my-menu-menu_item',
//   submenu: 'my-menu-submenu',
//   submenuToggle: 'my-menu-submenu_toggle'
// }

<Menu data-lgid={lgIds.root}>
  <MenuItem data-lgid={lgIds.item}>Item</MenuItem>
</Menu>;
```

## Advanced Usage

### Controlling Menu State

```tsx
function AdvancedMenuExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    console.log('Menu closing');
    setIsOpen(false);
  };

  const shouldPreventClose = () => {
    // Only close if form is valid
    return isFormValid;
  };

  return (
    <Menu
      open={isOpen}
      setOpen={setIsOpen}
      onClose={handleClose}
      shouldClose={shouldPreventClose}
      trigger={<Button>Advanced Menu</Button>}
    >
      <MenuItem onClick={() => console.log('Action performed')}>
        Action Item
      </MenuItem>
    </Menu>
  );
}
```

### Menu Positioning

```tsx
// Position relative to a custom element
function PositionedMenu() {
  const triggerRef = useRef(null);

  return (
    <>
      <div ref={triggerRef}>Custom Trigger Element</div>
      <Menu refEl={triggerRef.current} align="bottom" justify="start">
        <MenuItem>Positioned Item</MenuItem>
      </Menu>
    </>
  );
}
```

### Dynamic Menu Content

```tsx
function DynamicMenu({ items, onItemClick }) {
  return (
    <Menu trigger={<Button>Dynamic Menu</Button>}>
      {items.map(item => (
        <MenuItem
          key={item.id}
          onClick={() => onItemClick(item)}
          disabled={item.disabled}
          variant={item.destructive ? 'destructive' : 'default'}
          glyph={item.icon}
        >
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
}
```

## Migration Notes

### From v31 to v32

- The `size` prop on `MenuItem` has been deprecated and no longer has any effect
- Use `variant="compact"` on the `Menu` component instead for smaller menu items
- The deprecated portal-related props will be removed in a future version - migrate to `renderMode="top-layer"`

### Best Practices

1. **Accessibility**: Always provide meaningful labels and ensure keyboard navigation works
2. **Performance**: Use `shouldClose` callback to prevent unnecessary re-renders
3. **Positioning**: Use `renderMode="top-layer"` for better stacking context management
4. **Testing**: Use the `getLgIds` utility for consistent test selectors

## Browser Support

The Menu component supports all modern browsers. The `renderMode="top-layer"` option requires browsers that support the [HTML `dialog` element](https://caniuse.com/dialog) and [CSS `@layer`](https://caniuse.com/css-cascade-layers). For older browsers, the component will automatically fall back to portal rendering.
