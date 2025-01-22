import { ComponentPropsWithRef } from 'react';
import { Language } from '../types';

export interface LanguageOption {
  displayName: string;
  language: Language;
}

export interface LanguageSwitcherProps {
  onChange: (arg0: LanguageOption) => void;
  language: LanguageOption['displayName'];
  languageOptions: Array<LanguageOption>;
}

export type PanelProps = Partial<Omit<LanguageSwitcherProps, 'language'>> &
  Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'onCopy'> & {
    /**
     * Callback fired when Code is copied via the copy button.
     *
     */
    onCopy?: Function;

    /**
     * The language to format the code and the `displayName` of the selected `languageOption`.
     */
    language?: LanguageOption;

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
  };
