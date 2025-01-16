/* eslint-disable react/jsx-key */
/* eslint-disable no-console */
/* eslint-disable react/display-name */
import React, { MouseEvent, useRef } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Size } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { MenuItem } from '@leafygreen-ui/menu';
import { TestUtils } from '@leafygreen-ui/popover';
const { getAlign, getJustify } = TestUtils;

import { Align, Justify, SplitButton, SplitButtonProps, Variant } from '.';

const meta: StoryMetaType<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,

  parameters: {
    default: 'LiveExample',
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
      ],
    },
    chromatic: {
      disableSnapshot: true,
    },
    generate: {
      storyNames: ['LargeSize', 'DefaultSize', 'SmallSize', 'XSmallSize'],
      combineArgs: {
        darkMode: [false, true],
        leftGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
        variant: Object.values(Variant),
        align: Object.values(Align),
        justify: Object.values(Justify),
      },
      args: {
        label: 'MongoDB',
        open: true,
      },
      decorator: (Instance, ctx) => (
        <div
          className={css`
            height: 300px;
            display: flex;
            align-items: ${getAlign(ctx?.args.align, ctx?.args.justify)};
            justify-content: ${getJustify(ctx?.args.align, ctx?.args.justify)};
          `}
        >
          <Instance />
        </div>
      ),
    },
  },
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
    renderDarkMenu: {
      description:
        'Whether the menu should always render dark, regardless of the theme context',
      control: 'boolean',
    },
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

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const LargeSize: StoryType<typeof SplitButton> = () => <></>;
LargeSize.parameters = {
  generate: {
    args: {
      size: Size.Large,
    },
  },
};

export const DefaultSize: StoryType<typeof SplitButton> = () => <></>;
DefaultSize.parameters = {
  generate: {
    args: {
      size: Size.Default,
    },
  },
};

export const SmallSize: StoryType<typeof SplitButton> = () => <></>;
SmallSize.parameters = {
  generate: {
    args: {
      size: Size.Small,
    },
  },
};

export const XSmallSize: StoryType<typeof SplitButton> = () => <></>;
XSmallSize.parameters = {
  generate: {
    args: {
      size: Size.XSmall,
    },
  },
};
