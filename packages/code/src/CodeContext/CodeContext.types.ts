import { DarkModeProps } from '@leafygreen-ui/lib';
import { PropsWithChildren } from 'react';
import { LanguageOption } from '../Panel/Panel.types';
import { Language } from '../types';

export type CodeProviderProps = PropsWithChildren &
  DarkModeProps & {
    /**
     * The contents of the code snippet.
     */
    contents: string;

    /**
     * The language of the code snippet.
     */
    language: Language | LanguageOption;
  };
