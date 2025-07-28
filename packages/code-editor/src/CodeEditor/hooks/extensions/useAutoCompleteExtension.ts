import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';
import { LanguageName } from './useLanguageExtension';

export function useAutoCompleteExtension({
  editorView,
  stateModule,
  language,
  autoCompleteModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  language?: LanguageName;
  autoCompleteModule?: typeof import('@codemirror/autocomplete');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: { language, autoCompleteModule },
    factory: ({ language, autoCompleteModule }) =>
      language && autoCompleteModule ? autoCompleteModule.autocompletion() : [],
  });
}
