---
'@leafygreen-ui/code': major
---

## What's new?

### `panel`

Adds a new slot prop, `panel`, that accepts the new `<Panel/>` sub-component. This will render the top panel with a language switcher, custom action buttons, and copy button. If no props are passed to the panel sub-component, the panel will render with only the copy button. 

**_Note: `copyButtonAppearance` cannot be used with `panel`. Either use `copyButtonAppearance` or `panel`, not both._**

e.g.

```js
panel={
  <Panel
    onChange={() => {}}
    languageOptions={[]}
    showCustomActionButtons
    customActionButtons={[]}
    title="Title"
  />
}
```
or
```js
panel={<Panel/>}
```

### `copyButtonAppearance`
Adds a new prop, `copyButtonAppearance`. This prop determines the appearance of the copy button if the `panel` prop is not defined. If `panel` is defined, this prop will be ignored. 

If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible. 

If `persist`, the copy button will always be visible. 

If `none`, the copy button will not be rendered.

**_Note: 'panel' cannot be used with `copyButtonAppearance`. Either use `copyButtonAppearance` or `panel`, not both._**

e.g.

```js
<Code
  language="javascript"
  copyButtonAppearance="hover"
>
  {snippet}
</Code>
```

### `isLoading`
Adds a new prop, `isLoading`. This prop determines whether or not the loading skeleton will be rendered in place of the code block. If `true`, the language switcher and copy button will be disabled in the top panel.

e.g.

```js
<Code
  language="javascript"
  isLoading
>
  {snippet}
</Code>
```


### `chromeTitle`

`<Panel/>` accepts the [deprecated `Code` props](https://github.com/mongodb/leafygreen-ui/tree/main/packages/code#deprecated) listed below, with one key difference: the `chromeTitle` prop has been replaced by `title`. Instead of rendering inside the window chrome bar, the `title` now appears within the top panel, as the window chrome bar has been removed.

e.g.

**Before**:
```js
<Code chromeTitle="title">{snippet}</Code>
```

**After**:
```js
<Code 
  panel={<Panel title="Title" />}
>
 {snippet}
</Code>
```

### `baseFontSize`
Adds `baseFontSize` prop, which allows you to override the `LeafyGreenProvider` value.

## What's changed?

The `className` prop is no longer applied to the `<pre>` tag. Instead it is applied to the parent `<div>` wrapper.


## Deprecated

The following props have been marked as `deprecated`:
- `customActionButtons`
- `showCustomActionButtons`
- `chromeTitle`
- `languageOptions`
- `onChange`
- `copyable`

Moving forward these props should be passed to the new sub-component, `<Panel />`.

**Before**:
```js
<Code
  language="javascript"
  showLineNumbers
  onCopy={() => {}}
  darkMode={true}
  onChange={() => {}}
  languageOptions={[]}
  showCustomActionButtons
  customActionButtons={[]}
  chromeTitle='Title'
>
  {snippet}
</Code>
```

**After**:
```js
<Code
  language="javascript"
  showLineNumbers
  onCopy={() => {}}
  darkMode={true}
  // NEW PANEL PROP
  panel={
    <Panel
      onChange={() => {}}
      languageOptions={[]}
      showCustomActionButtons
      customActionButtons={[]}
      title="Title"
    />
  }
>
  {snippet}
</Code>
```

Check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/code#panel) for information on the `<Panel>` sub-component.