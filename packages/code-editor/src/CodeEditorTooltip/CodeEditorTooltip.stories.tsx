import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import type { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { CodeEditorTooltip } from './CodeEditorTooltip';

const EditorTooltipRoot = (Story: StoryFn, context: any) => (
  <LeafyGreenProvider
    darkMode={context?.args.darkMode}
    baseFontSize={context?.args.baseFontSize}
  >
    <Story />
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof CodeEditorTooltip> = {
  title: 'Components/Inputs/CodeEditor/Tooltip',
  component: CodeEditorTooltip,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'extensions'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: Object.values(BaseFontSize),
      },
      decorator: EditorTooltipRoot,
    },
  },
  decorators: [EditorTooltipRoot],
  args: {
    baseFontSize: BaseFontSize.Body1,
    darkMode: false,
    messages: [
      'Cannot use JSX unless the ‘--jsx’ flag is provided.',
      '(parameter) props: HTMLElementProps<”svg”>',
    ],
    links: [
      {
        label: 'HTMLElementProps',
        href: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElementProps',
      },
      {
        label: 'svg',
        href: 'https://developer.mozilla.org/en-US/docs/Web/API/svg',
      },
    ],
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
    messages: {
      control: { type: 'object' },
    },
    links: {
      control: { type: 'object' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof CodeEditorTooltip> = args => (
  <CodeEditorTooltip {...args} />
);

export const LiveExample = Template.bind({});
export const Generated = () => {};
