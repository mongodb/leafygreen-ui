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

export const Mode = { Light: 'light', Dark: 'dark' } as const;
type ModeType = typeof Mode[keyof typeof Mode];

export type { ModeType };
