import { BaseFontSize } from '@leafygreen-ui/tokens';

import { LanguageOption } from '../Panel/Panel.types';
import { SyntaxProps } from '../Syntax/Syntax.types';
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
   * The language to format the code. See {@link https://github.com/mongodb/leafygreen-ui/blob/main/packages/code/src/languages.ts | SupportedLanguages}.
   */

  language: Language | LanguageOption['displayName'];

  /**
   * Determines whether or not the loading skeleton will be rendered in place of the code block.
   *
   * @default `false`
   */
  isLoading?: boolean;

  /**
   * Custom action buttons. Should be an array of `IconButton`.
   *
   * @type <IconButton />[]
   * use `<Panel customActionButtons={} />` instead
   *
   * @deprecated
   */
  customActionButtons?: Array<React.ReactElement>;

  /**
   * When true, custom action buttons will be shown.
   *
   * Use `panel={<Panel showCustomActionButtons={} />}` instead
   *
   *@deprecated
   */
  showCustomActionButtons?: boolean;

  /**
   * Renders a file name or other descriptor for a block of code
   *
   * Use `panel={<Panel title={} />}` instead
   *
   * @deprecated
   */
  chromeTitle?: string;

  /**
   * use `panel={<Panel languageOptions={} />}` instead
   * @deprecated
   */
  languageOptions?: Array<LanguageOption>;

  /**
   * use `panel={<Panel onChange={}/>}` instead
   * @deprecated
   */
  onChange?: (arg0: LanguageOption) => void;

  /**
   * When true, allows the code block to be copied to the user's clipboard by clicking the rendered copy button.
   *
   * Use `panel={<Panel />}` or `copyButtonAppearance` instead
   *
   * @default `false`
   * @deprecated
   */
  copyable?: boolean;

  /**
   * Determines the base font-size of the component
   *
   * @default 13
   */
  baseFontSize?: BaseFontSize;

  /**
   * Custom keywords to be highlighted in the code block. The key is the keyword to be highlighted, and the value is the classname to be applied to the keyword.
   *
   * E.g. `customKeywordObject: {{'keyword': 'className' }}`
   */
  customKeywordObject?: Record<string, string>;
} & (
    | {
        /**
         * Determines the appearance of the copy button without a panel. The copy button allows the code block to be copied to the user's clipboard by clicking the button.
         *
         * If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible.
         *
         * If `persist`, the copy button will always be visible.
         *
         * If `none`, the copy button will not be rendered.
         *
         * Note: 'panel' cannot be used with `copyButtonAppearance`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         * @default `hover`
         */
        copyButtonAppearance?: CopyButtonAppearance;

        /**
         * Slot to pass the `<Panel/>` sub-component which will render the top panel with a language switcher, custom action buttons, and copy button. If no props are passed to the panel sub-component, the panel will render with only the copy button. Note: `copyButtonAppearance` cannot be used with `panel`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         */
        panel?: never;
      }
    | {
        /**
         * Determines the appearance of the copy button without a panel. The copy button allows the code block to be copied to the user's clipboard by clicking the button.
         *
         * If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible.
         *
         * If `persist`, the copy button will always be visible.
         *
         * If `none`, the copy button will not be rendered.
         *
         * Note: 'panel' cannot be used with `copyButtonAppearance`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         * @default `hover`
         */
        copyButtonAppearance?: never;

        /**
         * Slot to pass the `<Panel/>` sub-component which will render the top panel with a language switcher, custom action buttons, and copy button. If no props are passed to the panel sub-component, the panel will render with only the copy button. Note: `copyButtonAppearance` cannot be used with `panel`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         */
        panel?: React.ReactNode;
      }
  );
