import type { Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type CodeMirrorExtension = Extension;
export type CodeMirrorRef = ReactCodeMirrorRef;

export interface CodeEditorProps extends DarkModeProps {
  /**
   * Enables highlighting of the active line.
   */
  enableActiveLineHighlighting?: boolean;
  /**
   * Renders URLs as clickable links in the editor.
   */
  enableClickableUrls?: boolean;
  /**
   * Enables code folding arrows in the gutter.
   */
  enableCodeFolding?: boolean;
  /**
   * Enables line numbers in the editor’s gutter.
   */
  enableLineNumbers?: boolean;
  /**
   * Enables line wrapping when the text exceeds the editor’s width.
   */
  enableLineWrapping?: boolean;
  /**
   * Forces parsing of complete document, even if it is not visible. USE WITH CAUTION!
   * By default the editor only parses the visible part of the code on the
   * screen. This significantly increases performance when there is a lot of
   * code rendered. When enabled, this forces parsing of non-visible code.
   * This should only be used in exceptional cases.
   */
  forceParsing?: boolean;
  /**
   * Initial value to render in the editor.
   */
  intialValue?: string;
  /**
   * Callback that receives the updated editor value when changes are made.
   */
  onChange?: (value: string) => void;
  /**
   * Value to display in the editor when it is empty.
   */
  placeholder?: HTMLElement | string;
  /**
   * Enables read only mode, making the contents uneditable.
   */
  readOnly?: boolean;
}
