// import { EditorView } from '@uiw/react-codemirror';
import { type EditorView } from '@codemirror/view';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
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
  ToolbarVariant,
} from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

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
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps> & {
    baseFontSize: number;
  };
  modules: Partial<CodeEditorModules>;
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
            color: color[theme].text[Variant.Primary][InteractionState.Default],
            border: `1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]}`,

            borderBottomLeftRadius: `${borderRadius[300]}px`,
            borderBottomRightRadius: `${borderRadius[300]}px`,

            borderTopLeftRadius:
              props.toolbarVariant === ToolbarVariant.Window
                ? 0
                : `${borderRadius[300]}px`,
            borderTopRightRadius:
              props.toolbarVariant === ToolbarVariant.Window
                ? 0
                : `${borderRadius[300]}px`,
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
              color[theme].background[Variant.Primary][
                InteractionState.Default
              ],
            color:
              color[theme].text[Variant.Secondary][InteractionState.Default],
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
            background: 'rgba(1, 107, 248, 0.25) !important',
          },
        },
        { dark: theme === Theme.Dark },
      );
    },
  });
}
