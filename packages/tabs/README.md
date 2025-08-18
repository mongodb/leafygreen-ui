# Tabs

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tabs.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/tabs/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/tabs
```

### Yarn

```shell
yarn add @leafygreen-ui/tabs
```

### NPM

```shell
npm install @leafygreen-ui/tabs
```

## Example

### Uncontrolled

```tsx
import { Tabs, Tab } from '@leafygreen-ui/tabs';

<Tabs aria-label="Uncontrolled tabs example">
  <Tab name="Tab one" default>
    Tab one content
  </Tab>
  <Tab name="Tab two">Tab two content</Tab>
  <Tab name="Tab three">Tab three content</Tab>
</Tabs>;
```

### Controlled

```tsx
import { useState } from 'react';
import { Tabs, Tab } from '@leafygreen-ui/tabs';

const [value, setValue] = useState(0);

const handleValueChange = (val: number) => {
  setValue(val);
};

<Tabs
  aria-label="Controlled tabs example"
  value={value}
  onValueChange={handleValueChange}
>
  <Tab name="Tab one">Tab one content</Tab>
  <Tab name="Tab two">Tab two content</Tab>
  <Tab name="Tab three">Tab three content</Tab>
</Tabs>;
```

## Properties

| Prop            | Type                                 | Description                                                                                                                                                                                                                                                       | Default     |
| --------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `as`            | `React.ElementType`                  | Sets the root element of all `<Tab />` components in `<Tabs />`. For example, setting as to `Link` will render each tab as a `<Link />` component rather than as a button.                                                                                        | `button`    |
| `baseFontSize`  | `13` \| `16`                         | Determines `font-size` for Tabs Component                                                                                                                                                                                                                         | `13`        |
| `children`      | `node`                               | `<Tab />` components that will be supplied to `<Tabs />` component.                                                                                                                                                                                               |             |
| `className`     | `string`                             | Adds a className to the root element.                                                                                                                                                                                                                             |             |
| `darkMode`      | `boolean`                            | Determines whether or not the component will appear in DarkMode                                                                                                                                                                                                   | `false`     |
| `onValueChange` | `(value: number \| string) => void;` | Event handler called when the selected tab changes. This is only invoked if the `value` prop is defined.                                                                                                                                                          |             |
| `size`          | `'small'` \| `'default'`             | Determines `size` for Tabs Component                                                                                                                                                                                                                              | `'default'` |
| `value`         | `'number'` \| `'string'`             | Index or name of the selected tab. If using the name, pass the text content from the `Tab` instance's `name` prop. Providing this prop will switch the `Tabs` instance to controlled mode. If a value that cannot be found is provided, nothing will be selected. |             |

_Any other properties supplied will be spread on the root element._

# Tab

## Properties

| Prop              | Type                                               | Description                                                                                                                                             | Default |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children`        | `node`                                             | Content that appears inside the `<Tab />` component                                                                                                     |         |
| `className`       | `string`                                           | Adds a className to the root element.                                                                                                                   |         |
| `default`         | `boolean`                                          | Should be supplied when using the uncontrolled `<Tabs />` component. This determines which tab will be active by default.                               |         |
| `disabled`        | `boolean`                                          | Indicates whether or not the `<Tab />` can be clicked by a user.                                                                                        | `false` |
| `index`           | `number`                                           | The index of the Tab instance. The index of the initially selected Tab is required in SSR environments to ensure the Tab is selected on initial render. |         |
| `href`            | `string`                                           | Destination when Tab's `name` in the list should be rendered as an `a` tag.                                                                             |         |
| `name` (Required) | `string`, `ReactNode`                              | String that will appear in the list of tabs.                                                                                                            |         |
| `to`              | `string`                                           | Destination when Tab's `name` in the list should be rendered as a `Link` tag.                                                                           |         |
| ...               | native attributes of component passed to `as` prop | Any other props will be spread on the root element                                                                                                      |         |

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with `LG Tabs` in a product test suite. If the `Tabs` component cannot be found, an error will be thrown.

### Usage

