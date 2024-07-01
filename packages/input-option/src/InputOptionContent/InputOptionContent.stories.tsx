/* eslint-disable react/jsx-key */
import React from 'react';
import {
  InstanceDecorator,
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';

import { InputOption } from '../InputOption';

import { InputOptionContent } from '.';

const _withInputOptionDecorator: InstanceDecorator<
  typeof InputOption & typeof InputOptionContent
> = (Instance, ctx) => {
  const {
    args: { darkMode, highlighted, checked, disabled },
  } = ctx || { args: {} };
  return (
    <InputOption
      darkMode={darkMode}
      highlighted={highlighted}
      checked={checked}
      disabled={disabled}
    >
      <Instance />
    </InputOption>
  );
};

export default {
  title: 'Components/InputOption/Content',
  component: InputOptionContent,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      storyNames: ['Basic', 'Highlighted', 'Checked', 'Disabled'],
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'Description'],
        preserveIconSpace: [false, true],
        leftGlyph: [undefined, <Icon glyph="Cloud" />],
        rightGlyph: [undefined, <Icon glyph="ChevronDown" />],
      },
      excludeCombinations: [
        {
          leftGlyph: undefined,
          rightGlyph: <Icon glyph="ChevronDown" />,
        },
        {
          preserveIconSpace: false,
          leftGlyph: <Icon glyph="Cloud" />,
        },
      ],
      decorator: _withInputOptionDecorator,
    },
  },
  args: {
    children: 'Some text',
    showWedge: true,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    highlighted: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    showWedge: {
      control: 'boolean',
    },
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    rightGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    description: {
      control: { type: 'text' },
    },
    as: storybookArgTypes.as,
  },
} satisfies StoryMetaType<typeof InputOptionContent>;

export const Basic = {
  render: () => <></>,
} satisfies StoryObj<typeof InputOptionContent>;

export const Highlighted = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        rightGlyph: <Icon glyph="ChevronDown" />,
        highlighted: true,
      },
    },
  },
} satisfies StoryObj<typeof InputOptionContent>;

export const Disabled = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        disabled: true,
      },
    },
  },
} satisfies StoryObj<typeof InputOptionContent>;
