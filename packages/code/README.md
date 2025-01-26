# Code

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/code.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/code/live-example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/code
```

### NPM

```shell
npm install @leafygreen-ui/code
```

### Source Code Pro Font

In addition to using a limited amount of our standard brand font, this component uses the open-source monospace font "Source Code Pro". For this component to display correctly, loading the following weights / styles of "Source Code Pro" is necessary:

- `400 / normal`
- `400 / italic`
- `600 / normal`

You can find instructions for using Google's CDN for font delivery, and download "Source Code Pro" on [Google Fonts](https://fonts.google.com/specimen/Source+Code+Pro?query=+source+code+pro&selection.family=Source+Code+Pro:ital,wght@0,400;0,600;1,400&sidebar.open=true#glyphs).

We recommend using Google's CDN for loading this font to optimize for caching the assets, speeding up loading times for webpages as a result. We use the following HTML in our `<head>` tags to load the necessary variants of "Source Code Pro":

```HTML
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
```

## Example

```js
import Code from '@leafygreen-ui/code';

const codeSnippet = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));
`;

const SomeComponent = () => (
  <Code language="javascript" panel={<Panel title="Example Code" />}>
    {codeSnippet}
  </Code>
);
```

# Props

## Code

| Prop                                     | Type                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                        | Default |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `children` (Required)                    | `string`                                                                                                                                                                                                                                                                  | This is the code snippet that will be rendered in the code block.                                                                                                                                                                                                  | `''`    |
| `language` (Required)                    | `'javascript'`, `'typescript'`, `'cs'`, `'csharp'`, `'cpp'`, `'go'`, `'http'`,`'java'`, `'perl'`, `'php'`, `'python'`, `'ruby'`, `'scala'`, `'swift'`, `'kotlin'`,`'objectivec'`, `'dart'`, `'bash'`, `'shell'`, `'sql'`, `'yaml'`, `'json'`, `'diff'`, `'xml'`, `'none'` | The language to highlight the code block as. When set to `'none'`, no syntax highlighting will be applied.                                                                                                                                                         |         |
| `darkMode`                               | `boolean`                                                                                                                                                                                                                                                                 | Determines whether or not the component will appear in dark mode.                                                                                                                                                                                                  | `false` |
| `className`                              | `string`                                                                                                                                                                                                                                                                  | Applies a className to the root element's classList.                                                                                                                                                                                                               |         |
| `showLineNumbers`                        | `boolean`                                                                                                                                                                                                                                                                 | Shows line numbers next to each line of code in the passed code snippet. **NOTE:** While you can set this to `true` regardless of the code component being multiline, the line numbers will not be displayed if the `multiline` prop is `true`.                    | `false` |
| `lineNumberStart`                        | `number`                                                                                                                                                                                                                                                                  | Specifies the number by which to start line numbering.                                                                                                                                                                                                             | `1`     |
| `onCopy`                                 | `Function`                                                                                                                                                                                                                                                                | Callback fired when Code is copied                                                                                                                                                                                                                                 |         |
| `expandable`                             | `boolean`                                                                                                                                                                                                                                                                 | When true, allows the code block to be expanded and collapsed when there are more than 5 lines of code.                                                                                                                                                            | `false` |
| `highlightLines`                         | `Array<number` \| `[number, number]>`                                                                                                                                                                                                                                     | An optional array of lines to highlight. The array can only contain numbers corresponding to the line numbers to highlight, and / or tuples representing a range (e.g. `[6, 10]`);                                                                                 |         |
| `copyable` (`Deprecated`)                | `boolean`                                                                                                                                                                                                                                                                 | When true, allows the code block to be copied to the user's clipboard. **_Note:_** `@deprecated` - use `<Panel  />` or `copyButtonAppearance`                                                                                                                      | `true`  |
| `chromeTitle`(`Deprecated`)              | `string`                                                                                                                                                                                                                                                                  | Shows a filename-like title in the window chrome frame.**NOTE:** While you can set this prop if `showWindowChrome` is `false`, it will not be displayed unless the `showWindowChrome` prop is `true`. **_Note:_** `@deprecated` - use `panel={<Panel title={} />}` | `''`    |
| `showCustomActionButtons` (`Deprecated`) | `boolean`                                                                                                                                                                                                                                                                 | Shows custom action buttons in the panel if set to `true` and there is at least one item in `customActionButtons`. **_Note:_** `@deprecated` - use `<Panel showCustomActionButtons={} />`                                                                          | `false` |
| `customActionButtons`(`Deprecated`)      | `Array<React.ReactElement>`                                                                                                                                                                                                                                               | An array of custom action buttons using the `IconButton` component. For example: `[<IconButton><Icon glyph="Cloud" /></IconButton>, <IconButton><Icon glyph="Code" /></IconButton>]` **_Note:_** `@deprecated` - use `<Panel customActionButtons={} />`            | `[]`    |
| `languageOptions` (`Deprecated`)         | `Array<LanguageOption>` (see below)                                                                                                                                                                                                                                       | An array of language options. When provided, a LanguageSwitcher dropdown is rendered. **_Note:_** `@deprecated` - use `<Panel languageOptions={}  />`                                                                                                              |         |
| `onChange` (`Deprecated`)                | `(language: LanguageOption) => void`                                                                                                                                                                                                                                      | A change handler triggered when the language is changed. Invalid when no `languageOptions` are provided **_Note:_** `@deprecated` - use `<Panel onChange={}  />`                                                                                                   |

## Panel

| Prop                      | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                | Default |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `showCustomActionButtons` | `boolean`                            | Shows custom action buttons in the panel if set to `true` and there is at least one item in `customActionButtons`.                                                                                                                                                                                                                                                                                                                         | `false` |
| `customActionButtons`     | `Array<React.ReactElement>`          | An array of custom action buttons using the `IconButton` component. For example: `[<IconButton><Icon glyph="Cloud" /></IconButton>, <IconButton><Icon glyph="Code" /></IconButton>]`                                                                                                                                                                                                                                                       | `[]`    |
| `copyButtonAppearance`    | `'none'`, `'hover'`, `'persist'`     | Determines the appearance of the copy button if the panel prop is not defined. The copy button allows the code block to be copied to the user's clipboard by clicking the button. If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible. If `persist`, the copy button will always be visible. If `none`, the copy button will not be rendered. | `hover` |
| `title`                   | `string`                             | Shows a filename-like title in the window chrome frame.                                                                                                                                                                                                                                                                                                                                                                                    | `''`    |
| `isLoading`               | `boolean`                            | Determines whether or not the loading skeleton will be rendered in place of the code block. If isLoading is `true`, the language switcher and copy button in the panel will be disabled.                                                                                                                                                                                                                                                   | `false` |
| `languageOptions`         | `Array<LanguageOption>`              | An array of language options. When provided, a LanguageSwitcher dropdown is rendered.                                                                                                                                                                                                                                                                                                                                                      |         |
| `onChange`                | `(language: LanguageOption) => void` | A change handler triggered when the language is changed. Invalid when no `languageOptions` are provided.                                                                                                                                                                                                                                                                                                                                   |         |

```
interface LanguageOption {
  displayName: string;
  language: Language;
  image?: React.ReactElement;
}
```
