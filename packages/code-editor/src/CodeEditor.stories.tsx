import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import type { StoryFn, StoryObj } from '@storybook/react';
import { expect, waitFor } from '@storybook/test';

import { css } from '@leafygreen-ui/emotion';

import { IndentUnits } from './CodeEditor/CodeEditor.types';
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
    enableActiveLineHighlighting: true,
    enableClickableUrls: true,
    enableCodeFolding: true,
    enableLineNumbers: true,
    enableLineWrapping: true,
    defaultValue: '',
    forceParsing: false,
    placeholder: 'Type your code here...',
    readOnly: false,
    indentSize: 2,
    indentUnit: IndentUnits.Space,
    language: 'javascript',
    tooltips: [],
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
