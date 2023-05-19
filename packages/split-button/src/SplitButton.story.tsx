import React, { useRef } from 'react';

import { Size } from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';
import { MenuItem } from '@leafygreen-ui/menu';

import { Align, Justify, SplitButton, SplitButtonProps, Variant } from '.';

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
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
    align: {
      control: 'select',
      options: Object.values(Align),
    },
    justify: {
      control: 'select',
      options: Object.values(Justify),
    },
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
        'menuItems',
      ],
    },
  },
});

const Template = (props: SplitButtonProps) => {
  const { leftGlyph, ...rest } = props;
  const splitButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <SplitButton
      // @ts-expect-error
      leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
      {...rest}
      // eslint-disable-next-line no-console
      onClick={() => console.log('primary button clicked')}
      menuItems={
        <>
          {/* eslint-disable-next-line no-console */}
          <MenuItem onClick={e => console.log(e.target.innerText)}>
            Menu Item
          </MenuItem>
          <MenuItem description="I am a description" disabled>
            Disabled Menu Item
          </MenuItem>
          <MenuItem description="I am also a description">
            Menu Item With Description
          </MenuItem>
          <MenuItem>I am not a link!</MenuItem>
        </>
      }
      ref={splitButtonRef}
    />
  );
};

export const Basic = Template.bind({});
