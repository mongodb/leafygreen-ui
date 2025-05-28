import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { renderToString } from 'react-dom/server';
import {
  forceParsing,
  indentUnit as indentUnitFacet,
} from '@codemirror/language';
import { hyperLink } from '@uiw/codemirror-extensions-hyper-link';
import CodeMirror, {
  Compartment,
  EditorState,
  EditorView,
  hoverTooltip,
} from '@uiw/react-codemirror';

import { useMergeRefs } from '@leafygreen-ui/hooks';

import {
  type CodeEditorProps,
  type CodeMirrorExtension,
  type CodeMirrorRef,
  IndentUnits,
  type Tooltip,
} from './CodeEditor.types';

const CODE_MIRROR_HEIGHT = '200px';
const CODE_MIRROR_WIDTH = '100%';

const createTooltipExtension = ({
  line,
  column = 0,
  content,
  above = true,
}: Tooltip): CodeMirrorExtension => {
  return hoverTooltip(view => {
    const lineInfo = view.state.doc.line(line + 1); // CodeMirror lines are 1-indexed

    return {
      pos: lineInfo.from + column,
      end: lineInfo.to,
      above: above,
      create() {
        const dom = document.createElement('div');

        if (typeof content === 'string') {
          dom.textContent = content;
        } else if (React.isValidElement(content) || Array.isArray(content)) {
          const contentString = renderToString(
            React.createElement(React.Fragment, null, content),
          );
          dom.innerHTML = contentString;
        } else if (content) {
          dom.textContent = String(content);
        }

        return { dom };
      },
    };
  });
};

export const CodeEditor = forwardRef<CodeMirrorRef, CodeEditorProps>(
  (
    {
      defaultValue,
      enableActiveLineHighlighting = true,
      enableClickableUrls = true,
      enableCodeFolding = true,
      enableLineNumbers = true,
      enableLineWrapping = true,
      forceParsing: forceParsingProp = false,
      onChange: onChangeProp,
      placeholder,
      readOnly = false,
      indentUnit = IndentUnits.Space,
      indentSize = 2,
      tooltips = [],
      ...rest
    },
    forwardedRef,
  ) => {
    const [value, setValue] = useState(defaultValue || '');
    const editorRef = useRef<CodeMirrorRef>(null);

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

    const extensions = useMemo(() => {
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
      const tooltipExtensions: Array<CodeMirrorExtension> = [];

      for (const tooltip of tooltips) {
        tooltipExtensions.push(createTooltipExtension(tooltip));
      }

      extensions.push(
        hyperLinkCompartment.of(enableClickableUrls ? hyperLink : []),
        lineWrappingCompartment.of(
          enableLineWrapping ? EditorView.lineWrapping : [],
        ),
        indentExtensionCompartment.of(
          createIndentExtension(indentUnit, indentSize),
        ),
        tooltipCompartment.of(tooltipExtensions),
      );

      return extensions;
    }, [
      createIndentExtension,
      enableClickableUrls,
      enableLineWrapping,
      indentUnit,
      indentSize,
      tooltips,
    ]);

    return (
      <CodeMirror
        value={value}
        height={CODE_MIRROR_HEIGHT}
        width={CODE_MIRROR_WIDTH}
        onChange={onChange}
        onCreateEditor={onCreateEditor}
        readOnly={readOnly}
        placeholder={placeholder}
        extensions={extensions}
        basicSetup={{
          allowMultipleSelections: true,
          foldGutter: enableCodeFolding,
          highlightActiveLine: enableActiveLineHighlighting,
          highlightActiveLineGutter: enableActiveLineHighlighting,
          lineNumbers: enableLineNumbers,
        }}
        ref={useMergeRefs([editorRef, forwardedRef])}
        {...rest}
      />
    );
  },
);

CodeEditor.displayName = 'CodeEditor';
