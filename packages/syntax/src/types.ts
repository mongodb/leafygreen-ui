import { SupportedLanguages } from './languages';

export const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

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
   * The variant for the syntax-highlighted block.
   *
   * default: `'light'`
   */
  variant?: Variant;

  /**
   * Shows line numbers. This is specifically used for the Code component implementation.
   *
   * default: `'false'`
   */
  showLineNumbers?: boolean;
}
