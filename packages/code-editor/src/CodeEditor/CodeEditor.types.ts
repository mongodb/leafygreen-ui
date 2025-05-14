import { type Extension } from '@uiw/react-codemirror';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type CodeMirrorExtension = Extension;
export type { ReactCodeMirrorRef } from '@uiw/react-codemirror';

export interface CodeEditorProps extends DarkModeProps {
  enableActiveLineHighlighting?: boolean;
  enableClickableUrls?: boolean;
  enableCodeFolding?: boolean;
  enableLineNumbers?: boolean;
  enableLineWrapping?: boolean;
  forceParsing?: boolean;
  placeholder?: HTMLElement | string;
  readOnly?: boolean;
  value?: string;
}
