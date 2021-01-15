---
'@leafygreen-ui/icon': major
---

Changes accessible properties on LeafyGreen glyphs. Previously we used the `title` tag to communicate a glyph's accessible name, but this was problematic as in certain instances we wanted to remove the title (which can appear in certain browsers like a tooltip when an glyph is hovered on) leaving mismatching aria-labels in the DOM. Now, we use the `aria-label` property as the default mechanism by which to give a glyph an accessible name. This default value can be overwritten by supplying an `aria-labelledby`, `aria-label` or `title` tag to the glyph. Additionally, previously we did not have support for overwriting the default `role="img"`, which forced every glyph to be accessible to screenreaders. Now, if you'd like to hide your glyph from screenreaders you are able to pass `role="presentation"`. 
