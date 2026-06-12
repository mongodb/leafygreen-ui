---
'@leafygreen-ui/select': minor
---

`Select` now accepts an optional type parameter to narrow the type of `value`, `defaultValue`, and the `onChange` callback value (e.g. `<Select<'apple' | 'banana'> value={value} onChange={value => ...}>`). The parameter defaults to `string`, so existing usage is unaffected. Note: when `allowDeselect` is enabled (default), deselecting calls `onChange` with `''` — include `''` in the union or set `allowDeselect={false}` when narrowing. The type parameter does not constrain `Option` values. Also exports the `SelectOnChange<T>` handler type.
