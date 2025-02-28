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

const SomeComponentWithPanel = () => (
  <Code
    language="javascript"
    showLineNumbers={true}
    onCopy={() => {}}
    darkMode={true}
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
    {codeSnippet}
  </Code>
);

const SomeComponentWithoutPanel = () => (
  <Code
    language="javascript"
    showLineNumbers={true}
    onCopy={() => {}}
    darkMode={true}
    copyButtonAppearance="persist"
  >
    {codeSnippet}
  </Code>
);
```

# Props

## Code

| Prop                                     | Type                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children` (Required)                    | `string`                                                                                                                                                                                                                                                                  | This is the code snippet that will be rendered in the code block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `''`    |
| `language` (Required)                    | `'javascript'`, `'typescript'`, `'cs'`, `'csharp'`, `'cpp'`, `'go'`, `'http'`,`'java'`, `'perl'`, `'php'`, `'python'`, `'ruby'`, `'scala'`, `'swift'`, `'kotlin'`,`'objectivec'`, `'dart'`, `'bash'`, `'shell'`, `'sql'`, `'yaml'`, `'json'`, `'diff'`, `'xml'`, `'none'` | The language to highlight the code block as. When set to `'none'`, no syntax highlighting will be applied.                                                                                                                                                                                                                                                                                                                                                                                                                                        |         |
| `darkMode`                               | `boolean`                                                                                                                                                                                                                                                                 | Determines whether or not the component will appear in dark mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `false` |
| `className`                              | `string`                                                                                                                                                                                                                                                                  | Applies a className to the root element's classList.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |         |
| `showLineNumbers`                        | `boolean`                                                                                                                                                                                                                                                                 | Shows line numbers next to each line of code in the passed code snippet. **NOTE:** While you can set this to `true` regardless of the code component being multiline, the line numbers will not be displayed if the `multiline` prop is `true`.                                                                                                                                                                                                                                                                                                   | `false` |
| `lineNumberStart`                        | `number`                                                                                                                                                                                                                                                                  | Specifies the number by which to start line numbering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `1`     |
| `onCopy`                                 | `Function`                                                                                                                                                                                                                                                                | Callback fired when Code is copied                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |
| `expandable`                             | `boolean`                                                                                                                                                                                                                                                                 | When true, allows the code block to be expanded and collapsed when there are more than 5 lines of code.                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false` |
| `highlightLines`                         | `Array<number` \| `[number, number]>`                                                                                                                                                                                                                                     | An optional array of lines to highlight. The array can only contain numbers corresponding to the line numbers to highlight, and / or tuples representing a range (e.g. `[6, 10]`);                                                                                                                                                                                                                                                                                                                                                                |         |
| `copyButtonAppearance`                   | `'none'`, `'hover'`, `'persist'`                                                                                                                                                                                                                                          | Determines the appearance of the copy button without a panel. The copy button allows the code block to be copied to the user's clipboard by clicking the button. If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible. If `persist`, the copy button will always be visible. If `none`, the copy button will not be rendered. **_Note: `panel` cannot be used with `copyButtonAppearance`. Either use `copyButtonAppearance` or `panel`, not both_**. | `hover` |
| `panel`                                  | `React.ReactNode`                                                                                                                                                                                                                                                         | Slot to pass the `<Panel/>` sub-component which will render the top panel with a language switcher, custom action buttons, and copy button. If no props are passed to the panel sub-component, the panel will render with only the copy button. **_Note: `copyButtonAppearance` cannot be used with `panel`. Either use `copyButtonAppearance` or `panel`, not both._**                                                                                                                                                                           | ``      |
| `isLoading`                              | `boolean`                                                                                                                                                                                                                                                                 | Determines whether or not the loading skeleton will be rendered in place of the code block. If`true`, the language switcher and copy button will be disabled in the top panel.                                                                                                                                                                                                                                                                                                                                                                    | `false` |
| `baseFontSize`                           | `'13'` \| `'16'`                                                                                                                                                                                                                                                          | Determines the base font-size of the component                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `13`    |
| `copyable` (`Deprecated`)                | `boolean`                                                                                                                                                                                                                                                                 | When true, allows the code block to be copied to the user's clipboard. **_Note:_** `@deprecated` - use `<Panel  />` or `copyButtonAppearance`                                                                                                                                                                                                                                                                                                                                                                                                     | `false` |
| `chromeTitle`(`Deprecated`)              | `string`                                                                                                                                                                                                                                                                  | Shows a filename-like title in the window chrome frame.**NOTE:** While you can set this prop if `showWindowChrome` is `false`, it will not be displayed unless the `showWindowChrome` prop is `true`. **_Note:_** `@deprecated` - use `panel={<Panel title={} />}`                                                                                                                                                                                                                                                                                | `''`    |
| `showCustomActionButtons` (`Deprecated`) | `boolean`                                                                                                                                                                                                                                                                 | Shows custom action buttons in the panel if set to `true` and there is at least one item in `customActionButtons`. **_Note:_** `@deprecated` - use `<Panel showCustomActionButtons={} />`                                                                                                                                                                                                                                                                                                                                                         | `false` |
| `customActionButtons`(`Deprecated`)      | `Array<React.ReactElement>`                                                                                                                                                                                                                                               | An array of custom action buttons using the `IconButton` component. For example: `[<IconButton><Icon glyph="Cloud" /></IconButton>, <IconButton><Icon glyph="Code" /></IconButton>]` **_Note:_** `@deprecated` - use `<Panel customActionButtons={} />`                                                                                                                                                                                                                                                                                           | `[]`    |
| `languageOptions` (`Deprecated`)         | `Array<LanguageOption>` (see below)                                                                                                                                                                                                                                       | An array of language options. When provided, a LanguageSwitcher dropdown is rendered. **_Note:_** `@deprecated` - use `<Panel languageOptions={}  />`                                                                                                                                                                                                                                                                                                                                                                                             |         |
| `onChange` (`Deprecated`)                | `(language: LanguageOption) => void`                                                                                                                                                                                                                                      | A change handler triggered when the language is changed. Invalid when no `languageOptions` are provided **_Note:_** `@deprecated` - use `<Panel onChange={}  />`                                                                                                                                                                                                                                                                                                                                                                                  |

## Panel

| Prop                      | Type                                 | Description                                                                                                                                                                          | Default |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `showCustomActionButtons` | `boolean`                            | Shows custom action buttons in the panel if set to `true` and there is at least one item in `customActionButtons`.                                                                   | `false` |
| `customActionButtons`     | `Array<React.ReactElement>`          | An array of custom action buttons using the `IconButton` component. For example: `[<IconButton><Icon glyph="Cloud" /></IconButton>, <IconButton><Icon glyph="Code" /></IconButton>]` | `[]`    |
| `title`                   | `string`                             | Shows a filename-like title in the window chrome frame.                                                                                                                              | `''`    |
| `languageOptions`         | `Array<LanguageOption>`              | An array of language options. When provided, a LanguageSwitcher dropdown is rendered.                                                                                                |         |
| `onChange`                | `(language: LanguageOption) => void` | A change handler triggered when the language is changed. Invalid when no `languageOptions` are provided.                                                                             |         |

```
interface LanguageOption {
  displayName: string;
  language: Language;
  image?: React.ReactElement;
}
```

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with LG `Code` in a product test suite. If the `Code` component cannot be found, an error will be thrown.

### Usage

```tsx
import { getTestUtils } from '@leafygreen-ui/code';

