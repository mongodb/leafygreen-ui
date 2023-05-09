import React from 'react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';

import {
  InputOptionContent,
  InputOptionContentProps,
} from '../InputOptionContent';

import { InputOption, type InputOptionProps } from '.';

export default StoryMeta({
  title: 'Components/InputOption',
  component: InputOption,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        'setError',
        'filteredOptions',
        'initialValue',
        'value',
        'children',
      ],
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    highlighted: {
      control: 'boolean',
    },
    selected: {
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
});

const Template = (props: InputOptionProps & InputOptionContentProps) => {
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

export const Basic = Template.bind({});
