# Upgrading to Modal v18

## Overview

Modal v18 introduces a new approach to rendering popover elements using the top layer, ensuring they appear above all other page content. This aligns with the top layer solution implemented in Popover v12.

Previously, modal and popover elements relied on the usePortal boolean prop to determine whether they should render inline or in a portal appended to the body (or a provided portalContainer). This is no longer necessary with the new implementation.

## Major Changes

### DOM Structure

Modal components are now rendered inside a `<dialog>` element instead of a `<div>`.

### Deprecated Props

- `contentClassName` – No longer needed, as Modals no longer have two separate wrapper elements. Most use cases can pass the value directly to the className prop.

- `initialFocus` – The browser now manages focus automatically when the Modal opens.

### Dependency Updates

Removed focus-trap-react. Focus trapping is now handled natively by the `<dialog>` element.

## Minor Changes

### New Props

- `portalRef` – Allows consuming applications to portal components inside the `<dialog>` element.

By adopting these updates, applications benefit from improved accessibility, reduced dependency overhead, and better integration with the native top-layer behavior.
