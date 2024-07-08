import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { TruncationLocation, Variant } from './Chip/Chip.types';
import { Chip } from '.';

const meta: StoryMetaType<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['Gray', 'Green', 'Blue', 'Red', 'Purple', 'Yellow'],
      combineArgs: {
        darkMode: [false, true],
        label: ['Chip', 'meow meow meow miaou miao miau'],
        disabled: [false, true],
        onDismiss: [() => {}, undefined],
        chipTruncationLocation: [
          TruncationLocation.End,
          TruncationLocation.Middle,
          TruncationLocation.None,
          TruncationLocation.Start,
        ],
        baseFontSize: [BaseFontSize.Body1, BaseFontSize.Body2],
      },
      args: {},
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <Instance />
          </LeafyGreenProvider>
        );
      },
    },
  },
  args: {
    label: 'Chip',
    onDismiss: () => {},
    chipTruncationLocation: TruncationLocation.None,
    baseFontSize: BaseFontSize.Body1,
    variant: Variant.Gray,
    chipCharacterLimit: 15,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: Object.values(Variant),
      control: { type: 'select' },
    },
    chipTruncationLocation: {
      options: [
        TruncationLocation.End,
        TruncationLocation.Middle,
        TruncationLocation.None,
        TruncationLocation.Start,
      ],
      control: { type: 'select' },
    },
  },
};
export default meta;

export const Gray: StoryType<typeof Chip> = () => <></>;
Gray.parameters = {
  generate: {
    args: {
      variant: Variant.Gray,
    },
  },
};

export const Green: StoryType<typeof Chip> = () => <></>;
Green.parameters = {
  generate: {
    args: {
      variant: Variant.Green,
    },
  },
};

export const Red: StoryType<typeof Chip> = () => <></>;
Red.parameters = {
  generate: {
    args: {
      variant: Variant.Red,
    },
  },
};

export const Blue: StoryType<typeof Chip> = () => <></>;
Blue.parameters = {
  generate: {
    args: {
      variant: Variant.Blue,
    },
  },
};

export const Purple: StoryType<typeof Chip> = () => <></>;
Purple.parameters = {
  generate: {
    args: {
      variant: Variant.Purple,
    },
  },
};

export const Yellow: StoryType<typeof Chip> = () => <></>;
Yellow.parameters = {
  generate: {
    args: {
      variant: Variant.Yellow,
    },
  },
};

const Template: StoryFn<typeof Chip> = props => <Chip {...props} />;

export const LiveExample = Template.bind({});