const utils = getTestUtils(lgId?: `lg-${string}`); // lgId refers to the custom `data-lgid` attribute passed to `Code`. It defaults to 'lg-code' if left empty.
```

#### Single `Code` component

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Code, { getTestUtils } from '@leafygreen-ui/code';

...

test('code', () => {
  render(
    <Code
      language="javascript"
      panel={
        <Panel
          onChange={() => {}}
          languageOptions={languageOptions}
          title="Title"
        />
      }
    >
      {codeSnippet}
    </Code>
  );

  const { getLanguage, getLanguageSwitcherUtils, getIsLoading, getCopyButtonUtils, getExpandButtonUtils } = getTestUtils();
  const { getInput, getOptions, getOptionByValue, getInputValue, isDisabled: isLanguageSwitcherDisabled } = getLanguageSwitcherUtils();
  const { getButton, queryButton, findButton, isDisabled } = getCopyButtonUtils();
  const { getButton, queryButton, findButton } = getExpandButtonUtils();

  expect(getLanguage()).toBe('javascript');
  expect(getTitle()).toBe('Title');
  expect(getInput()).toBeInTheDocument();
  expect(getOptions()).toHaveLength(2);
  expect(getOptionByValue('js')).toBeInTheDocument();
  expect(getInputValue()).toBe('javascript');
  expect(isLanguageSwitcherDisabled()).toBe(false);
  expect(getIsLoading()).toBe(false);
  expect(getCopyButtonUtils().getButton()).toBeInTheDocument();
  expect(getCopyButtonUtils().findButton()).toBeInTheDocument();
  expect(getCopyButtonUtils().queryButton()).toBeInTheDocument();
  expect(getCopyButtonUtils().isDisabled()).toBe(false);
  expect(getExpandButtonUtils().getButton()).toBeInTheDocument();
  expect(getExpandButtonUtils().findButton()).toBeInTheDocument();
  expect(getExpandButtonUtils().queryButton()).toBeInTheDocument();
  expect(isExpanded()).toBe(false);
});
```

