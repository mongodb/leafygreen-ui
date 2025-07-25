import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';
import { LanguageName } from './useLanguageExtension';

export function useAutoCompleteExtension(
  view: EditorView | null,
  language?: LanguageName,
  module?: typeof import('@codemirror/autocomplete'),
) {
  return useExtension(
    view || null,
    {
      language,
      module,
    },
    ({ language, module }) =>
      language && module ? module.autocompletion() : [],
  );
}
