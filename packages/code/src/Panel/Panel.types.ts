import { ComponentPropsWithRef } from 'react';
import { Language } from '../types';

export interface LanguageOption {
  /**
   * This display name for the language option
   */
  displayName: string;

  /**
   * The language enum value
   */
  language: Language;
}

export type PanelProps = Omit<
  ComponentPropsWithRef<'div'>,
  'onChange' | 'onCopy'
> & {
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
   * Renders a file name or other descriptor for a block of code
   */
  title?: string;
} & (
    | {
        languageOptions?: undefined;
        onChange?: undefined;
      }
    | {
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
