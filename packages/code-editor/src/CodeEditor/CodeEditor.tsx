import React, { forwardRef, useCallback, useRef, useState } from 'react';
import CodeMirror, { type EditorView, Prec } from '@uiw/react-codemirror';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getEditorStyles } from './CodeEditor.styles';
import {
  type CodeEditorProps,
  type CodeMirrorRef,
  IndentUnits,
} from './CodeEditor.types';
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

export const CodeEditor = forwardRef<CodeMirrorRef, CodeEditorProps>(
  (props, forwardedRef) => {
    const {
      defaultValue,
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
    const [value, setValue] = useState(defaultValue || '');
    const editorRef = useRef<CodeMirrorRef>(null);
    const ref = useMergeRefs([editorRef, forwardedRef]);

    const moduleLoaders = useModuleLoaders(props);
    const { isLoading, modules } = useLazyModules(moduleLoaders);
    const editorView = editorRef.current?.view || null;

    const hyperLinkExtension = useHyperLinkExtension(
      editorView,
      enableClickableUrls,
      modules?.['@uiw/codemirror-extensions-hyper-link'],
    );

    const lineWrapExtension = useLineWrapExtension(
      editorView,
      enableLineWrapping,
    );

    const indentExtension = useIndentExtension(
      editorView,
      indentUnit,
      indentSize,
      modules?.['@codemirror/language'],
    );

    const foldGutterExtension = useFoldGutterExtension(
      editorView,
      enableCodeFolding,
      modules?.['@codemirror/language'],
    );

    const tooltipExtension = useTooltipExtension(
      editorView,
      tooltips,
      modules?.['@codemirror/lint'],
    );

    const languageExtension = useLanguageExtension(
      editorView,
      language,
      modules,
    );

    const highlightExtension = useHighlightExtension(
      editorView,
      theme,
      language,
      modules,
    );

    const themeExtension = useThemeExtension(editorView, theme, baseFontSize);

    const onCreateEditor = useCallback(
      (editorView: EditorView) => {
        if (forceParsingProp) {
          const { state } = editorView;
          const forceParsing = modules?.['@codemirror/language']?.forceParsing;

          if (forceParsing && state.doc.length > 0) {
            forceParsing(editorView, state.doc.length, 150);
          }
        }
      },
      [forceParsingProp, modules],
    );

    const onChange = useCallback(
      (val: string) => {
        setValue(val);

        if (onChangeProp) {
          onChangeProp(val);
        }
      },
      [onChangeProp],
    );

    if (isLoading) {
      return (
        <div
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
        >
          Loading...
        </div>
      );
    }

    return (
      <CodeMirror
        value={value}
        onChange={onChange}
        onCreateEditor={onCreateEditor}
        readOnly={readOnly}
        placeholder={placeholder}
        className={cx(
          getEditorStyles({
            width,
            minWidth,
            maxWidth,
            height,
            minHeight,
            maxHeight,
          }),
          className, // class styles override inline styles
        )}
        /**
         * `theme` prop is used instead of just adding these to extensions
         * list because it automates updating on theme change.
         */
        theme={[themeExtension, highlightExtension]}
        extensions={[
          ...consumerExtensions.map(extension => Prec.highest(extension)),
          // ...customExtensions,
          languageExtension,
          lineWrapExtension,
          hyperLinkExtension,
          indentExtension,
          foldGutterExtension,
          tooltipExtension,
        ]}
        basicSetup={{
          allowMultipleSelections: true,
          foldGutter: false, // Custom fold gutter is used instead
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          lineNumbers: enableLineNumbers,
        }}
        ref={ref}
        {...rest}
      />
    );
  },
);

CodeEditor.displayName = 'CodeEditor';
