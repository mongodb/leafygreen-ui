---
'@leafygreen-ui/code': major
---
## What's new?

Adds a new slot prop, `panel`, that accepts the new `<Panel/>` sub-component. This will render the top panel with a language switcher, custom action buttons, and copy button. If no props are passed to the panel sub-component, the panel will render with only the copy button.

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
  panel={
    <Panel
      title="Title"
    />
  }
>
 {snippet}
</Code>
```
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
  language={}
  showLineNumbers={}
  onCopy={() => {}}
  darkMode={}
  customActionButtons={}
  showCustomActionButtons={}
  chromeTitle={}
  languageOptions={}
  onChange={}
  copyable={}
>
  {snippet}
</Code>
```

**After**:
```js
<Code
  language="javascript"
  showLineNumbers={true}
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