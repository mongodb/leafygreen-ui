import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

export function useHyperLinkExtension({
  editorViewInstance,
  props,
  modules,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  return useExtension({
    editorViewInstance,
    stateModule: modules?.['@codemirror/state'],
    value: {
      enable: props.enableClickableUrls,
      module: modules?.['@uiw/codemirror-extensions-hyper-link'],
    },
    factory: ({ enable, module }) =>
      enable && module?.hyperLink ? module.hyperLink : [],
  });
}
