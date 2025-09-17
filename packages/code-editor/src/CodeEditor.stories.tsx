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
import { expect, waitFor } from '@storybook/test';
import * as HyperLinkModule from '@uiw/codemirror-extensions-hyper-link';
import * as CodeMirrorModule from 'codemirror';
import * as ParserTypescriptModule from 'prettier/parser-typescript';
import * as StandaloneModule from 'prettier/standalone';

import { css } from '@leafygreen-ui/emotion';
// @ts-ignore LG icons don't currently support TS
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import Modal from '@leafygreen-ui/modal';

import { CopyButtonAppearance } from './CodeEditor/CodeEditor.types';
import { LanguageName } from './CodeEditor/hooks/extensions/useLanguageExtension';
import { IndentUnits } from './CodeEditor';
import { CodeEditorTooltip } from './CodeEditorTooltip';
import { ShortcutTable } from './ShortcutTable';
import { codeSnippets } from './testing';
import { CodeEditor, Panel } from '.';

const MyTooltip = ({
  line,
  column,
  length,
}: {
  line: number;
  column: number;
  length: number;
}) => {
  return (
    <div
      className={css`
        padding: 8px;
      `}
    >
      <div
        className={css`
          font-weight: bold;
          margin-bottom: 4px;
        `}
      >
        My Tooltip
      </div>
      <div
        className={css`
          margin-bottom: 4px;
        `}
      >
        Line: {line}
      </div>
      <div
        className={css`
          margin-bottom: 4px;
        `}
      >
        Column: {column}
      </div>
      <div
        className={css`
          margin-bottom: 4px;
        `}
      >
        Length: {length}
      </div>
    </div>
  );
};

const meta: StoryMetaType<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
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
        baseFontSize={context?.args.baseFontSize}
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
    baseFontSize: 14,
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
    enableLineWrapping: {
      control: { type: 'boolean' },
    },
    baseFontSize: {
      control: { type: 'select' },
      options: [14, 16],
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
  panel: (
    <Panel
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

export const Tooltip: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditorTooltip
        messages={[
          'Cannot use JSX unless the ‘--jsx’ flag is provided.',
          '(parameter) props: HTMLElementProps<”svg”>',
        ]}
        links={[
          {
            label: 'HTMLElementProps',
            href: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElementProps',
          },
          {
            label: 'svg',
            href: 'https://developer.mozilla.org/en-US/docs/Web/API/svg',
          },
        ]}
      />
    );
  },
};

export const TooltipOnHover: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditor
        defaultValue={'test\n'.repeat(5)}
        tooltips={[
          {
            line: 2,
            column: 1,
            content: <MyTooltip line={2} column={1} length={4} />,
            length: 4,
          },
        ]}
      />
    );
  },
  /**
   * Tests that the tooltip appears when hovering over a specific character
   * in the editor. This is done here instead of in Jest because it depends on
   * bounding rects, which are not available in Jest's JSDOM environment.
   */
  play: async ({ canvasElement }) => {
    // Wait for diagnostic to be applied
    await waitFor(() => {
      expect(canvasElement.querySelector('.cm-lintRange')).toBeInTheDocument();
    });

    // Find the third line (line: 2, zero-based)
    const target = canvasElement.getElementsByClassName('cm-lintRange')[0];

    // Find the text node and calculate the offset for column 2
    const range = document.createRange();
    range.setStart(target.firstChild!, 0); // column: 0
    range.setEnd(target.firstChild!, 4); // column: 4

    // Get the bounding rect for the character at column 2
    const rect = range.getBoundingClientRect();

    // Calculate the center of the character
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Dispatch a mousemove event at the character position
    target.dispatchEvent(
      new MouseEvent('mousemove', {
        bubbles: true,
        clientX: x,
        clientY: y,
      }),
    );

    // Wait for the tooltip to appear
    await waitFor(() => {
      expect(canvasElement.querySelector('.cm-tooltip')).toBeInTheDocument();
    });
  },
};

export const ContextMenuOnRightClick: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditor
        customContextMenuItems={[{ label: 'Custom Action', action: () => {} }]}
      />
    );
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('.cm-editor')).toBeInTheDocument();
    });

    const editor = canvasElement.querySelector('.cm-editor');

    if (!editor) {
      console.warn('Editor element not found');
      return;
    }

    const contextMenuConfig = {
      bubbles: true,
      cancelable: true,
      button: 2,
      buttons: 2,
      clientX: 100,
      clientY: 100,
    };
    let contextMenuEvent = new MouseEvent('contextmenu', contextMenuConfig);

    const rect = editor.getBoundingClientRect();

    if (rect && rect.width > 0 && rect.height > 0) {
      // Calculate center coordinates
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      contextMenuEvent = new MouseEvent('contextmenu', {
        ...contextMenuConfig,
        ...{
          clientX: centerX,
          clientY: centerY,
        },
      });
    }

    editor.dispatchEvent(contextMenuEvent);
  },
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
