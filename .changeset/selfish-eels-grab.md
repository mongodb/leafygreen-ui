---
'@leafygreen-ui/typography': minor
---

`H1`, `H2`, `H3` and `Subtitle` components now accept an `as` prop, such that we can keep styles consistent via `Component`, but the actual heading level that should be rendered can change based on context. This was done to support making MongoDB an accessible platform, as headings should only decrease by one level (i.e. from `<h1>` to `<h2>`) but the styles don't always need to appear as such. 
