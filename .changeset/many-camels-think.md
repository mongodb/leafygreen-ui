---
'@leafygreen-ui/avatar': major
---

Moves base Avatar component to `@leafygreen-ui` from `@lg-chat`.

Updates supported sizes, and renames `variant` prop to `format`.

Avatar no longer calls `getInitials` internally, and will render the first two characters of the `text` prop. `getInitials` must now be called external to Avatar, and one of its results (`initials`, `givenInitial` or `surnameInitial`) passed into the `text` prop.
