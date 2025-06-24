import { EditorView } from '@uiw/react-codemirror';

import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

import { CodeEditorSelectors, CodeMirrorExtension } from '../CodeEditor.types';

/**
 * The styles applied are meant to approximate the scheme defined for the `Code`
 * component syntax, defined in packages/code/src/globalStyles.tsx
 */
export const createThemeExtension = (
  theme: Theme,
  fontSize: number,
): CodeMirrorExtension => {
  /**
   * For more information on styling CodeMirror, see: https://codemirror.net/examples/styling/
   */
  return EditorView.theme(
    {
      '&': {
        backgroundColor:
          color[theme].background[Variant.Primary][InteractionState.Default],
        color: color[theme].text[Variant.Primary][InteractionState.Default],
        border: 'none',
      },

      [`&${CodeEditorSelectors.Focused}`]: {
        outline: 'none',
      },

      [CodeEditorSelectors.Content]: {
        fontFamily: fontFamilies.code,
        fontSize: `${fontSize}px`,
      },

      [CodeEditorSelectors.Gutters]: {
        backgroundColor:
          color[theme].background[Variant.Primary][InteractionState.Default],
        color: color[theme].text[Variant.Secondary][InteractionState.Default],
        border: 'none',
        borderTopLeftRadius: `${borderRadius[300]}px`,
        borderBottomLeftRadius: `${borderRadius[300]}px`,
        fontFamily: fontFamilies.code,
        fontSize: `${fontSize}px`,
      },

      [`${CodeEditorSelectors.LineNumbers} ${CodeEditorSelectors.GutterElement}`]:
        {
          width: '48px',
        },

      [CodeEditorSelectors.Line]: {
        paddingLeft: '12px',
      },

      [CodeEditorSelectors.SelectionBackground]: {
        background: 'rgba(1, 107, 248, 0.25) !important',
      },
    },
    { dark: theme === Theme.Dark },
  );
};
