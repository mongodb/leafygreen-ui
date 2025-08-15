# Upgrading v19 to v20

`Modal` v20 introduces breaking changes that modernize the component with top layer rendering, improved accessibility, and updated prop interfaces.

Prior to v20, Modal components used portal-based rendering and different prop names for styling. In v20, the component has been updated to use the native HTML dialog element with top layer rendering for better stacking context management.

Key changes include:

- `className` → `backdropClassName`
  - **Note:** `backdropClassName` is also deprecated in v20 and only provided for migration ease. For custom backdrop styles, use the CSS `::backdrop` pseudo-element to target and style the dialog backdrop instead of relying on this prop.
- `contentClassName` → `className`
- `initialFocus` prop removed in favor of `autoFocus` attribute on child elements

Follow these steps to upgrade:

1. In the root of your project, install [@lg-tools/cli](https://github.com/mongodb/leafygreen-ui/blob/main/tools/cli/README.md#installation) and [@lg-tools/codemods](https://github.com/mongodb/leafygreen-ui/blob/main/tools/codemods/README.md#installation).
2. Bump to the version of the Modal packages you'd like to upgrade and install the bumped packages.
3. Run [modal-v20 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#modal-v20). By default, this will apply for all relevant packages in the specified directory. The `--packages` flag can be used to only modify specified packages. However, it is recommended to upgrade all packages simultaneously. If necessary, re-lint your project.

At this point, you're all set, and existing Modal components should have parity! New Modal instances should leverage top layer rendering, updated prop structure, and improved accessibility features.

## Manual Migration Steps

If you prefer to migrate manually or need to handle edge cases not covered by the codemod:

### 1. Update Prop Names

**Before:**

```tsx
<Modal
  className="modal-backdrop-styles"
  contentClassName="modal-root-styles"
  initialFocus="#primary-button"
>
  <button id="primary-button">Action</button>
</Modal>
```

**After:**

```tsx
<Modal backdropClassName="modal-backdrop-styles" className="modal-root-styles">
  <button id="primary-button" autoFocus>
    Action
  </button>
</Modal>
```

### 2. Update Backdrop Styling

The preferred approach for backdrop styling is now the CSS `::backdrop` pseudo-element:

**Before:**

```tsx
<Modal className="modal-backdrop-styles" contentClassName="modal-root-styles>
  Modal content
</Modal>
```

```css
.modal-backdrop-styles {
  // modal backdrop styles
}

.modal-root-styles {
  // modal root styles
}
```

**After:**

```tsx
<Modal className="modal-styles">Modal content</Modal>
```

```css
.modal-styles {
  // modal root styles

  &::backdrop {
    // modal backdrop styles
  }
}
```

### 3. Update Focus Management

Replace `initialFocus` with `autoFocus` attribute on the desired element:

**Before:**

```tsx
<Modal initialFocus="#submit-btn">
  <form>
    <input type="text" />
    <button id="submit-btn">Submit</button>
  </form>
</Modal>
```

**After:**

```tsx
<Modal>
  <form>
    <input type="text" />
    <button autoFocus>Submit</button>
  </form>
</Modal>
```

If no element has `autoFocus`, the first focusable element will automatically receive focus.
