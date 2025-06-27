import { css } from '@leafygreen-ui/emotion';

import { CodeEditorSelectors } from './CodeEditor.types';

export const getEditorStyles = ({
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
}: {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}) => ({
  [css`
    ${CodeEditorSelectors.Editor} {
      height: ${height};
    }
  `]: !!height,
  [css`
    ${CodeEditorSelectors.Editor} {
      max-height: ${maxHeight};
    }
  `]: !!maxHeight,
  [css`
    ${CodeEditorSelectors.Editor} {
      min-height: ${minHeight};
    }
  `]: !!minHeight,
  [css`
    ${CodeEditorSelectors.Editor} {
      width: ${width};
    }
  `]: !!width,
  [css`
    ${CodeEditorSelectors.Editor} {
      max-width: ${maxWidth};
    }
  `]: !!maxWidth,

  [css`
    ${CodeEditorSelectors.Editor} {
      min-width: ${minWidth};
    }
  `]: !!minWidth,
});
