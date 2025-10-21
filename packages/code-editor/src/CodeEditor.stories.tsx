import React from 'react';
import * as AutocompleteModule from '@codemirror/autocomplete';
import * as CodeMirrorCommandsModule from '@codemirror/commands';
import * as JavascriptModule from '@codemirror/lang-javascript';
import * as LanguageModule from '@codemirror/language';
import * as CodeMirrorSearchModule from '@codemirror/search';
import * as CodeMirrorStateModule from '@codemirror/state';
import * as CodeMirrorViewModule from '@codemirror/view';
import * as LezerHighlightModule from '@lezer/highlight';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import type { StoryFn, StoryObj } from '@storybook/react';
import * as HyperLinkModule from '@uiw/codemirror-extensions-hyper-link';
import * as CodeMirrorModule from 'codemirror';
import * as ParserTypescriptModule from 'prettier/parser-typescript';
import * as StandaloneModule from 'prettier/standalone';

import { css } from '@leafygreen-ui/emotion';
// @ts-ignore LG icons don't currently support TS
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import Modal from '@leafygreen-ui/modal';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { CopyButtonAppearance } from './CodeEditor/CodeEditor.types';
import { LanguageName } from './CodeEditor/hooks/extensions/useLanguageExtension';
import { IndentUnits } from './CodeEditor';
import { ShortcutTable } from './ShortcutTable';
import { codeSnippets } from './testing';
import { CodeEditor } from '.';

