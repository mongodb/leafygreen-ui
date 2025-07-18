import { DarkModeProps } from '@leafygreen-ui/lib';

import { LanguageOption } from '../Panel/Panel.types';
import { Language } from '../types';
import { GetLgIdsReturnType } from '../utils';

export type CodeProviderProps = DarkModeProps & {
  /**
   * The contents of the code snippet.
   */
  contents: string;

  /**
   * The language of the code snippet.
   */
  language: Language | LanguageOption['displayName'];

  /**
   * Whether or not the code snippet has a panel.
   */
  showPanel: boolean;

  /**
   * Whether the loading skeleton should be shown.
   */
  isLoading: boolean;

  /**
   * LGIDs for the code snippet.
   */
  lgIds: GetLgIdsReturnType;
};
