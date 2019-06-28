# Code

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/code.svg)

### Usage

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
```

## Properties

### children **Required**

**Type:** `string`

This is the code snippet that will be rendered in the code block.

### multiline

**Type:** `boolean`

**Default:** `true`

This prop determines whether or not the code snippet will visually retain line breaks when rendered.

### lang

**Type:** `'javascript'` | `'typescript'` | `'cal'` | `'csp'` | `'cpp'` | `'go'` | `'java'` | `'perl'` | `'php'` | `'python'` | `'ruby'` | `'scala'` | `'bash'` | `'shell'` | `'sql'` | `'yaml'` | `'json'` | `'auto'` | `'none'`

**Default:** `'auto'`

The language to render the code block as. When set to `'none'`, no syntax highlighting will be applied. When set to `'auto'`, the component will attempt to do its best to guess what language the code snippet is.

**We recommend explicitly setting the language if you know what language will be rendered.**

### variant

**Type:** `'dark'` | `'light'`

**Default:** `'light'`

Determines whether to use a light or dark highlighting palette.

### className

**Type:** `string`

Applies a className to the root element's classList.

### showLineNumbers

**Type:** `boolean`

**Default:** `false`

Shows line numbers next to each line of code in the passed code snippet.

**NOTE:** While you can set this to `true` regardless of the code component being multiline, the line numbers will not be displayed if the `multiline` prop is `true`.

### showWindowChrome

**Type:** `boolean`

**Default:** `false`

Shows a stylized window chrome frame around the code snippet. This is purely stylistic.

### chromeTitle

**Type:** `string`

Shows a filename-like title in the window chrome frame.

**NOTE:** While you can set this prop if `showWindowChrome` is `false`, it will not be displayed unless the `showWindowChrome` prop is `true`.
