import React from 'react';
import { StoryFn } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import {
  InputOptionContent,
  InputOptionContentProps,
} from '../InputOptionContent';

import {
  ActionType,
  CheckedVariant,
  InputOption,
  type InputOptionProps,
} from '.';

const meta: StoryMetaType<typeof InputOption> = {
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
      storyNames: ['Hover', 'Focus'],
      combineArgs: {
        disabled: [false, true],
        highlighted: [false, true],
        checked: [false, true],
        showWedge: [false, true],
        checkedVariant: Object.values(CheckedVariant),
        actionType: Object.values(ActionType),
        darkMode: [false, true],
      },
    },
  },
  args: {
    children: 'Some text',
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
};

export default meta;

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

export const Generated = () => {};

export const Hover = () => <></>;
Hover.parameters = {
  generate: {
    args: {
      'data-hover': true,
    },
  },
};

export const Focus = () => <></>;
Focus.parameters = {
  generate: {
    args: {
      'data-focus': true,
    },
  },
};
