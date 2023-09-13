import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType, StoryType } from '@leafygreen-ui/lib';

import { Size, TruncationLocation, Variant } from './Chip/Chip.types';
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
        size: [Size.Default, Size.Large],
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
    size: Size.Default,
    variant: Variant.Gray,
    chipCharacterLimit: 15,
    disabled: false,
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
