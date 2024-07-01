/* eslint-disable react/jsx-key */
import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';

import {
  InputOptionContent,
  InputOptionContentProps,
} from '../InputOptionContent';

import { InputOption, type InputOptionProps } from '.';

export default {
  title: 'Components/InputOption',
  component: InputOption,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'setError',
        'filteredOptions',
        'initialValue',
        'value',
        'children',
      ],
    },
    generate: {
      storyNames: ['Generated', 'WithContent'],
      combineArgs: {
        darkMode: [false, true],
      },
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
} satisfies StoryMetaType<typeof InputOption>;

export const LiveExample: StoryFn<
  InputOptionProps & InputOptionContentProps
> = (props: InputOptionProps & InputOptionContentProps) => {
  const { leftGlyph, rightGlyph, description, ...rest } = props;
  return (
    <InputOption {...rest}>
      <InputOptionContent
        leftGlyph={leftGlyph ? <Icon glyph={leftGlyph as string} /> : undefined}
        rightGlyph={
          rightGlyph ? <Icon glyph={rightGlyph as string} /> : undefined
        }
        description={description}
      >
        Some text
      </InputOptionContent>
    </InputOption>
  );
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = {
  render: () => <></>,
  parameters: {
    generate: {
      combineArgs: {
        highlighted: [false, true],
        checked: [false, true],
        disabled: [false, true],
      },
    },
  },
} satisfies StoryObj<typeof InputOption>;
