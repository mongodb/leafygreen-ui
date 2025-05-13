import React from 'react';
import CodeMirror from '@uiw/react-codemirror';

export function CodeEditor() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      height="200px"
      width="100%"
      extensions={[]}
      onChange={onChange}
      basicSetup={{
        lineNumbers: false,
      }}
    />
  );
}

CodeEditor.displayName = 'CodeEditor';
