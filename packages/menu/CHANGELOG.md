# @leafygreen-ui/menu

## 2.0.0

### Major Changes

- 7825641: Updated Menu API, such that the controlled version now accepts open and setOpen props. Using setOpen allows leafygreen to handle backdrop clicks and escape key-presses for consuming applications.

  - Previously the prop that controlled whether or not the Menu component would appear as open was called `active`, now the prop's name is `open`.
  - Added `setOpen` prop to allow leafygreen to help a consuming application, using the controlled api, close `Menu` component when backdrop is clicked or escape key is pressed.
  - Added `shouldClose` prop, so that consuming application can opt-out of default closing behavior.

  Patched a bug in useEventListener hook
