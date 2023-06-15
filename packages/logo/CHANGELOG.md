# @leafygreen-ui/logo

## 8.0.4

### Patch Changes

- 76161cf0: Minor fixes to stories
- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0

## 8.0.3

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/lib@10.3.4

## 8.0.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3

## 8.0.1

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2

## 8.0.0

### Major Changes

- 4f4590fb0: Removes Realm lockup logo from logo package

### Patch Changes

- Updated dependencies [2e8a572db]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
  - @leafygreen-ui/lib@10.2.1

## 7.0.2

### Patch Changes

- bf2fedf6d: Version bumps lib

## 7.0.1

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/palette@3.4.5

## 7.0.0

### Major Changes

- a4895e02: Renames `AtlasLogo` (incorrect) to `AtlasNavGraphic`

## 6.3.0

### Minor Changes

- a855b513: Adds new Atlas logo

## 6.2.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.

## 6.2.0

### Minor Changes

- 3690df49: Exports a generic `Logo` component.

### Patch Changes

- 3690df49: Updates `tsdoc.json` file

## 6.1.3

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files

## 6.1.2

### Patch Changes

- 2b6f86d2: Update SupportedColorsMap to pull from palette and remove all instances of uiColors

## 6.1.1

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls

## 6.1.0

### Minor Changes

- 45bf8ca1: Adds MongoDB University and Atlas for Government logo lockups.

## 6.0.0

### Major Changes

- 23b89952: ## `Logo`

  - `Logo` has been renamed to `MongoDBLogo`.
  - Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
  - Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
  - Removed the `product` prop. All supported product lockups are now their own components.
  - Removed the `lockup` prop. There is now only one supported orientation for logo lockups.
  - Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

  ## `LogoMark`

  - `LogoMark` has been renamed to `MongoDBLogoMark`.
  - Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
  - Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
  - Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

  ## `AtlasLogo`

  - `AtlasLogo` has been renamed to `AtlasLogoLockup`.
  - Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
  - Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
  - Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

  ## `RealmLogo`

  - `RealmLogo` has been renamed to `RealmLogoLockup`.
  - Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
  - Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
  - Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

  ## `EnterpriseAdvancedLogoLockup`

  - `EnterpriseAdvancedLogoLockup` has been added.

  ## `CommunityEditionLogoLockup`

  - `CommunityEditionLogoLockup` has been added.

  ## `ServerLogoMark`

  - `ServerLogoMark` has been removed.

  ## `DriversConnectorsLogoMark`

  - `DriversConnectorsLogoMark` has been removed.

  ## `CompassLogoMark`

  - `CompassLogoMark` has been removed.

  ## `CloudManagerLogo`

  - `CloudManagerLogo` has been removed.

  ## `CloudManagerLogoMark`

  - `CloudManagerLogoMark` has been removed.

  ## `ChartsLogo`

  - `ChartsLogo` has been removed.

## 5.0.0

### Major Changes

- 28373d63: - Adds `product` and `lockup` props to `<Logo />` component, which allow for replacing "MongoDB" with a product name, and for controlling the orientation of the logo, respectively.
  - Renames existing product-specific logos from Logo to LogoMark, as that is more descriptive of what is being rendered. (e.g. `<AtlasLogo />` is now `<AtlasLogoMark />`)
  - Adds LogoMark components for Atlas, Charts, CloudManager, Compass, DriversConnectors, Realm, and Server.
  - Adds Logo components for Atlas, Charts, CloudManager, and Realm.

## 4.0.2

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes

## 4.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed

## 4.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/emotion@3.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 3.0.0

### Major Changes

- 1a127dc8: Deprecates `variant` prop in favor of `darkMode` prop to control whether or not the Logo component appears in dark mode.

## 2.1.2

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 2.1.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 2.1.0

### Minor Changes

- 9ddfb51: Adds Product Logos to logo package

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/emotion@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 1.0.0

### Major Changes

- 4f2fbe2: Initial implementation of Logo component

### Patch Changes

- Updated dependencies [319844d]
  - @leafygreen-ui/palette@1.1.1
