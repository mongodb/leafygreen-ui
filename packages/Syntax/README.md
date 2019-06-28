# Syntax

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/syntax.svg)

### Usage

```shell
npm install @leafygreen-ui/syntax
```

## Example

```js
import Syntax from '@leafygreen-ui/syntax';

const codeSnippet = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));
`;

const SomeComponent = () => <Syntax>{codeSnippet}</Syntax>;
```

**Output HTML**

```HTML
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
```

## Properties

### children **Required**

**Type:** `string`

This is the code snippet that will be rendered in the code block.

### lang

**Type:** `'javascript'` | `'typescript'` | `'cal'` | `'csp'` | `'cpp'` | `'go'` | `'java'` | `'perl'` | `'php'` | `'python'` | `'ruby'` | `'scala'` | `'bash'` | `'shell'` | `'sql'` | `'yaml'` | `'json'` | `'auto'` | `'none'`

**Default:** `'auto'`

The language to render the code block as. When set to `'none'`, no syntax highlighting will be applied. When set to `'auto'`, the component will attempt to do it's best to guess what language the code snippet is.

**We recommend explicitly setting the language if you know what language will be rendered.**

### variant

**Type:** `'dark'` | `'light'`

**Default:** `'light'`

Determines whether to use a light or dark highlighting palette.

### className

**Type:** `string`

Applies a className to the root element's classList.
