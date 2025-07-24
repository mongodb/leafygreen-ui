import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { renderToString } from 'react-dom/server';
import { forceParsing } from '@codemirror/language';
import CodeMirror, {
  Compartment,
  EditorState,
  EditorView,
  Prec,
} from '@uiw/react-codemirror';

import { cx } from '@leafygreen-ui/emotion';
import { css } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { createHighlightExtension } from './codeMirrorExtensions/createHighlightExtension';
import { createLanguageExtension } from './codeMirrorExtensions/createLanguageExtension';
import { createThemeExtension } from './codeMirrorExtensions/createThemeExtension';
import { createTooltipsExtension } from './codeMirrorExtensions/createTooltipsExtension';
import { useExtension } from './hooks/useExtension';
import { useHyperLinkExtension } from './hooks/useHyperLinkExtension';
import { useLazyModules } from './hooks/useLazyModules';
import { useLineWrapExtension } from './hooks/useLineWrapExtension';
import { useModuleLoaders } from './hooks/useModuleLoaders';
import { getEditorStyles } from './CodeEditor.styles';
import {
  type CodeEditorProps,
  type CodeMirrorExtension,
  type CodeMirrorRef,
  IndentUnits,
} from './CodeEditor.types';

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
    const [languageExtension, setLanguageExtension] =
      useState<CodeMirrorExtension>([]);
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

    const indentExtension = useExtension(
      editorRef.current?.view || null,
      {
        unit: indentUnit,
        size: indentSize,
        module: modules['@codemirror/language'],
      },
      ({ unit, size, module }) => {
        if (!module || !module.indentUnit) {
          return [];
        }

        let indentString: string;

        if (unit === IndentUnits.Tab) {
          indentString = '\t';
        } else {
          indentString = ' '.repeat(size);
        }

        return [
          module.indentUnit.of(indentString),
          EditorState.tabSize.of(size),
        ];
      },
    );

    const foldGutterExtension = useExtension(
      editorRef.current?.view || null,
      {
        enable: enableCodeFolding,
        module: modules['@codemirror/language'],
      },
      ({ enable, module }) => {
        if (!enable || !module || !module.foldGutter) {
          return [];
        }

        return module.foldGutter({
          markerDOM: (open: boolean) => {
            const icon = document.createElement('span');
            icon.className = 'cm-custom-fold-marker';
            icon.innerHTML = renderToString(
              open ? (
                <Icon
                  glyph="ChevronDown"
                  size="small"
                  className={css`
                    margin-top: 2px;
                  `}
                />
              ) : (
                <Icon
                  glyph="ChevronRight"
                  size="small"
                  className={css`
                    margin-top: 2px;
                  `}
                />
              ),
            );
            return icon;
          },
        });
      },
    );

    const tooltipExtension = useExtension(
      editorRef.current?.view || null,
      {
        tooltips,
      },
      ({ tooltips }) =>
        tooltips.length > 0 ? [createTooltipsExtension(tooltips)] : [],
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

    const onCreateEditor = useCallback(
      (editorView: EditorView) => {
        if (forceParsingProp) {
          const { state } = editorView;

          if (state.doc.length > 0) {
            forceParsing(editorView, state.doc.length, 150);
          }
        }
      },
      [forceParsingProp],
    );

    /**
     * Handles setting up language support. This is done separately because
     * it is an asynchronous operation that requires dynamic imports.
     */
    useEffect(() => {
      async function setupLanguageExtension() {
        const languageCompartment = new Compartment();
        setLanguageExtension(
          languageCompartment.of(
            language ? await createLanguageExtension(language) : [],
          ),
        );
      }
      setupLanguageExtension();
    }, [language]);

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
        theme={[
          createThemeExtension(theme, baseFontSize),
          createHighlightExtension(theme),
        ]}
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
