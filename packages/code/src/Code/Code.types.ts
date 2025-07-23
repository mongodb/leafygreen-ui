import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
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

export type CodeProps = Omit<SyntaxProps, 'onCopy' | 'language' | 'onChange'> &
  LgIdProps &
  DarkModeProps & {
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
     * Determines the base font-size of the component
     *
     * @default 13
     */
    baseFontSize?: BaseFontSize;

    /**
     * Custom keywords to be wrapped in the className of your choice in the code block. The key is the keyword to be wrapped in the custom `<span>`, and the value is the classname to be applied to the keyword. You can then use CSS to style the keyword.
     *
     * E.g. `customKeywords: {{'password': 'custom' }}`
     * Renders as `<span className="lg-highlight-custom">password</span>`
     */
    customKeywords?: { [key: string]: string };
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
