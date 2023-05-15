import React from 'react';
import { ComponentStory } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';
import { MenuItem } from '@leafygreen-ui/menu';

import { SplitButton } from '.';

export default StoryMeta({
  title: 'Components/SplitButton',
  component: SplitButton,
  args: {
    label: 'label',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    // size: {
    //   control: 'select',
    //   options: Object.values(Size),
    // },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        'as',
        'children',
        'aria-labelledby',
        'aria-describedby',
        'aria-label',
        'value',
      ],
    },
  },
});

const Template: ComponentStory<typeof SplitButton> = ({
  // eslint-disable-next-line react/prop-types
  leftGlyph,
  ...args
}) => (
  <SplitButton // @ts-expect-error
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
    {...args}
    menuItems={
      <>
        <MenuItem onClick={e => console.log(e.target.innerText)}>
          Active Menu Item
        </MenuItem>
        <MenuItem description="I am a description">Disabled Menu Item</MenuItem>
        <MenuItem description="I am also a description">
          Menu Item With Description
        </MenuItem>
        <MenuItem>I am not a link!</MenuItem>
      </>
    }
  />
);

export const Basic = Template.bind({});