#### Multiple `Code` components

When testing multiple `Code` components, it is recommended to add the custom `data-lgid` attribute to each `Code`.

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Code, getTestUtils } from '@leafygreen-ui/code';

...

test('code', () => {
  render(
    <>
      <Code
        language="javascript"
        panel={<Panel/>}
        data-lgid="lg-code-1"
      >
      {codeSnippet}
      </Code>
      <Code
        language="python"
        panel={<Panel/>}
        data-lgid="lg-code-2"
      >
        {codeSnippet}
      </Code>
    </>
  );

  const testUtils1 = getTestUtils('lg-code-1');
  const testUtils2 = getTestUtils('lg-code-2');

  // First Code
  expect(testUtils1.getLanguage()).toBe('javascript');

  // Second Code
  expect(testUtils2.getLanguage()).toBe('python');
});
```

### Test Utils

```tsx
const {
  getLanguage,
  getIsLoading,
  getTitle,
  queryPanel,
  getLanguageSwitcherUtils: {
    getInput,
    getOptions,
    getOptionByValue,
    isDisabled,
  },
  getCopyButtonUtils: { getButton, queryButton, findButton, isDisabled },
  getExpandButtonUtils: { getButton, queryButton, findButton },
} = getTestUtils();
```

| Util                         | Description                                              | Returns                                                                                                                  |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `getLanguage()`              | Returns the current language of the code block           | `string`                                                                                                                 |
| `getLanguageSwitcherUtils()` | Returns utils for interacting with the language switcher | `LanguageSwitcherUtils`                                                                                                  |
| `getIsLoading()`             | Returns whether the code block is in loading state       | `boolean`                                                                                                                |
| `getCopyButtonUtils()`       | Returns utils for interacting with the copy button       | [Button test utils return type](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#test-utils) |
| `getExpandButtonUtils()`     | Returns utils for interacting with the expand button     | [Button test utils return type](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#test-utils) |
| `getIsExpanded()`            | Returns whether the code block is expanded               | `boolean`                                                                                                                |
| `getTitle()`                 | Returns the title of the code block                      | `string` \| `null`                                                                                                       |
| `queryPanel()`               | Returns the panel element                                | `HTMLElement` \| `null`                                                                                                  |

### LanguageSwitcherUtils

| Util                              | Description                                       | Returns                 |
| --------------------------------- | ------------------------------------------------- | ----------------------- |
| `getInput()`                      | Returns the language switcher trigger             | `HTMLButtonElement`     |
| `getInputValue()`                 | Returns the language switcher input value         | `string`                |
| `getOptions()`                    | Returns all options in the language switcher      | `Array<HTMLElement>`    |
| `getOptionByValue(value: string)` | Returns the option element by its value           | `HTMLElement` \| `null` |
| `isDisabled()`                    | Returns whether the language switcher is disabled | `boolean`               |
