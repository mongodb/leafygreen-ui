# Syntax

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/syntax.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/syntax--syntax)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/syntax
```

### NPM

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

```html
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
    `Hello, <span class="lg-highlight-subst">${entity}</span>!` </span
  >; }
  <span class="lg-highlight-built_in">console</span>
  .log(greeting(
  <span class="lg-highlight-string">'World'</span>));
</code>
```

## Properties

| Prop             | Type                                                                                                                                                                                                                                                                                                   | Description                                                                                                                                                                        | Default |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children`       | `string`                                                                                                                                                                                                                                                                                               | This is the code snippet that will be rendered in the code block.                                                                                                                  |         |
| `lang`           | `'javascript'`, `'js'`, `'typescript'`, `'ts'`, `'cs'`, `'csharp'`, `'cpp'`, `'go'`, `'ini'`, `'java'`, `'perl'`, `'php'`, `'python'`, `'ruby'`, `'rust'`, `'scala'`, `'swift`, `'kotlin'`, `'objectivec'`, `'bash'`, `'shell'`, `'sql'`, `'yaml'`, `'json'`, `'diff'`, `'graphql'`, `'xml'`, `'none'` | **Required** The language to highlight the code block as. When set to `'none'`, no syntax highlighting will be applied.                                                            |         |
| `darkMode`       | `boolean`                                                                                                                                                                                                                                                                                              | Determines whether or not the component will appear in darkMode.                                                                                                                   | `false` |
| `className`      | `string`                                                                                                                                                                                                                                                                                               | Applies a className to the root element's classList.                                                                                                                               |         |
| `highlightLines` | `Array<number or [number, number]>`                                                                                                                                                                                                                                                                    | An optional array of lines to highlight. The array can only contain numbers corresponding to the line numbers to highlight, and / or tuples representing a range (e.g. `[6, 10]`); |         |
