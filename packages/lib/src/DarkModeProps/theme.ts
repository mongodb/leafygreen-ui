export const Theme = { Light: 'light', Dark: 'dark' } as const;
export type Theme = typeof Theme[keyof typeof Theme];

/**
 *
 * Given a `darkMode` boolean, returns a `Theme` value - either dark or light.
 *
 * @param darkMode
 * @returns `Theme.Dark || Theme.Light`
 */
export const getTheme = (darkMode: boolean) =>
  darkMode ? Theme.Dark : Theme.Light;
