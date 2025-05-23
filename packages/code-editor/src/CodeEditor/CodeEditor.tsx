import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { forceParsing } from '@codemirror/language';
import { hyperLink } from '@uiw/codemirror-extensions-hyper-link';
import CodeMirror, { Compartment, EditorView } from '@uiw/react-codemirror';

import { useMergeRefs } from '@leafygreen-ui/hooks';

import {
  type CodeEditorProps,
  type CodeMirrorExtension,
  type CodeMirrorRef,
} from './CodeEditor.types';

const CODE_MIRROR_HEIGHT = '200px';
const CODE_MIRROR_WIDTH = '100%';

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

      extensions.push(
        hyperLinkCompartment.of(enableClickableUrls ? hyperLink : []),
        lineWrappingCompartment.of(
          enableLineWrapping ? EditorView.lineWrapping : [],
        ),
      );

      return extensions;
    }, [enableClickableUrls, enableLineWrapping]);

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
