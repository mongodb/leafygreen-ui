import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import Icon, { glyphs } from '@leafygreen-ui/icon';
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
      storyNames: [
        'Gray',
        'Green',
        'Blue',
        'Red',
        'Purple',
        'Yellow',
        'Truncate',
      ],
      combineArgs: {
        darkMode: [false, true],
        label: ['Chip', 'meow meow meow miaou miao miau'],
        disabled: [false, true],
        onDismiss: [() => {}, undefined],
        baseFontSize: [BaseFontSize.Body1, BaseFontSize.Body2],
        glyph: [<Icon glyph="Wizard" key="1" />, undefined],
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
    chipTruncationLocation: TruncationLocation.End,
    baseFontSize: BaseFontSize.Body1,
    variant: Variant.Gray,
    chipCharacterLimit: 15,
    disabled: false,
    glyph: undefined,
  },
  argTypes: {
    glyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
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

export const Truncate: StoryType<typeof Chip> = () => <></>;
Truncate.parameters = {
  generate: {
    args: {
      variant: Variant.Blue,
      label: 'meow meow meow miaou miao miau',
    },
    combineArgs: {
      chipTruncationLocation: [
        TruncationLocation.End,
        TruncationLocation.Middle,
        TruncationLocation.None,
        TruncationLocation.Start,
      ],
    },
  },
};

// eslint-disable-next-line react/prop-types
export const LiveExample: StoryType<typeof Chip> = ({ glyph, ...rest }) => (
  <Chip // @ts-expect-error - glyph type error
    glyph={glyph ? <Icon glyph={glyph} /> : undefined}
    {...rest}
  />
);
