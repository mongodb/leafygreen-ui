# @leafygreen-ui/logo

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
