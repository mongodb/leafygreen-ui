import { EditorView } from '@uiw/react-codemirror';

import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  InteractionState,
  spacing,
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
        border: `1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]}`,
        borderRadius: `${borderRadius[300]}px`,
      },

      [`&${CodeEditorSelectors.Focused}`]: {
        outline: 'none',
        border: `1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]}`,
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
        paddingLeft: `${spacing[300]}px`,
      },

      [CodeEditorSelectors.SelectionBackground]: {
        /**
         * The background was not getting applied correctly without !important.
         * I'm not entirely sure why, but there must be a sheet being applied
         * higher or with greater specificity. It was hard to track down because
         * for some reason our background color was getting applied correctly
         * as soon as I'd select text and pull it up in devtools. ¯\_(ツ)_/¯
         */
        background: 'rgba(1, 107, 248, 0.25)',
      },
    },
    { dark: theme === Theme.Dark },
  );
};
