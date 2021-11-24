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

export type LineHighlightingDefinition = ReadonlyArray<
  number | readonly [number, number]
>;

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
   * default: `false`
   */
  darkMode?: boolean;

  /**
   * Shows line numbers. This is specifically used for the Code component implementation.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;

  /**
   * Specifies the number by which to start line numbering.
   *
   * default: 0
   */
  lineOffset?: number;

  /**
   * An array of lines to highlight. The array can only contain numbers corresponding to the line numbers to highlight, and / or tuples representing a range (e.g. `[6, 10]`);
   */
  highlightLines?: LineHighlightingDefinition;
}

export type CodeProps = Omit<
  SyntaxProps,
  'onCopy' | 'language' | 'onChange'
> & {
  /**
   * Shows window chrome for code block;
   *
   * default: `false`
   */
  showWindowChrome?: boolean;

  /**
   * Renders a file name or other descriptor for a block of code
   */
  chromeTitle?: string;

  /**
   * When true, allows the code block to be copied to the user's clipboard by clicking the rendered copy button.
   *
   * default: `true`
   */
  copyable?: boolean;

  /**
   * Callback fired when Code is copied via the copy button.
   *
   */
  onCopy?: Function;

  /**
   * Custom action buttons.
   *
   */
  customActionButtons?: Array<React.ReactNode>;

  /**
   * When true, custom action buttons will be shown.
   *
   */
  showCustomActionButtons?: boolean;
} & (
    | { language: Language; languageOptions?: undefined; onChange?: undefined }
    | {
        onChange: (arg0: LanguageOption) => void;
        language: LanguageOption['displayName'];
        languageOptions: Array<LanguageOption>;
      }
  );

export interface LanguageOption {
  displayName: string;
  language: Language;
  image?: React.ReactElement;
}

export interface LanguageSwitcher {
  onChange: (arg0: LanguageOption) => void;
  language: LanguageOption['displayName'];
  languageOptions: Array<LanguageOption>;
}
