import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { TitleBar, type TitleBarProps } from './TitleBar';

const meta: StoryMetaType<typeof TitleBar> = {
  title: 'Composition/Chat/TitleBar',
  component: TitleBar,
  args: {
    title: 'LeafyGreen Chat',
  },
  argTypes: {
    onClose: { control: 'none' },
    iconSlot: { control: 'none' },
    badgeText: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: null,
    generate: {
      storyNames: ['CompactVariant', 'SpaciousVariant'],
      combineArgs: {
        badgeText: [undefined, 'Beta'],
        darkMode: [false, true],
      },
      decorator: (Instance, context) => {
        return (
          <div style={{ width: 700 }}>
            <LeafyGreenChatProvider variant={context?.args.variant}>
              <Instance />
            </LeafyGreenChatProvider>
          </div>
        );
      },
    },
  },
};

export default meta;

type TitleBarStoryProps = TitleBarProps & {
  variant?: Variant;
};

const Template: StoryFn<TitleBarStoryProps> = ({ variant, ...props }) => (
  <div style={{ width: 700 }}>
    <LeafyGreenChatProvider variant={variant}>
      <TitleBar {...props} />
    </LeafyGreenChatProvider>
  </div>
);

export const LiveExample: StoryObj<TitleBarStoryProps> = {
  render: Template,
  args: {
    title: 'LeafyGreen Chat',
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const CompactVariant: StoryObj<TitleBarStoryProps> = {
  render: Template,
  args: {
    title: 'LeafyGreen Chat',
    variant: Variant.Compact,
  },
};

export const SpaciousVariant: StoryObj<TitleBarStoryProps> = {
  render: Template,
  args: {
    title: 'LeafyGreen Chat',
    variant: Variant.Spacious,
  },
};

export const LeftAligned: StoryObj<TitleBarStoryProps> = {
  render: Template,
  args: {
    title: 'LeafyGreen Chat',
    variant: Variant.Spacious,
    align: 'left',
    onClose: undefined,
  },
};

export const WithCloseButton: StoryObj<TitleBarStoryProps> = {
  render: Template,
  args: {
    title: 'LeafyGreen Chat',
    variant: Variant.Spacious,
    // eslint-disable-next-line no-console
    onClose: () => console.log('Close clicked'),
  },
};
