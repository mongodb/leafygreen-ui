---
'@leafygreen-ui/drawer': major
---

# Unified Drawer Layout System

## Summary

This release introduces a unified grid layout system for all drawer instances, eliminating layout inconsistencies between drawers with and without toolbars. All drawers now use the same consistent grid-based layout, providing better visual consistency and easier customization.

## Breaking Changes

### Layout Unification Impact

Previously, drawers with toolbars used a different internal layout system than drawers without toolbars, leading to inconsistent spacing, positioning, and responsive behavior when adding new internal features. This change standardizes all drawer layouts (with one exception - see below) to use the same grid system.

**⚠️ Migration Required:** If you were using custom CSS to override drawer layout styles, you will need to update your styles to work with the new grid-based layout system.

### What's Changed

#### 1. Drawer without toolbar using the `drawer` prop

Drawers passed via the `drawer` prop now use the unified grid layout. Mobile styles have been updated to match the responsive behavior of drawers with toolbars.

**Impact:** Custom style overrides will need to be updated to work with the new grid system.

```tsx
// ✅ This usage is affected - now uses unified grid layout
<DrawerLayout
  displayMode={DisplayMode.Embedded}
  isDrawerOpen={open}
  resizable
  drawer={
    <Drawer title="Resizable Drawer">
      <div>
        Drawer content that can be resized by dragging the left edge
      </div>
    </Drawer>
  }
  onClose={() => setOpen(false)}
>
  <main>
    <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
      Toggle Resizable Drawer
    </Button>
  </main>
</DrawerLayout>
```

#### 2. Drawer passed as child (No changes required)

**Impact:** No changes needed. This usage pattern is unaffected.

When the drawer is passed as a child component, it cannot be wrapped in the new grid layout system, so this usage pattern remains unchanged.

```tsx
// ✅ This usage is NOT affected - works exactly the same
<DrawerLayout displayMode={DisplayMode.Overlay} isDrawerOpen={open}>
  <main>
    <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
      Open Drawer
    </Button>
  </main>
  <Drawer
    displayMode={DisplayMode.Overlay}
    onClose={() => setOpen(false)}
    open={open}
    title="Drawer Title"
  >
    Drawer content goes here
  </Drawer>
</DrawerLayout>
```

#### 3. Drawer with toolbar (No changes required)

**Impact:** No changes needed. This usage already used the unified grid layout.

```tsx
// ✅ This usage is NOT affected - already used the unified layout
<DrawerLayout
  toolbarData={DRAWER_TOOLBAR_DATA}
  displayMode={DisplayMode.Overlay}
  size={Size.Default}
>
  <Main />
</DrawerLayout>
```

## Migration Guide

### If you have custom CSS overrides:

1. **Review your custom styles:** Check if you have any CSS that targets drawer layout elements
2. **Test thoroughly:** The new grid system may affect positioning, spacing, or responsive behavior
3. **Update selectors:** You may need to update CSS selectors to target the new grid structure

### Benefits of this change:

- **Consistent layout:** All drawers now have the same visual structure and behavior
- **Better mobile experience:** Unified responsive behavior across all drawer types
- **Easier customization:** Single grid system to understand and customize
- **Future-proof:** Consistent foundation for future drawer enhancements