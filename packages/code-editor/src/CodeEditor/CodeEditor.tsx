import React from 'react';
import { esLint, javascript } from '@codemirror/lang-javascript';
import { linter, lintGutter } from '@codemirror/lint';
import CodeMirror from '@uiw/react-codemirror';
// Uses linter.mjs
import * as eslint from 'eslint-linter-browserify';
import globals from 'globals';

const recommendedRules: Record<string, 'error' | 'warn' | 'off'> = {
  'for-direction': 'error',
  'getter-return': 'error',
  'no-async-promise-executor': 'error',
  'no-await-in-loop': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': 'error',
  'no-console': 'warn',
  'no-constant-condition': 'error',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-dupe-args': 'error',
  'no-dupe-else-if': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty': 'error',
  'no-empty-character-class': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-extra-semi': 'error',
  'no-func-assign': 'error',
  'no-import-assign': 'error',
  'no-inner-declarations': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-loss-of-precision': 'error',
  'no-misleading-character-class': 'error',
  'no-obj-calls': 'error',
  'no-promise-executor-return': 'error',
  'no-prototype-builtins': 'error',
  'no-regex-spaces': 'error',
  'no-setter-return': 'error',
  'no-sparse-arrays': 'error',
  'no-template-curly-in-string': 'error',
  'no-unexpected-multiline': 'error',
  'no-unreachable': 'error',
  'no-unreachable-loop': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unsafe-optional-chaining': 'error',
  'no-useless-backreference': 'error',
  'require-atomic-updates': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',
};

export function CodeEditor() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const config = {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: { ...recommendedRules },
  };

  return (
    <CodeMirror
      value={value}
      height="200px"
      width="100%"
      extensions={[
        javascript({ jsx: true }),
        lintGutter(),
        linter(esLint(new eslint.Linter(), config)),
      ]}
      onChange={onChange}
      basicSetup={{
        lineNumbers: false,
      }}
    />
  );
}

CodeEditor.displayName = 'CodeEditor';
