import React from 'react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';

import {
  MenuOptionContent,
  MenuOptionContentProps,
} from '../MenuOptionContent';

import { MenuOption, type MenuOptionProps } from '.';

export default StoryMeta({
  title: 'Components/MenuOption',
  component: MenuOption,
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

const Template = (props: MenuOptionProps & MenuOptionContentProps) => {
  const { leftGlyph, rightGlyph, description, ...rest } = props;
  return (
    <MenuOption {...rest}>
      <MenuOptionContent
        leftGlyph={leftGlyph ? <Icon glyph={leftGlyph as string} /> : undefined}
        rightGlyph={
          rightGlyph ? <Icon glyph={rightGlyph as string} /> : undefined
        }
        description={description}
      >
        Some text
      </MenuOptionContent>
    </MenuOption>
  );
};

export const Basic = Template.bind({});
