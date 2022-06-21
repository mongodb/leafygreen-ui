/**
 * Base interface used by components that support dark mode.
 *
 * @public
 */
export default interface DarkModeProps {
  /**
   * Renders the component with dark mode styles.
   *
   * @default false
   */
  darkMode?: boolean;
}

export const Theme = { Light: 'light', Dark: 'dark' } as const;
type ThemeType = typeof Theme[keyof typeof Theme];

export type { ThemeType };