const meta: StoryMetaType<typeof CodeEditor> = {
  title: 'Components/Inputs/CodeEditor',
  component: CodeEditor,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'extensions'],
    },
  },
  decorators: [
    (Story: StoryFn, context) => (
      <LeafyGreenProvider
        darkMode={context?.args.darkMode}
        /**
         * useUpdatedBaseFontSize, which is used in the CodeEditor, returns 13 for 14 and 16 for 16.
         * We need to convert it to 14 for 14 and 16 for 16 to be accepted by the LeafyGreenProvider.
         */
        baseFontSize={
          context?.args.baseFontSize === BaseFontSize.Body1 ? 14 : 16
        }
      >
        <div
          className={css`
            width: 100vw;
            padding: 0;
          `}
        >
          <Story />
        </div>
      </LeafyGreenProvider>
    ),
  ],
  args: {
    copyButtonAppearance: CopyButtonAppearance.None,
    customContextMenuItems: [
      {
        label: 'Custom Action',
        action: () => {},
      },
    ],
    enableClickableUrls: true,
    enableCodeFolding: true,
    enableLineNumbers: true,
    enableLineWrapping: true,
    enableSearchPanel: true,
    baseFontSize: BaseFontSize.Body1,
    forceParsing: false,
    placeholder: 'Type your code here...',
    readOnly: false,
    indentSize: 2,
    indentUnit: IndentUnits.Space,
    isLoading: false,
    defaultValue: '',
    tooltips: [],
    darkMode: false,
    height: '',
    maxHeight: '',
    maxWidth: '',
    minHeight: '',
    minWidth: '',
    preLoadedModules: undefined,
    width: '100%',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
    copyButtonAppearance: {
      control: { type: 'select' },
      options: Object.values(CopyButtonAppearance),
    },
    customContextMenuItems: {
      control: { type: 'object' },
    },
    enableClickableUrls: {
      control: { type: 'boolean' },
    },
    enableCodeFolding: {
      control: { type: 'boolean' },
    },
    enableLineNumbers: {
      control: { type: 'boolean' },
    },
    enableSearchPanel: {
      control: { type: 'boolean' },
    },
    enableLineWrapping: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    defaultValue: {
      control: { type: 'text' },
    },
    indentSize: {
      control: { type: 'number' },
    },
    indentUnit: {
      options: ['space', 'tab'],
      control: { type: 'radio' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
    language: {
      control: { type: 'select' },
      options: Object.values(LanguageName),
    },
    height: {
      control: { type: 'text' },
    },
    maxHeight: {
      control: { type: 'text' },
    },
    maxWidth: {
      control: { type: 'text' },
    },
    minHeight: {
      control: { type: 'text' },
    },
    minWidth: {
      control: { type: 'text' },
    },
    preLoadedModules: {
      control: false, // Disable control
    },
    width: {
      control: { type: 'text' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof CodeEditor> = args => <CodeEditor {...args} />;

export const LiveExample = Template.bind({});

export const WithPanel = Template.bind({});
const language = LanguageName.tsx;
WithPanel.args = {
  language,
  defaultValue: codeSnippets[language],
  children: (
    <CodeEditor.Panel
      showCopyButton
      showFormatButton
      showSecondaryMenuButton
      customSecondaryButtons={[
        {
          label: 'Custom Button',
          onClick: () => {},
          'aria-label': 'Custom Button',
          glyph: <CloudIcon />,
        },
      ]}
      title={`index.${language}`}
    />
  ),
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

/**
 * Syntax Highlighting Examples / Regressions
 * These have been hardcoded for now, but we could potentially determine a good
 * way to dynamically generate these in the future if needed.
 */
export const Cpp = Template.bind({});
Cpp.args = {
  language: 'cpp',
  defaultValue: codeSnippets.cpp,
};

export const CSharp = Template.bind({});
CSharp.args = {
  language: 'csharp',
  defaultValue: codeSnippets.csharp,
};

export const Css = Template.bind({});
Css.args = {
  language: 'css',
  defaultValue: codeSnippets.css,
};

export const Go = Template.bind({});
Go.args = {
  language: 'go',
  defaultValue: codeSnippets.go,
};

export const Html = Template.bind({});
Html.args = {
  language: 'html',
  defaultValue: codeSnippets.html,
};

export const Java = Template.bind({});
Java.args = {
  language: 'java',
  defaultValue: codeSnippets.java,
};

export const Javascript = Template.bind({});
Javascript.args = {
  language: 'javascript',
  defaultValue: codeSnippets.javascript,
};

export const Json = Template.bind({});
Json.args = {
  language: 'json',
  defaultValue: codeSnippets.json,
};

export const Jsx = Template.bind({});
Jsx.args = {
  language: 'jsx',
  defaultValue: codeSnippets.jsx,
};

export const Kotlin = Template.bind({});
Kotlin.args = {
  language: 'kotlin',
  defaultValue: codeSnippets.kotlin,
};

export const Php = Template.bind({});
Php.args = {
  language: 'php',
  defaultValue: codeSnippets.php,
};

export const Python = Template.bind({});
Python.args = {
  language: 'python',
  defaultValue: codeSnippets.python,
};

export const Ruby = Template.bind({});
Ruby.args = {
  language: 'ruby',
  defaultValue: codeSnippets.ruby,
};

export const Rust = Template.bind({});
Rust.args = {
  language: 'rust',
  defaultValue: codeSnippets.rust,
};

export const Tsx = Template.bind({});
Tsx.args = {
  language: 'tsx',
  defaultValue: codeSnippets.tsx,
};

export const Typescript = Template.bind({});
Typescript.args = {
  language: 'typescript',
  defaultValue: codeSnippets.typescript,
};

export const ShortcutsMenu: StoryObj<{}> = {
  render: () => {
    return (
      <Modal open>
        <ShortcutTable />
      </Modal>
    );
  },
};

export const WithPreLoadedModules: StoryObj<typeof CodeEditor> = {
  render: args => (
    <CodeEditor
      {...args}
      language={LanguageName.typescript}
      defaultValue={codeSnippets.typescript}
      preLoadedModules={{
        codemirror: CodeMirrorModule,
        '@codemirror/view': CodeMirrorViewModule,
        '@codemirror/state': CodeMirrorStateModule,
        '@codemirror/commands': CodeMirrorCommandsModule,
        '@codemirror/search': CodeMirrorSearchModule,
        '@uiw/codemirror-extensions-hyper-link': HyperLinkModule,
        '@codemirror/language': LanguageModule,
        '@lezer/highlight': LezerHighlightModule,
        '@codemirror/autocomplete': AutocompleteModule,
        '@codemirror/lang-javascript': JavascriptModule,
        'prettier/standalone': StandaloneModule,
        'prettier/parser-typescript': ParserTypescriptModule,
      }}
    />
  ),
};
