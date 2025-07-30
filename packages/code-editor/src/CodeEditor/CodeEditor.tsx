import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { type EditorView } from '@codemirror/view';

import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { usePlaceholderExtension } from './hooks/extensions/usePlaceholderExtension';
import {
  getEditorStyles,
  getLoaderStyles,
  getLoadingTextStyles,
} from './CodeEditor.styles';
import { CodeEditorHandle, type CodeEditorProps } from './CodeEditor.types';
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
      forceParsing: forceParsingProp = false,
      language,
      onChange: onChangeProp,
      isLoading: isLoadingProp = false,
      extensions: consumerExtensions = [],
      darkMode: darkModeProp,
      className,
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      width,
      enableClickableUrls,
      enableCodeFolding,
      enableLineNumbers,
      enableLineWrapping,
      indentUnit,
      indentSize,
      placeholder,
      readOnly,
      tooltips,
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
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const codeFoldingExtension = useCodeFoldingExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const highlightExtension = useHighlightExtension({
      editorViewInstance: editorViewRef.current,
      props: { ...props, theme },
      modules,
    });

    const hyperLinkExtension = useHyperLinkExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const lineWrapExtension = useLineWrapExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const lineNumbersExtension = useLineNumbersExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const indentExtension = useIndentExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const placeholderExtension = usePlaceholderExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const tooltipExtension = useTooltipExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const languageExtension = useLanguageExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const themeExtension = useThemeExtension({
      editorViewInstance: editorViewRef.current,
      props: { ...props, theme, baseFontSize },
      modules,
    });

    const readOnlyExtension = useReadOnlyExtension({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
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
          placeholderExtension,
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
      placeholderExtension,
    ]);

    useImperativeHandle(forwardedRef, () => ({
      getEditorViewInstance: () => editorViewRef.current,
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
