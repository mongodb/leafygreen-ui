import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import { IndentUnits } from './CodeEditor/CodeEditor.types';
import { CodeEditor } from '.';

const MyTooltip = ({ line, column }: { line: number; column: number }) => {
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
    </div>
  );
};

const meta: StoryMetaType<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
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
    enableActiveLineHighlighting: true,
    enableClickableUrls: true,
    enableCodeFolding: true,
    enableLineNumbers: true,
    enableLineWrapping: true,
    defaultValue: 'test\n'.repeat(5),
    forceParsing: false,
    placeholder: 'Type your code here...',
    readOnly: false,
    indentSize: 2,
    indentUnit: IndentUnits.Space,
    tooltips: [
      {
        line: 2,
        column: 2,
        content: <MyTooltip line={2} column={2} />,
        above: true,
      },
    ],
  },
  argTypes: {
    enableActiveLineHighlighting: {
      control: { type: 'boolean' },
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
  },
};

export default meta;

const Template: StoryFn<typeof CodeEditor> = args => <CodeEditor {...args} />;

export const LiveExample = Template.bind({});
