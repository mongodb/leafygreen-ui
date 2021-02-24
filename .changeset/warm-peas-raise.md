---
'@leafygreen-ui/logo': major
---

- Adds `product` and `lockup` props to `<Logo />` component, which allow for replacing "MongoDB" with a product name, and for controlling the orientation of the logo, respectively.
- Renames existing product-specific logos from Logo to LogoMark, as that is more descriptive of what is being rendered. (e.g. `<AtlasLogo />` is now `<AtlasLogoMark />`)
- Adds LogoMark components for Atlas, Charts, CloudManager, Compass, DriversConnectors, Realm, and Server.
- Adds Logo components for Atlas, Charts, CloudManager, and Realm.
