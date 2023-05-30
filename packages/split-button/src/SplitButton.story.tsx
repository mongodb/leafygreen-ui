/* eslint-disable no-console */
import React, { MouseEvent, useRef } from 'react';
import { StoryFn } from '@storybook/react';

import { Size } from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { MenuItem } from '@leafygreen-ui/menu';

import { Align, Justify, SplitButton, SplitButtonProps, Variant } from '.';

const meta: StoryMetaType<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  args: {
    label: 'label',
    variant: Variant.Default,
    align: Align.Bottom,
    justify: Justify.End,
    menuItems: [
      <MenuItem key="0" onClick={(event: MouseEvent) => console.log(event)}>
        Menu Item
      </MenuItem>,
      <MenuItem key="1" description="I am a description" disabled>
        Disabled Menu Item
      </MenuItem>,
      <MenuItem key="2" description="I am also a description">
        Menu Item With Description
      </MenuItem>,
      <MenuItem key="3">I am not a link!</MenuItem>,
    ],
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
        ...storybookExcludedControlParams,
        'as',
        'children',
        'menuItems',
        'href',
        'type',
        'maxHeight',
        'open',
        'onTriggerClick',
        'triggerAriaLabel',
        'onChange',
      ],
    },
  },
};

export default meta;

const Template: StoryFn<SplitButtonProps> = (props: SplitButtonProps) => {
  const { leftGlyph, ...rest } = props;
  const splitButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <SplitButton
      {...rest}
      ref={splitButtonRef}
      // @ts-expect-error
      leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
      onClick={event => console.log('onClick', event)}
      onChange={event => console.log('onChange', event)}
    />
  );
};

export const Basic = Template.bind({});
