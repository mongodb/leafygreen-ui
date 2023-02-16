import { Theme } from './DarkModeProps';

/**
 *
 * Given a `darkMode` boolean, returns a `Theme` value - either dark or light.
 *
 * @param darkMode
 * @returns `Theme.Dark || Theme.Light`
 */
const getTheme = (darkMode: boolean): Theme =>
  darkMode ? Theme.Dark : Theme.Light;

export default getTheme;
