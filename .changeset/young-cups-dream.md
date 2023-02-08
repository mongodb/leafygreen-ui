---
'@leafygreen-ui/search-input': minor
---

Adds typehead functionality. Developers can now provide `SearchResult` elements as children to display a menu of results. `SearchInput` fires a `change` event when search text changes, and a form `submit` event when a result is clicked, and whenever the `enter` key is pressed (note: the default `submit` event behavior is prevented). `SearchResult` elements also fire a `click` event when clicked
