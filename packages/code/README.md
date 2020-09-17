# Code

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/code.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/code--multiline)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/code
```

### NPM

```shell
npm install @leafygreen-ui/code
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

```HTML
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
            <button data-clipboard-text="function greeting(entity) { return `Hello, ${entity}!`; } console.log(greeting('World'));" aria-disabled="false" aria-label="Copy" class="copy-btn leafygreen-ui-nx7krf" tabindex="0">
                <span class="leafygreen-ui-1rvdyoi">
					<svg width="16" height="16" role="img" viewBox="0 0 16 16" class="">
						<title> Copy Icon</title>
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

| Prop               | Type                                                                                                                                                                                                                                          | Description                                                                                                                                                                                                                                     | Default |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children`         | `string`                                                                                                                                                                                                                                      | **Required** – This is the code snippet that will be rendered in the code block.                                                                                                                                                                | `''`    |
| `multiline`        | `boolean`                                                                                                                                                                                                                                     | This prop determines whether or not the code snippet will visually retain line breaks when rendered.                                                                                                                                            | `true`  |
| `language`         | `'javascript'`, `'typescript'`, `'cs'`, `'csharp'`, `'cpp'`, `'go'`, `'java'`, `'perl'`, `'php'`, `'python'`, `'ruby'`, `'scala'`, `'swift'`, `'kotlin'`,`'objectivec'`, `'bash'`, `'shell'`, `'sql'`, `'yaml'`, `'json'`, `'diff'`, `'none'` | **Required** – The language to highlight the code block as. When set to `'none'`, no syntax highlighting will be applied.                                                                                                                       |         |
| `darkMode`         | `boolean`                                                                                                                                                                                                                                     | Determines whether or not the component will appear in dark mode.                                                                                                                                                                               | `false` |
| `className`        | `string`                                                                                                                                                                                                                                      | Applies a className to the root element's classList.                                                                                                                                                                                            |         |
| `showLineNumbers`  | `boolean`                                                                                                                                                                                                                                     | Shows line numbers next to each line of code in the passed code snippet. **NOTE:** While you can set this to `true` regardless of the code component being multiline, the line numbers will not be displayed if the `multiline` prop is `true`. | `false` |
| `showWindowChrome` | `boolean`                                                                                                                                                                                                                                     | Shows a stylized window chrome frame around the code snippet. This is purely stylistic.                                                                                                                                                         | `false` |
| `chromeTitle`      | `string`                                                                                                                                                                                                                                      | Shows a filename-like title in the window chrome frame.**NOTE:** While you can set this prop if `showWindowChrome` is `false`, it will not be displayed unless the `showWindowChrome` prop is `true`.                                           | `''`    |
| `onCopy`           | `Function`                                                                                                                                                                                                                                    | Callback fired when Code is copied                                                                                                                                                                                                              |         |
| `copyable`         | `boolean`                                                                                                                                                                                                                                     | When true, allows the code block to be copied to the user's clipboard                                                                                                                                                                           | `true`  |
