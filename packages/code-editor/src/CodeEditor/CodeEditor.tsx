import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { forceParsing } from '@codemirror/language';
import { hyperLink } from '@uiw/codemirror-extensions-hyper-link';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';

import { useMergeRefs } from '@leafygreen-ui/hooks';

import {
  type CodeEditorProps,
  type CodeMirrorExtension,
  type ReactCodeMirrorRef,
} from './CodeEditor.types';

export const CodeEditor = forwardRef<ReactCodeMirrorRef, CodeEditorProps>(
  (
    {
      enableActiveLineHighlighting = true,
      enableClickableUrls = true,
      enableCodeFolding = true,
      enableLineNumbers = true,
      enableLineWrapping = true,
      forceParsing: forceParsingProp = false,
      placeholder,
      readOnly = false,
      value: valueProp,
      ...rest
    },
    forwardedRef,
  ) => {
    const [value, setValue] = useState(valueProp || '');
    const editorRef = useRef<ReactCodeMirrorRef>(null);

    const onChange = useCallback((val: string) => {
      setValue(val);
    }, []);

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

      if (enableClickableUrls) {
        extensions.push(hyperLink);
      }

      if (enableLineWrapping) {
        extensions.push(EditorView.lineWrapping);
      }

      return extensions;
    }, [enableClickableUrls, enableLineWrapping]);

    return (
      <CodeMirror
        value={value}
        height="200px"
        width="100%"
        onChange={onChange}
        onCreateEditor={onCreateEditor}
        readOnly={readOnly}
        placeholder={placeholder}
        extensions={extensions}
        basicSetup={{
          allowMultipleSelections: true,
          foldGutter: enableCodeFolding,
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
