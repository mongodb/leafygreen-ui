import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import type { StoryFn, StoryObj } from '@storybook/react';
import { expect, waitFor } from '@storybook/test';

import { css } from '@leafygreen-ui/emotion';

import { LanguageName } from './CodeEditor/hooks/extensions/useLanguageExtension';
import { codeSnippets } from './CodeEditor/testing';
import { IndentUnits } from './CodeEditor';
import { CodeEditor } from '.';

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
    StoryFn => (
      <div
        className={css`
          width: 100vw;
          height: 100vh;
          padding: 0;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
  args: {
    enableClickableUrls: true,
    enableCodeFolding: true,
    enableLineNumbers: true,
    enableLineWrapping: true,
    forceParsing: false,
    placeholder: 'Type your code here...',
    readOnly: false,
    indentSize: 2,
    indentUnit: IndentUnits.Space,
    defaultValue: '',
    tooltips: [],
    darkMode: false,
    height: '',
    maxHeight: '',
    maxWidth: '',
    minHeight: '',
    minWidth: '',
    width: '100%',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
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
    width: {
      control: { type: 'text' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof CodeEditor> = args => <CodeEditor {...args} />;

export const LiveExample = Template.bind({});

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

export const Typescript = Template.bind({});
Typescript.args = {
  language: 'typescript',
  defaultValue: codeSnippets.typescript,
};
