import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import type { StoryFn, StoryObj } from '@storybook/react';
import { expect, waitFor } from '@storybook/test';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import {
  CodeEditorTooltipSeverity,
  CopyButtonAppearance,
  IndentUnits,
} from './CodeEditor/CodeEditor.types';
import { preLoadedModules } from './testing/preLoadedModules';
import { CodeEditor, LanguageName } from '.';

const meta: StoryMetaType<typeof CodeEditor> = {
  title: 'Components/Inputs/CodeEditor/Interactions',
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

const tooltipPlayFunction = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
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
};

export const ErrorTooltipOnHover: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditor
        defaultValue={'test\n'.repeat(5)}
        preLoadedModules={preLoadedModules}
        tooltips={[
          {
            line: 2,
            column: 1,
            length: 4,
            messages: ['error text'],
            links: [
              {
                label: 'External Link',
                href: 'https://mongodb.com',
              },
            ],
            severity: CodeEditorTooltipSeverity.Error,
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
  play: tooltipPlayFunction,
};

export const HintTooltipOnHover: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditor
        defaultValue={'test\n'.repeat(5)}
        preLoadedModules={preLoadedModules}
        tooltips={[
          {
            line: 2,
            column: 1,
            length: 4,
            messages: ['hint text'],
            links: [
              {
                label: 'External Link',
                href: 'https://mongodb.com',
              },
            ],
            severity: CodeEditorTooltipSeverity.Hint,
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
  play: tooltipPlayFunction,
};

export const InfoTooltipOnHover: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditor
        defaultValue={'test\n'.repeat(5)}
        preLoadedModules={preLoadedModules}
        tooltips={[
          {
            line: 2,
            column: 1,
            length: 4,
            messages: ['informational text'],
            links: [
              {
                label: 'External Link',
                href: 'https://mongodb.com',
              },
            ],
            severity: CodeEditorTooltipSeverity.Info,
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
  play: tooltipPlayFunction,
};

export const WarningTooltipOnHover: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditor
        defaultValue={'test\n'.repeat(5)}
        preLoadedModules={preLoadedModules}
        tooltips={[
          {
            line: 2,
            column: 1,
            length: 4,
            messages: ['warning text'],
            links: [
              {
                label: 'External Link',
                href: 'https://mongodb.com',
              },
            ],
            severity: CodeEditorTooltipSeverity.Warning,
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
  play: tooltipPlayFunction,
};

export const ContextMenuOnRightClick: StoryObj<{}> = {
  render: () => {
    return (
      <CodeEditor
        preLoadedModules={preLoadedModules}
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
