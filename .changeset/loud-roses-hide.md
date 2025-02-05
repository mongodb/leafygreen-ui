---
'@leafygreen-ui/typography': minor
---

[LG-4727](https://jira.mongodb.org/browse/LG-4727): `Description` component is now polymorphic and defaults to using a `<p>`. `children` will be typechecked and a `<p>` will be used if `children` is of type `string` or `number`. Otherwise, a `<div>` will be used.
