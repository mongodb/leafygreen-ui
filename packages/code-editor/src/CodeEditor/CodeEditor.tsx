import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { renderToString } from 'react-dom/server';
import {
  foldGutter,
  forceParsing,
  indentUnit as indentUnitFacet,
} from '@codemirror/language';
import { hyperLink } from '@uiw/codemirror-extensions-hyper-link';
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
import { getEditorStyles } from './CodeEditor.styles';
import {
  type CodeEditorProps,
  type CodeMirrorExtension,
  type CodeMirrorRef,
  IndentUnits,
} from './CodeEditor.types';

export const CodeEditor = forwardRef<CodeMirrorRef, CodeEditorProps>(
  (
    {
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
    },
    forwardedRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useBaseFontSize();
    const [value, setValue] = useState(defaultValue || '');
    const [languageExtension, setLanguageExtension] =
      useState<CodeMirrorExtension>([]);
    const editorRef = useRef<CodeMirrorRef>(null);
    const ref = useMergeRefs([editorRef, forwardedRef]);

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

    const createIndentExtension = useCallback(
      (unit: IndentUnits, size: number) => {
        let indentString: string;

        if (unit === IndentUnits.Tab) {
          indentString = '\t';
        } else {
          indentString = ' '.repeat(size);
        }

        return [indentUnitFacet.of(indentString), EditorState.tabSize.of(size)];
      },
      [],
    );

    const customExtensions = useMemo(() => {
      const extensions: Array<CodeMirrorExtension> = [];

      /**
       * CodeMirror state is immutable. Once configuration is set, the entire
       * state would need to be updated to update one facet. Compartments allow
       * us to dynamically change parts of the configuration after
       * initialization, without needing to recreate the entire editor state.
       * See https://codemirror.net/examples/config/#dynamic-configuration
       */
      const hyperLinkCompartment = new Compartment();
      const lineWrappingCompartment = new Compartment();
      const indentExtensionCompartment = new Compartment();
      const tooltipCompartment = new Compartment();
      const foldGutterCompartment = new Compartment();

      extensions.push(
        hyperLinkCompartment.of(enableClickableUrls ? hyperLink : []),
        lineWrappingCompartment.of(
          enableLineWrapping ? EditorView.lineWrapping : [],
        ),
        indentExtensionCompartment.of(
          createIndentExtension(indentUnit, indentSize),
        ),
        // Use diagnostics-based tooltips if any tooltips are provided
        tooltipCompartment.of(
          tooltips.length > 0 ? [createTooltipsExtension(tooltips)] : [],
        ),
        foldGutterCompartment.of(
          enableCodeFolding
            ? foldGutter({
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
              })
            : [],
        ),
      );

      return extensions;
    }, [
      createIndentExtension,
      enableClickableUrls,
      enableCodeFolding,
      enableLineWrapping,
      indentUnit,
      indentSize,
      tooltips,
    ]);

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
          ...customExtensions,
          languageExtension,
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
