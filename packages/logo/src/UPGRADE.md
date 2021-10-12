# v5 to v6

This update brings new logo designs to LeafyGreen, as well as deprecates and removes a number of now unsupported logos. When upgrading this component, also please reference the "Logo Reference" file when replacing a logo that's been removed from LeafyGreen. If you don't know what that is, please reach out to the Design Systems team in #leafygreen-ui.

## `Logo`

- `Logo` has been renamed to `MongoDBLogo`.
- Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
- Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
- Removed the `product` prop. All supported product lockups are now their own components.
- Removed the `lockup` prop. There is now only one supported orientation for logo lockups.
- Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

### How to upgrade

If you **are not** using the `product` prop, or it's set to `'none'`:

- Update component imports from importing `Logo` to `MongoDBLogo`.
- If `knockout={false}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-dark-2'`.
- If `knockout={false}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-base'`.
- If `knockout={true}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='black'`.
- If `knockout={true}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='white'`.

If you **are** using the `product` prop, see the "Logo Reference" file. If you don't know what that is, please reach out to the Design Systems team in #leafygreen-ui.

## `LogoMark`

- `LogoMark` has been renamed to `MongoDBLogoMark`.
- Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
- Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
- Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

### How to upgrade

- Update component imports from importing `LogoMark` to `MongoDBLogoMark`.
- If `knockout={false}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-dark-2'`.
- If `knockout={false}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-base'`.
- If `knockout={true}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='black'`.
- If `knockout={true}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='white'`.

## `AtlasLogo`

- `AtlasLogo` has been renamed to `AtlasLogoLockup`.
- Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
- Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
- Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

### How to upgrade

- Update component imports from importing `LogoMark` to `MongoDBLogoMark`.
- If `knockout={false}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-dark-2'`.
- If `knockout={false}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-base'`.
- If `knockout={true}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='black'`.
- If `knockout={true}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='white'`.

## `RealmLogo`

- `RealmLogo` has been renamed to `RealmLogoLockup`.
- Added the `color` prop. The color prop lets you set the logo to one of four supported colors that the logo can appear in.
- Removed the `knockout` prop. The knockout prop was for a separate version of the logo that could be monochromatic. That's no longer needed.
- Removed the `darkMode` prop. Versions that can be used on dark backgrounds are available now through the `color` prop.

### How to upgrade

- Update component imports from importing `LogoMark` to `MongoDBLogoMark`.
- If `knockout={false}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-dark-2'`.
- If `knockout={false}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='green-base'`.
- If `knockout={true}` and `darkMode={false | undefined}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='black'`.
- If `knockout={true}` and `darkMode={true}`:
  - Remove the `knockout` and `darkMode` props.
  - Set `color='white'`.

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
