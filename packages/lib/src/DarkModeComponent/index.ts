/**
 * Base interface used by components that support dark mode.
 * 
 * @public
 */
interface DarkModeComponent {
/**
 * Renders the component with dark mode styles.
 */
  darkMode?: boolean;
}

export const Mode = {  Light: 'light',  Dark: 'dark' } as const;
type ModeType = typeof Mode[keyof typeof Mode]; 

export type { ModeType };
export default DarkModeComponent;