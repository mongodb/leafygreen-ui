import React from 'react';
import * as CodeMirrorCommandsModule from '@codemirror/commands';
import * as LanguageModule from '@codemirror/language';
import * as CodeMirrorSearchModule from '@codemirror/search';
import * as CodeMirrorStateModule from '@codemirror/state';
import * as CodeMirrorViewModule from '@codemirror/view';
import { render } from '@testing-library/react';
import * as HyperLinkModule from '@uiw/codemirror-extensions-hyper-link';
import * as CodeMirrorModule from 'codemirror';

import { CodeEditor } from './CodeEditor';
import { CodeEditorProps } from './CodeEditor.types';

const preLoadedModules = {
  codemirror: CodeMirrorModule,
  '@codemirror/view': CodeMirrorViewModule,
  '@codemirror/state': CodeMirrorStateModule,
  '@codemirror/commands': CodeMirrorCommandsModule,
  '@codemirror/search': CodeMirrorSearchModule,
  '@uiw/codemirror-extensions-hyper-link': HyperLinkModule,
  '@codemirror/language': LanguageModule,
};

const renderCodeEditor = (props: Partial<CodeEditorProps>) => {
  return render(<CodeEditor preLoadedModules={preLoadedModules} {...props} />);
};

describe('packages/code-editor/CodeEditor', () => {
  test('renders', () => {
    const { container } = renderCodeEditor({
      defaultValue: 'content',
    });
    expect(container).toHaveTextContent('content');
  });
});
