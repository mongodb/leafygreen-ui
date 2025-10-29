import { type EditorView } from '@codemirror/view';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  fontFamilies,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import {
  type CodeEditorProps,
  CodeEditorSelectors,
} from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useExtension } from './useExtension';

export const LINE_HEIGHT = 1.5;
export const PADDING_TOP = spacing[200];
export const PADDING_BOTTOM = spacing[200];

/**
 * Hook for applying LeafyGreen UI theme styling to the CodeMirror editor.
 *
 * This extension applies consistent theming to match the LeafyGreen design system,
 * including colors, typography, spacing, and border radius. It supports both
 * light and dark themes and adapts the editor's appearance based on the current
 * theme and font size settings.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - CodeEditor props including darkMode and baseFontSize
 * @param params.modules - Module dependencies (requires @codemirror/view for EditorView.theme)
 * @returns A CodeMirror extension that applies LeafyGreen theming
 */
export function useThemeExtension({
  editorViewInstance,
  props,
  modules,
  hasPanel,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps> & {
    baseFontSize: number;
  };
  modules: Partial<CodeEditorModules>;
  hasPanel: boolean;
}) {
  const { theme } = useDarkMode(props.darkMode);

  return useExtension({
    editorViewInstance,
    stateModule: modules?.['@codemirror/state'],
    value: {
      theme,
      fontSize: props.baseFontSize,
      editorViewModule: modules?.['@codemirror/view'],
    },
    factory: ({ theme, fontSize, editorViewModule }) => {
      if (!editorViewModule || !editorViewModule.EditorView) {
        return [];
      }

      return editorViewModule.EditorView.theme(
        {
          '&': {
            backgroundColor:
              color[theme].background[Variant.Primary][
                InteractionState.Default
              ],
            border: `1px solid
              ${
                color[theme].border[Variant.Secondary][InteractionState.Default]
              }`,
            borderBottomLeftRadius: `${borderRadius[300]}px`,
            borderBottomRightRadius: `${borderRadius[300]}px`,
            borderTopLeftRadius: hasPanel ? 0 : `${borderRadius[300]}px`,
            borderTopRightRadius: hasPanel ? 0 : `${borderRadius[300]}px`,
            color: color[theme].text[Variant.Primary][InteractionState.Default],
            position: 'relative',
            overflow: 'hidden',
          },

          [`&${CodeEditorSelectors.Focused}`]: {
            outline: 'none',
            border: `1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]}`,
          },

          [CodeEditorSelectors.Scroller]: {
            paddingTop: `${PADDING_TOP}px`,
            paddingBottom: `${PADDING_BOTTOM}px`,
            zIndex: 2, // this is set so that the bottom shadow render below the scrollbar
          },

          [CodeEditorSelectors.FoldPlaceholder]: {
            background: 'transparent',
          },

          [CodeEditorSelectors.Content]: {
            fontFamily: fontFamilies.code,
            fontSize: `${fontSize}px`,
            padding: '0px',
          },

          [CodeEditorSelectors.Gutters]: {
            color:
              color[theme].text[Variant.Secondary][InteractionState.Default],
            border: 'none',
            borderTopLeftRadius: `${borderRadius[300]}px`,
            borderBottomLeftRadius: `${borderRadius[300]}px`,
            fontFamily: fontFamilies.code,
            fontSize: `${fontSize}px`,
            // Forces the gutters to scroll with content to make shadows work
            position: 'static !important',
            background: 'transparent',
          },

          [`${CodeEditorSelectors.LineNumbers} ${CodeEditorSelectors.GutterElement}`]:
            {
              width: '48px',
              userSelect: 'none',
              // Set on the fold gutter element instead so there's still padding when line numbers are disabled
              paddingRight: 0,
            },

          [`${CodeEditorSelectors.FoldGutter} ${CodeEditorSelectors.GutterElement}`]:
            {
              paddingLeft: `${spacing[100]}px`,
            },

          [CodeEditorSelectors.Line]: {
            lineHeight: LINE_HEIGHT,
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
            background: 'rgba(1, 107, 248, 0.25) !important',
          },

          [CodeEditorSelectors.Tooltip]: {
            backgroundColor: 'none',
            border: 'none',
          },

          [CodeEditorSelectors.Diagnostic]: {
            border: 'none',
            padding: 0,
          },

          [CodeEditorSelectors.DiagnosticInfo]: {
            border: 'none',
          },

          [CodeEditorSelectors.SearchPanelContainer]: {
            backgroundColor: 'transparent',
          },

          [CodeEditorSelectors.SearchPanelContainerTop]: {
            border: 'none',
          },

          [`${CodeEditorSelectors.SearchMatch}:not(${CodeEditorSelectors.SearchMatchSelected}), 
            ${CodeEditorSelectors.SearchMatch}:not(${CodeEditorSelectors.SearchMatchSelected}) > *`]:
            {
              backgroundColor: palette.yellow.light2,
              color:
                color[Theme.Light].text[Variant.Primary][
                  InteractionState.Default
                ],
            },

          [`${CodeEditorSelectors.SearchMatchSelected}, ${CodeEditorSelectors.SearchMatchSelected} > *`]:
            {
              backgroundColor: `${palette.yellow.base}`,
              color:
                color[Theme.Light].text[Variant.Primary][
                  InteractionState.Default
                ],
            },
        },
        { dark: theme === Theme.Dark },
      );
    },
  });
}
