---
'@leafygreen-ui/emotion': major
---

Adds new a new `mqcss` function as an alternative to `css`. It supports automatically generating media queries based on Leafygreen UI breakpoints as defined in the `@leafygreen-ui/tokens` package. To avoid accidental misuse of `css`, its typing no longer allows interpolating arrays of values.

---
### Before:
#### `css`:
```ts
css`
  width: ${[1, 2, 3]}px;
`
```
would unexpectedly generate styles equivalent to:
```css
.leafygreen-ui-asdf {
  width: 123px;
}
```
---
### After
#### `css`:
```ts
css`
  width: ${[1, 2, 3]}px;
           ~~~~~~~~~
`
```
will get a type error (at compile time; runtime behavior does not change)
#### `mqcss`:
```ts
mqcss`
  width: ${[1, 2, 3]}px;
`
```
will generate styles equivalent to:
```css

.leafygreen-ui-asdf {
  width: 3px;
}

@media only screen and (max-width: 768px) {
  .leafygreen-ui-asdf {
    width: 2px;
  }
}

@media only screen and (max-width: 320px) {
  .leafygreen-ui-asdf {
    width: 1px;
  }
}

```
