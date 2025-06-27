# Theme Toggle for LeafyGreen UI Storybook

This addon adds a theme toggle button to the Storybook toolbar that allows you to switch between light and dark themes.

## Usage

The theme toggle button appears in the Storybook toolbar. Clicking it will switch between light and dark themes.

You can also use the keyboard shortcut `T` to toggle the theme.

## Integration with LeafyGreen Components

The theme toggle works by:

1. Setting a global parameter with the current theme (light or dark)
2. Applying a decorator to all stories that reads this parameter
3. Updating the LeafyGreen provider's `darkMode` prop accordingly

For this to work properly with your components, they should be wrapped in a `LeafyGreenProvider` component.

## Customization

If you need to customize how the theme is applied, you can modify the `withTheme.ts` decorator in the addon source.
