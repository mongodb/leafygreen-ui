import { LanguageOption } from '../Panel/Panel.types';
import { SyntaxProps } from '../syntax/Syntax.types';
import { Language } from '../types';

export const ScrollState = {
  None: 'none',
  Left: 'left',
  Right: 'right',
  Both: 'both',
} as const;

export type ScrollState = (typeof ScrollState)[keyof typeof ScrollState];

export type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

export type CodeProps = Omit<
  SyntaxProps,
  'onCopy' | 'language' | 'onChange'
> & {
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
   * Determines whether or not the syntax will be rendered in dark mode.
   *
   * @default `false`
   */
  darkMode?: boolean;

  /**
   * Slot that renders the top panel. This is used for rendering the language switcher, custom action buttons, and copy button.
   *
   */
  panel?: React.ReactNode;

  /**
   * The language to format the code. See {@link https://github.com/mongodb/leafygreen-ui/blob/main/packages/code/src/languages.ts | SupportedLanguages}.
   */

  language: Language | LanguageOption;

  /**
   * Custom action buttons. Should be an array of `IconButton`.
   *
   * @type <IconButton />[]
   * use `<Panel customActionButtons={}>` instead
   * @deprecated
   */
  customActionButtons?: Array<React.ReactElement>;

  /**
   * When true, custom action buttons will be shown.
   *
   * Use `panel={<Panel showCustomActionButtons={}>}` instead
   *@deprecated
   */
  showCustomActionButtons?: boolean;

  /**
   * Renders a file name or other descriptor for a block of code
   * use `<Panel title={}>` instead
   * @deprecated
   */
  chromeTitle?: string;

  /**
   * use `<Panel languageOptions={}>` instead
   * @deprecated
   */
  languageOptions?: Array<LanguageOption>;

  /**
   * use `<Panel onChange={}>` instead
   * @deprecated
   */
  onChange?: (arg0: LanguageOption) => void;
};
