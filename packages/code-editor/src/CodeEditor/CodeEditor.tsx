import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { type EditorView } from '@codemirror/view';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getEditorStyles } from './CodeEditor.styles';
import { type CodeEditorProps, IndentUnits } from './CodeEditor.types';
import {
  useFoldGutterExtension,
  useHighlightExtension,
  useHyperLinkExtension,
  useIndentExtension,
  useLanguageExtension,
  useLazyModules,
  useLineWrapExtension,
  useModuleLoaders,
  useThemeExtension,
  useTooltipExtension,
} from './hooks';

export const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>(
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
    const ref = useMergeRefs([editorContainerRef, forwardedRef]);

    const moduleLoaders = useModuleLoaders(props);
    const { isLoading, modules } = useLazyModules(moduleLoaders);

    const hyperLinkExtension = useHyperLinkExtension(
      editorViewRef.current,
      enableClickableUrls,
      modules?.['@uiw/codemirror-extensions-hyper-link'],
    );

    const lineWrapExtension = useLineWrapExtension(
      editorViewRef.current,
      enableLineWrapping,
    );

    const indentExtension = useIndentExtension(
      editorViewRef.current,
      indentUnit,
      indentSize,
      modules?.['@codemirror/language'],
    );

    const foldGutterExtension = useFoldGutterExtension(
      editorViewRef.current,
      enableCodeFolding,
      modules?.['@codemirror/language'],
    );

    const tooltipExtension = useTooltipExtension(
      editorViewRef.current,
      tooltips,
      modules?.['@codemirror/lint'],
    );

    const languageExtension = useLanguageExtension(
      editorViewRef.current,
      language,
      modules,
    );

    const highlightExtension = useHighlightExtension(
      editorViewRef.current,
      theme,
      language,
      modules,
    );

    const themeExtension = useThemeExtension(
      editorViewRef.current,
      theme,
      baseFontSize,
      modules?.['@codemirror/view'],
    );

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
          languageExtension,
          lineWrapExtension,
          hyperLinkExtension,
          indentExtension,
          foldGutterExtension,
          tooltipExtension,
          themeExtension,
          highlightExtension,
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
      foldGutterExtension,
      tooltipExtension,
      themeExtension,
      highlightExtension,
      modules,
      controlledValue,
      defaultValue,
      isControlled,
      onChangeProp,
      forceParsingProp,
    ]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div
        ref={ref}
        className={cx(
          getEditorStyles({
            width,
            minWidth,
            maxWidth,
            height,
            minHeight,
            maxHeight,
          }),
          className,
        )}
        {...rest}
      />
    );

    // return (
    //   <CodeMirror
    //     value={value}
    //     onChange={onChange}
    //     onCreateEditor={onCreateEditor}
    //     readOnly={readOnly}
    //     placeholder={placeholder}
    //     className={cx(
    //       getEditorStyles({
    //         width,
    //         minWidth,
    //         maxWidth,
    //         height,
    //         minHeight,
    //         maxHeight,
    //       }),
    //       className, // class styles override inline styles
    //     )}
    //     /**
    //      * `theme` prop is used instead of just adding these to extensions
    //      * list because it automates updating on theme change.
    //      */
    //     theme={[themeExtension, highlightExtension]}
    //     extensions={[
    //       ...consumerExtensions.map(extension => Prec.highest(extension)),
    //       // ...customExtensions,
    //       languageExtension,
    //       lineWrapExtension,
    //       hyperLinkExtension,
    //       indentExtension,
    //       foldGutterExtension,
    //       tooltipExtension,
    //     ]}
    //     basicSetup={{
    //       allowMultipleSelections: true,
    //       foldGutter: false, // Custom fold gutter is used instead
    //       highlightActiveLine: false,
    //       highlightActiveLineGutter: false,
    //       lineNumbers: enableLineNumbers,
    //     }}
    //     ref={ref}
    //     {...rest}
    //   />
    // );
  },
);

CodeEditor.displayName = 'CodeEditor';
