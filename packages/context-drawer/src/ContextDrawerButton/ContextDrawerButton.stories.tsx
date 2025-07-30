import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ContextDrawerButton } from './ContextDrawerButton';

const meta: StoryMetaType<typeof ContextDrawerButton> = {
  title: 'Composition/Data Display/ContextDrawer/ContextDrawerButton',
  component: ContextDrawerButton,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        isOpen: [false, true],
      },
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <Instance />
          </LeafyGreenProvider>
        );
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    isOpen: {
      control: 'boolean',
    },
  },
};
export default meta;

export const LiveExample: StoryObj<typeof ContextDrawerButton> = {
  render: ({ ...args }) => <ContextDrawerButton {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Generated: StoryObj<typeof ContextDrawerButton> = {
  render: () => <></>,
};
