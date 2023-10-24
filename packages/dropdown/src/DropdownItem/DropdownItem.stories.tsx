import React, { useRef } from 'react';

import Button from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { ActionType, CheckedVariant } from '@leafygreen-ui/input-option';
import {
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@leafygreen-ui/lib';
import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import { Dropdown, DropdownItem, DropdownItemProps } from '..';

const meta: StoryMetaType<typeof DropdownItem> = {
  title: 'Components/Dropdown/DropdownItem',
  component: DropdownItem,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      storyNames: ['WithIcon', 'WithoutIcon'],
      combineArgs: {
        disabled: [false, true],
        active: [false, true],
        description: ['description', undefined],
        actionType: Object.values(ActionType),
        darkMode: [false, true],
        checkedVariant: Object.values(CheckedVariant),
      },
    },
  },
  args: {
    children: 'Some text',
  },
  argTypes: {
    active: {
      control: 'boolean',
    },
    disabled: {
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
    actionType: {
      options: Object.values(ActionType),
      control: { type: 'select' },
    },
    checkedVariant: {
      options: Object.values(CheckedVariant),
      control: { type: 'select' },
    },
  },
};

export default meta;

export const LiveExample = (
  props: DropdownItemProps<PolymorphicAs> & { checkedVariant: CheckedVariant },
) => {
  const triggerRef = useRef<HTMLElement | null>(null);
  const { leftGlyph, rightGlyph, checkedVariant, ...rest } = props;
  return (
    <>
      <Button ref={triggerRef}>trigger</Button>
      <Dropdown
        open
        setOpen={() => {}}
        checkedVariant={checkedVariant}
        triggerRef={triggerRef}
      >
        <DropdownItem
          {...rest}
          leftGlyph={
            leftGlyph ? <Icon glyph={leftGlyph as string} /> : undefined
          }
          rightGlyph={
            rightGlyph ? <Icon glyph={rightGlyph as string} /> : undefined
          }
        />
      </Dropdown>
    </>
  );
};

export const WithIcon: StoryType<any> = () => <></>;
WithIcon.parameters = {
  generate: {
    args: {
      leftGlyph: <Icon glyph="Cloud" />,
      rightGlyph: <Icon glyph="Cloud" />,
    },
  },
};
export const WithoutIcon: StoryType<any> = () => <></>;
WithoutIcon.parameters = {
  generate: {
    args: {},
  },
};
