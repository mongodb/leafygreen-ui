import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { glyphs, Icon } from '@leafygreen-ui/icon';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { TruncationLocation, Variant } from './Chip/Chip.types';
import { Chip } from '.';

const meta: StoryMetaType<typeof Chip> = {
  title: 'Components/Display/Chip',
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
        'White',
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

const Template: StoryFn<typeof Chip> = ({ glyph, ...rest }) => (
  <Chip // @ts-expect-error - glyph type error
    glyph={glyph ? <Icon glyph={glyph} /> : undefined}
    {...rest}
  />
);

export const LiveExample: StoryObj<typeof Chip> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Gray: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.Gray,
  },
};

export const Green: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.Green,
  },
};

export const Red: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.Red,
  },
};

export const Blue: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.Blue,
  },
};

export const Purple: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.Purple,
  },
};

export const Yellow: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.Yellow,
  },
};

export const White: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.White,
  },
};

export const Truncate: StoryObj<typeof Chip> = {
  render: Template,
  parameters: {
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

const formatTooltip = (label: React.ReactNode) => {
  if (typeof label === 'string') {
    return <Body>{`Label: ${label}`}</Body>;
  }

  return label;
};
export const FormattedTooltip: StoryObj<typeof Chip> = {
  render: Template,
  args: {
    variant: Variant.Blue,
    label: 'Lorem ipsum',
    chipTruncationLocation: TruncationLocation.None,
    enableAlwaysShowTooltip: true,
    formatTooltip,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText('Lorem ipsum');
    await userEvent.hover(chip);

    const tooltip = await canvas.findByRole('tooltip', {
      name: 'Label: Lorem ipsum',
    });
    expect(tooltip).toBeInTheDocument();
  },
  parameters: {
    chromatic: {
      delay: 550,
    },
  },
};
