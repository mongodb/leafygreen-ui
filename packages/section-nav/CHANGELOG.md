# @leafygreen-ui/section-nav

## 1.0.1

### Patch Changes

- 56c0d3b: - Updates usages of `bold` weight token to `semiBold`.

  Note: This should have no visual impact since the font-face being used was already semi-bold/600px. It just updates the token used to better align with the font-face and Figma component.

- Updated dependencies [56c0d3b]
- Updated dependencies [56c0d3b]
  - @leafygreen-ui/typography@22.1.0
  - @leafygreen-ui/tokens@3.2.0

## 1.0.0

### Major Changes

- 55c78d8: Initial release of `SectionNav`. Refer to the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/section-nav/README.md) for more information on usage and available props.

  ```tsx
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