```tsx
import { getTestUtils } from '@leafygreen-ui/tabs';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Tabs`. It defaults to 'lg-tabs' if left empty.
```

#### Single `Tabs` component

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab, getTestUtils } from '@leafygreen-ui/tabs';

...

test('tabs', () => {
  render(
    <Tabs aria-label="Label">
      <Tab name="First" default>
        Content 1
      </Tab>
      <Tab name="Second">
        Content 2
      </Tab>
      <Tab name="Third">
        Content 3
      </Tab>
    </Tabs>
  );

  const { getAllTabPanelsInDOM, getAllTabsInTabList, getSelectedPanel, getTabUtilsByName } = getTestUtils();

  expect(getAllTabsInTabList()).toHaveLength(3);
  expect(getAllTabPanelsInDOM()).toHaveLength(1);

  const firstTabUtils = getTabUtilsByName('First');
  expect(firstTabUtils.isSelected()).toBeTruthy();

  expect(getSelectedPanel()).toHaveTextContent('Content 1');

  const secondTabUtils = getTabUtilsByName('Second');

  // click to second tab
  if (secondTabUtils) {
    userEvent.click(secondTabUtils.getTab());
  }
  // selected panel text content is updated
  expect(getSelectedPanel()).toHaveTextContent('Content 2');
});
```

#### Multiple `Tabs` components

When testing multiple `Tabs` components, it is recommended to add the custom `data-lgid` attribute to each `Tabs`.

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab, getTestUtils } from '@leafygreen-ui/tabs';

...

test('tabs', () => {
  render(
    <>
      <Tabs aria-label="Label ABC" data-lgid="tabs-abc">
        <Tab name="A" default>
          Content A
        </Tab>
        <Tab name="B">
          Content B
        </Tab>
        <Tab name="C">
          Content C
        </Tab>
      </Tabs>
      <Tabs aria-label="Label XY" data-lgid="tabs-xy" forceRenderAllTabPanels={true}>
        <Tab name="X">
          Content X
        </Tab>
        <Tab name="Y" default>
          Content Y
        </Tab>
      </Tabs>
    </>
  );

  const testUtils1 = getTestUtils('tabs-abc'); // data-lgid
  const testUtils2 = getTestUtils('tabs-xy'); // data-lgid

  // First tabs
  expect(testUtils1.getAllTabsInTabList()).toHaveLength(3);
  expect(testUtils1.getAllTabPanelsInDOM()).toHaveLength(1);
  expect(testUtils1.getSelectedPanel()).toHaveTextContent('Content A');

  // Second tabs
  expect(testUtils2.getAllTabsInTabList()).toHaveLength(2);
  expect(testUtils2.getAllTabPanelsInDOM()).toHaveLength(2);
  expect(testUtils2.getSelectedPanel()).toHaveTextContent('Content Y');
});
```

### Test Utils

```tsx
const {
  getAllTabPanelsInDOM,
  getAllTabsInTabList,
  getTabUtilsByName: { getTab, isSelected, isDisabled },
  getSelectedPanel,
} = getTestUtils();
```

| Util                     | Description                                          | Returns                 |
| ------------------------ | ---------------------------------------------------- | ----------------------- |
| `getAllTabPanelsInDOM()` | Returns an array of tab panels                       | `Array<HTMLElement>`    |
| `getAllTabsInTabList()`  | Returns an array of tabs                             | `Array<HTMLElement>`    |
| `getSelectedPanel()`     | Returns the selected tab panel                       | `HTMLElement` \| `null` |
| `getTabUtilsByName()`    | Returns tab utils if tab with matching name is found | `TabUtils` \| `null`    |
| TabUtils                 |                                                      |                         |
| `getTab()`               | Returns the tab                                      | `HTMLElement`           |
| `isSelected()`           | Returns whether the tab is selected                  | `boolean`               |
| `isDisabled()`           | Returns whether the tab is disabled                  | `boolean`               |

## Reference

### Usage with NextJS Link components

Tabs may not render with the correct tags or styles if the NextJS Link component is passed to the `as` prop directly, given how NextJS handles default rendering of the component based on the `href` prop. To work around this, pass the NextJS Link as shown below.

```
import NextLink from 'next/link';

function Linker({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}

<Tabs aria-label="Profile Sections" as={Linker}>
...
</Tabs>
```
