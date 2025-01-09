import { ComponentPropsWithRef } from 'react';
import { Language } from '../types';

export interface LanguageOption {
  displayName: string;
  language: Language;
  image?: React.ReactElement;
}

export interface LanguageSwitcherProps {
  onChange: (arg0: LanguageOption) => void;
  language: LanguageOption['displayName'];
  languageOptions: Array<LanguageOption>;
}

export type PanelProps = Partial<Omit<LanguageSwitcherProps, 'language'>> &
  ComponentPropsWithRef<'div'> & {
    /**
     * Callback fired when Code is copied via the copy button.
     *
     */
    onCopy?: Function;

    // TODO: this needs to be in a context
    contents: string;

    language?: LanguageOption;
    customActionButtons?: Array<React.ReactElement>;
    showCustomActionButtons?: boolean;

    /**
     * Renders a file name or other descriptor for a block of code
     */
    title?: string;
  };
