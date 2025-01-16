import { DarkModeProps } from '@leafygreen-ui/lib';
import { PropsWithChildren } from 'react';
import { LanguageOption } from '../Panel/Panel.types';
import { Language } from '../types';

export type CodeProviderProps = PropsWithChildren &
  DarkModeProps & {
    contents: string;
    language: Language | LanguageOption;
    customActionButtons?: Array<React.ReactElement>;
    showCustomActionButtons?: boolean;
    chromeTitle?: string;
  };
