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

export const CopyButtonAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

export type CopyButtonAppearance =
  (typeof CopyButtonAppearance)[keyof typeof CopyButtonAppearance];

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
   * Determines the appearance of the copy button when the panel is not present. The copy button allows the code block to be copied to the user's clipboard by clicking the button.
   *
   * If `hover`, the copy button will only appear when the user hovers over the code block.
   *
   * If `persist`, the copy button will always be visible.
   *
   * If `none`, the copy button will not be rendered.
   *
   * If there is a panel, this prop will be ignored. TODO: is this a goood decision?
   *
   * @default `hover`
   */
  copyButtonAppearance?: CopyButtonAppearance;

  /**
   * Determines whether or not the loading skeleton will be rendered in place of the code block.
   *
   * @default `false`
   */
  isLoading?: boolean;
};
