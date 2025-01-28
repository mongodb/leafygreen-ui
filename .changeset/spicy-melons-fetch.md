---
'@leafygreen-ui/info-sprinkle': patch
---

The `trigger` associated with the `InfoSprinkle` component was previously a `<button>` element using the default `type="submit"`. When an `InfoSprinkle` instance was used in a `<form>` element, clicking would unexpectedly submit form data to the server. The `<button>` element now uses `type="button"` to prevent this behavior.
