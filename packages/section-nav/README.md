# Section Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/section-nav.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/section-nav/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/section-nav
```

### Yarn

```shell
yarn add @leafygreen-ui/section-nav
```

### NPM

```shell
npm install @leafygreen-ui/section-nav
```

## Example

```js
import {SectionNav, SectionNavItem} from `@leafygreen-ui/section-nav`;

<SectionNav>
   <SectionNavItem href="#section-1" label="Section 1">
      <SectionNavItem href="#section-1.1" label="Section 1.1" />
    </SectionNavItem>
    <SectionNavItem href="#section-2" label="Section 2" />
    <SectionNavItem active href="#section-3" label="Section 3">
      <SectionNavItem href="#section-3.1" label="Section 3.1" />
      <SectionNavItem href="#section-3.2" label="Section 3.2" />
    </SectionNavItem>
</SectionNav>
```

### SectionNav

#### Props

| Prop        | Type              | Description                                              | Default          |
| ----------- | ----------------- | -------------------------------------------------------- | ---------------- |
| `darkMode`  | `boolean`         | Determines if the component will render in dark mode     | `false`          |
| `data-lgid` | `lg-${string}`    | Custom testid to pass to getTestUtils                    | `lg-section-nav` |
| `children`  | `React.ReactNode` | Child elements to render inside the SectionNav component | `null`           |

\+ other HTML `nav` element props

### SectionNavItem

#### Props

| Prop       | Type              | Description                                                     | Default |
| ---------- | ----------------- | --------------------------------------------------------------- | ------- |
| `href`     | `string`          | The id of the heading. This should be an id on the current page |         |
| `label`    | `ReactNode`       | The text to display in the section nav item                     |         |
| `active`   | `boolean`         | Determines if the item is active                                | `false` |
| `children` | `React.ReactNode` | Child elements to render inside the SectionNavItem component    | `null`  |

\+ other HTML `a` element props

## Test Harnesses

### getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with LG `SectionNav` in a product test suite. If the `SectionNav` component cannot be found, an error will be thrown.

### Usage

```tsx
import {getTestUtils} from '@leafygreen-ui/section-nav/testing';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `SectionNav`. It defaults to 'lg-section-nav' if left empty.

```

#### Single `SectionNav` component

```tsx
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SectionNav, SectionNavItem} from '@leafygreen-ui/section-nav';
import {getTestUtils} from '@leafygreen-ui/section-nav/testing';

...

test('SectionNav', () => {
  render(
    <SectionNav>
      <SectionNavItem href="#section-1" label="Section 1" />
      <SectionNavItem href="#section-2" label="Section 2" />
      <SectionNavItem active href="#section-3" label="Section 3">
        <SectionNavItem href="#section-3.1" label="Section 3.1" />
        <SectionNavItem href="#section-3.2" label="Section 3.2" />
      </SectionNavItem>
    </SectionNav>,
  );

  const {
    findSectionNav,
    getSectionNav,
    querySectionNav,
    getTitle,
    getAllSectionNavItems,
    getSectionNavItemByLabel,
    getActiveSectionNavItem
  } = getTestUtils();

  expect(await findSectionNav()).toBeInTheDocument();
  expect(getSectionNav()).toBeInTheDocument();
  expect(querySectionNav()).toBeInTheDocument();
  expect(getAllSectionNavItems().length).toBe(5);
  expect(getSectionNavItemByLabel('Section 1')?.getElement()).toBeInTheDocument();
  expect(getActiveSectionNavItem()).toHaveAttribute('data-active','true');
});
```

### Test Utils

```tsx
const {
  findSectionNav,
  getSectionNav,
  querySectionNav,
  getTitle,
  getAllSectionNavItems,
  getSectionNavItemByLabel,
  getActiveSectionNavItem,
} = getTestUtils();
```

| Util                         | Description                                                                                                                                                           | Returns                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `findSectionNav()`           | Returns a promise that resolves to the element using the `data-lgid` data attribute. The promise is rejected if no elements match or if more than one match is found. | `() => Promise<HTMLButtonElement>`     |
| `getSectionNav()`            | Returns the element using the `data-lgid` data attribute. Will throw if no elements match or if more than one match is found.                                         | `() => HTMLButtonElement`              |
| `querySectionNav()`          | Returns the element using the `data-lgid` data attribute or `null` if no elements match. Will throw if more than one match is found.                                  | `() => HTMLButtonElement \| null`      |
| `getAllSectionNavItems()`    | Returns an array of all `<SectionNavItem    />`                                                                                                                       | `() => Array<HTMLButtonElement>`       |
| `getSectionNavItemByLabel()` | Returns the `<SectionNavItem />` based on the label                                                                                                                   | interface SectionNavItemUtils {        |
|  |
| `getActiveSectionNavItem()`  | Returns the first active `<SectionNavItem />`                                                                                                                         | `() => HTMLButtonElement \| undefined` |
| `getTitle()`                 | Returns the title of the SectionNav component                                                                                                                         | `() => HTMLHeadingElement \| null`     |
