import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { type EditorView } from '@codemirror/view';

import { useMergeRefs } from '@leafygreen-ui/hooks';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import {
  getEditorStyles,
  getLoaderStyles,
  getLoadingTextStyles,
} from './CodeEditor.styles';
import {
  CodeEditorHandle,
  type CodeEditorProps,
  IndentUnits,
} from './CodeEditor.types';
import {
  useAutoCompleteExtension,
  useCodeFoldingExtension,
  useHighlightExtension,
  useHyperLinkExtension,
  useIndentExtension,
  useLanguageExtension,
  useLazyModules,
  useLineNumbersExtension,
  useLineWrapExtension,
  useModuleLoaders,
  useReadOnlyExtension,
  useThemeExtension,
  useTooltipExtension,
} from './hooks';

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (props, forwardedRef) => {
    const {
      defaultValue,
      value,
      enableClickableUrls = true,
      enableCodeFolding = true,
      enableLineNumbers = true,
      enableLineWrapping = true,
      forceParsing: forceParsingProp = false,
      language,
      onChange: onChangeProp,
      placeholder,
      readOnly = false,
      indentUnit = IndentUnits.Space,
      indentSize = 2,
      isLoading: isLoadingProp = false,
      tooltips = [],
      extensions: consumerExtensions = [],
      darkMode: darkModeProp,
      className,
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      width,
      ...rest
    } = props;

    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useBaseFontSize();
    const [controlledValue, setControlledValue] = useState(value || '');
    const isControlled = value !== undefined;
    const editorContainerRef = useRef<HTMLDivElement | null>(null);
    const editorViewRef = useRef<EditorView | null>(null);

    const moduleLoaders = useModuleLoaders(props);
    const { isLoading, modules } = useLazyModules(moduleLoaders);

    const autoCompleteExtension = useAutoCompleteExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      language,
      autoCompleteModule: modules?.['@codemirror/autocomplete'],
    });

    const codeFoldingExtension = useCodeFoldingExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      enableCodeFolding,
      languageModule: modules?.['@codemirror/language'],
    });

    const highlightExtension = useHighlightExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      theme,
      language,
      modules,
    });

    const hyperLinkExtension = useHyperLinkExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      enableClickableUrls,
      hyperLinkModule: modules?.['@uiw/codemirror-extensions-hyper-link'],
    });

    const lineWrapExtension = useLineWrapExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      enableLineWrapping,
      viewModule: modules?.['@codemirror/view'],
    });

    const lineNumbersExtension = useLineNumbersExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      enableLineNumbers,
      viewModule: modules?.['@codemirror/view'],
    });

    const indentExtension = useIndentExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      indentUnit,
      indentSize,
      languageModule: modules?.['@codemirror/language'],
    });

    const tooltipExtension = useTooltipExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      tooltips,
      lintModule: modules?.['@codemirror/lint'],
    });

    const languageExtension = useLanguageExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      language,
      modules,
    });

    const themeExtension = useThemeExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      theme,
      baseFontSize,
      viewModule: modules?.['@codemirror/view'],
    });

    const readOnlyExtension = useReadOnlyExtension({
      editorView: editorViewRef.current,
      stateModule: modules?.['@codemirror/state'],
      readOnly,
    });

    useLayoutEffect(() => {
      const EditorView = modules?.['@codemirror/view'];
      const commands = modules?.['@codemirror/commands'];
      const Prec = modules?.['@codemirror/state']?.Prec;

      if (!editorContainerRef?.current || !EditorView || !Prec || !commands) {
        return;
      }

      const domNode = editorContainerRef.current;

      const editor = (editorViewRef.current = new EditorView.EditorView({
        doc: controlledValue || defaultValue,
        parent: domNode,
        extensions: [
          ...consumerExtensions.map(extension => Prec.highest(extension)),

          // Core configurations ------------
          commands.history(),

          EditorView.EditorView.updateListener.of(update => {
            if (isControlled && update.docChanged) {
              const editorText = editor.state.sliceDoc() ?? '';
              onChangeProp?.(editorText);
              setControlledValue(editorText);
            }
          }),

          EditorView.keymap.of([
            ...commands.defaultKeymap,
            ...commands.historyKeymap,
          ]),

          // Custom extensions ------------
          languageExtension,
          lineNumbersExtension,
          lineWrapExtension,
          hyperLinkExtension,
          indentExtension,
          codeFoldingExtension,
          tooltipExtension,
          themeExtension,
          highlightExtension,
          autoCompleteExtension,
          readOnlyExtension,
        ],
      }));

      if (forceParsingProp) {
        const Language = modules?.['@codemirror/language'];
        const docLength = editor.state.doc.length;

        if (Language && Language.forceParsing && docLength > 0) {
          Language.forceParsing(editor, docLength, 150);
        }
      }

      return () => {
        delete (domNode as any)._cm;
        editor.destroy();
      };
    }, [
      consumerExtensions,
      value,
      languageExtension,
      lineWrapExtension,
      hyperLinkExtension,
      indentExtension,
      codeFoldingExtension,
      tooltipExtension,
      themeExtension,
      highlightExtension,
      modules,
      controlledValue,
      defaultValue,
      isControlled,
      onChangeProp,
      forceParsingProp,
      autoCompleteExtension,
      lineNumbersExtension,
      readOnlyExtension,
    ]);

    useImperativeHandle(forwardedRef, () => ({
      getEditorView: () => editorViewRef.current,
    }));

    return (
      <div
        ref={editorContainerRef}
        className={getEditorStyles({
          width,
          minWidth,
          maxWidth,
          height,
          minHeight,
          maxHeight,
          className,
        })}
        {...rest}
      >
        {(isLoadingProp || isLoading) && (
          <div
            className={getLoaderStyles({
              theme,
              width,
              minWidth,
              maxWidth,
              height,
              minHeight,
              maxHeight,
            })}
          >
            <Body className={getLoadingTextStyles(theme)}>
              Loading code editor...
            </Body>
          </div>
        )}
      </div>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';
