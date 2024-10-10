import { HTMLElementProps } from '@leafygreen-ui/lib';

import { SupportedLanguages } from './languages';

export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = (typeof Mode)[keyof typeof Mode];

export const Language = {
  ...SupportedLanguages,
  None: 'none',
} as const;

export type Language = (typeof Language)[keyof typeof Language];

export type LineHighlightingDefinition = ReadonlyArray<
  number | readonly [number, number]
>;

export interface SyntaxProps extends HTMLElementProps<'code'> {
  /**
   * The children to render inside Code. This is usually going to be a formatted code block or line.
   * @required
   */
  children: string;

  /**
   * The language to highlight the syntax of.
   */
  language: Language;

  /**
   * Shows line numbers. This is specifically used for the Code component implementation.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;

  /**
   * Specifies the number by which to start line numbering.
   *
   * default: `1`
   */
  lineNumberStart?: number;

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
   * @default: `false`
   */
  showWindowChrome?: boolean;

  /**
   * Renders a file name or other descriptor for a block of code
   */
  chromeTitle?: string;

  /**
   * When true, allows the code block to be copied to the user's clipboard by clicking the rendered copy button.
   *
   * @default: `true`
   */
  copyable?: boolean;

  /**
   * Makes code blocks longer than 5 lines long expandable
   *
   * @default `false`
   */
  expandable?: boolean;

  /**
   * Callback fired when Code is copied via the copy button.
   *
   */
  onCopy?: Function;

  /**
   * Custom action buttons. Should be an array of `IconButton`.
   *
   * @type <IconButton />[]
   */
  customActionButtons?: Array<React.ReactElement>;

  /**
   * When true, custom action buttons will be shown.
   *
   */
  showCustomActionButtons?: boolean;

  /**
   * Determines whether or not the syntax will be rendered in dark mode.
   *
   * @default `false`
   */
  darkMode?: boolean;
} & (
    | {
        /**
         * The language to format the code. See {@link https://github.com/mongodb/leafygreen-ui/blob/main/packages/code/src/languages.ts | SupportedLanguages}.
         */
        language: Language;
        languageOptions?: undefined;
        onChange?: undefined;
      }
    | {
        /**
         * The `displayName` of the selected `languageOption`
         */
        language: LanguageOption['displayName'];
        /**
         * An array of `LanguageOptions` to select from. Enables the Language switcher.
         */
        languageOptions: Array<LanguageOption>;
        /**
         * Callback fired when the language option changes.
         */
        onChange: (arg0: LanguageOption) => void;
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
