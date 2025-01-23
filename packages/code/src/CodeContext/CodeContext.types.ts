import { DarkModeProps } from '@leafygreen-ui/lib';
import { LanguageOption } from '../Panel/Panel.types';
import { Language } from '../types';

export type CodeProviderProps = DarkModeProps & {
  /**
   * The contents of the code snippet.
   */
  contents: string;

  /**
   * The language of the code snippet.
   */
  language: Language | LanguageOption['displayName'];
};
