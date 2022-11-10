# Code

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/code.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/code/example/)

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

const SomeComponent = () => <Code>{codeSnippet}</Code>;
```

**Output HTML**

```html
<div class="leafygreen-ui-1xban8j">
  <div class="leafygreen-ui-1q8jsgx">
    <pre class="leafygreen-ui-5u6rr1">
			<code class="lg-highlight-hljs-light leafygreen-ui-16k3j4z">
				<span class="lg-highlight-function">
					<span class="lg-highlight-keyword">function</span>
					<span class="lg-highlight-title">greeting</span>
					(
					<span class="lg-highlight-params">entity</span>
					)
				</span>
				{
				<span class="lg-highlight-keyword">return</span>
				<span class="lg-highlight-string">
					`Hello, <span class="lg-highlight-subst">${entity}</span>!`
				</span>;
				}
				<span class="lg-highlight-built_in">console</span>
				.log(greeting(
				<span class="lg-highlight-string">'World'</span>));
			</code>
		</pre>
    <div class="leafygreen-ui-1p8ha9w">
      <button
        data-clipboard-text="function greeting(entity) { return `Hello, ${entity}!`; } console.log(greeting('World'));"
        aria-disabled="false"
        aria-label="Copy"
        class="copy-btn leafygreen-ui-nx7krf"
        tabindex="0"
      >
        <span class="leafygreen-ui-1rvdyoi">
          <svg width="16" height="16" role="img" viewBox="0 0 16 16" class="">
            <title>Copy Icon</title>
            <g fill="currentColor" fill-rule="evenodd">
              <path d="M13 5h-3V2H7v9h6V5zm2 0v8H5V0h5l5 5z"></path>
              <path d="M4 4v1H2v10h7v-1h1v2H1V4h3z"></path>
            </g>
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>
```

## Properties

| Prop                      | Type                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                     | Default |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children` (Required)     | `string`                                                                                                                                                                                                                                                                  | This is the code snippet that will be rendered in the code block.                                                                                                                                                                               | `''`    |
| `language` (Required)     | `'javascript'`, `'typescript'`, `'cs'`, `'csharp'`, `'cpp'`, `'go'`, `'http'`,`'java'`, `'perl'`, `'php'`, `'python'`, `'ruby'`, `'scala'`, `'swift'`, `'kotlin'`,`'objectivec'`, `'dart'`, `'bash'`, `'shell'`, `'sql'`, `'yaml'`, `'json'`, `'diff'`, `'xml'`, `'none'` | The language to highlight the code block as. When set to `'none'`, no syntax highlighting will be applied.                                                                                                                                      |         |
| `darkMode`                | `boolean`                                                                                                                                                                                                                                                                 | Determines whether or not the component will appear in dark mode.                                                                                                                                                                               | `false` |
| `className`               | `string`                                                                                                                                                                                                                                                                  | Applies a className to the root element's classList.                                                                                                                                                                                            |         |
| `showLineNumbers`         | `boolean`                                                                                                                                                                                                                                                                 | Shows line numbers next to each line of code in the passed code snippet. **NOTE:** While you can set this to `true` regardless of the code component being multiline, the line numbers will not be displayed if the `multiline` prop is `true`. | `false` |
| `lineNumberStart`         | `number`                                                                                                                                                                                                                                                                  | Specifies the number by which to start line numbering.                                                                                                                                                                                          | `1`     |
| `showWindowChrome`        | `boolean`                                                                                                                                                                                                                                                                 | Shows a stylized window chrome frame around the code snippet. This is purely stylistic.                                                                                                                                                         | `false` |
| `chromeTitle`             | `string`                                                                                                                                                                                                                                                                  | Shows a filename-like title in the window chrome frame.**NOTE:** While you can set this prop if `showWindowChrome` is `false`, it will not be displayed unless the `showWindowChrome` prop is `true`.                                           | `''`    |
| `showCustomActionButtons` | `boolean`                                                                                                                                                                                                                                                                 | Shows custom action buttons in the panel if set to `true` and there is at least one item in `customActionButtons`                                                                                                                               | `false` |
| `customActionButtons`     | `Array<React.ReactElement>`                                                                                                                                                                                                                                               | An array of custom action buttons using the `IconButton` component. For example: `[<IconButton><Icon glyph="Cloud" /></IconButton>, <IconButton><Icon glyph="Code" /></IconButton>]`                                                            | `[]`    |
| `onCopy`                  | `Function`                                                                                                                                                                                                                                                                | Callback fired when Code is copied                                                                                                                                                                                                              |         |
| `copyable`                | `boolean`                                                                                                                                                                                                                                                                 | When true, allows the code block to be copied to the user's clipboard                                                                                                                                                                           | `true`  |
| `highlightLines`          | `Array<number` \| `[number, number]>`                                                                                                                                                                                                                                     | An optional array of lines to highlight. The array can only contain numbers corresponding to the line numbers to highlight, and / or tuples representing a range (e.g. `[6, 10]`);                                                              |         |
| `languageOptions`         | `Array<LanguageOption>` (see below)                                                                                                                                                                                                                                       | An array of language options. When provided, a LanguageSwitcher dropdown is rendered.                                                                                                                                                           |         |
| `onChange`                | `(language: LanguageOption) => void`                                                                                                                                                                                                                                      | A change handler triggered when the language is changed. Invalid when no `languageOptions` are provided                                                                                                                                         |         |
| `usePortal`               | `boolean`                                                                                                                                                                                                                                                                 | Will position the language switcher dropdown relative to its parent without using a Portal if `usePortal` is set to false.                                                                                                                      | `true`  |
| `portalContainer`         | `HTMLElement` \| `null`                                                                                                                                                                                                                                                   | Sets the container used for the language switcher's dropdown's portal.                                                                                                                                                                          |         |
| `scrollContainer`         | `HTMLElement` \| `null`                                                                                                                                                                                                                                                   | If the language switcher's dropdown's portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly.                                                    |         |
| `portalClassName`         | `string`                                                                                                                                                                                                                                                                  | Passes the given className to the language switcher's dropdown's portal container if the default portal container is being used.                                                                                                                |         |
| `popoverZIndex`           | `number`                                                                                                                                                                                                                                                                  | Sets the z-index CSS property for the language switcher's dropdown.                                                                                                                                                                             |         |

```
interface LanguageOption {
  displayName: string;
  language: Language;
  image?: React.ReactElement;
}
```
