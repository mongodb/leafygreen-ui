import { DarkModeProps } from '@leafygreen-ui/lib';
import { type BaseFontSize } from '@leafygreen-ui/tokens';

import { CodeMirrorView } from '../CodeEditor';

export interface SearchPanelProps extends DarkModeProps {
  /**
   * Font size of text in the editor.
   *
   * @default 13
   */
  baseFontSize?: BaseFontSize;

  /**
   * The CodeMirror view instance.
   */
  view: CodeMirrorView;
}
