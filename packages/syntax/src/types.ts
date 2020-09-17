import { SupportedLanguages } from './languages';

export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

export const Language = {
  ...SupportedLanguages,
  None: 'none',
} as const;

export type Language = typeof Language[keyof typeof Language];

export interface SyntaxProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The children to render inside Code. This is usually going to be a formatted code block or line.
   */
  children: string;

  /**
   * An additional CSS class applied to the root element
   */
  className?: string;

  /**
   * The language to highlight the syntax of.
   */
  language: Language;

  /**
   * Determines whether or not the syntax will be rendered in dark mode.
   *
   * @default: `false`
   */
  darkMode?: boolean;
  /**
   * Shows line numbers. This is specifically used for the Code component implementation.
   *
   * @default: `false`
   */
  showLineNumbers?: boolean;
}
