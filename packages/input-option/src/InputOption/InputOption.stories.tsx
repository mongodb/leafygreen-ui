/* eslint-disable react/jsx-key */
import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { Decorator, StoryFn, StoryObj } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';

import {
  InputOptionContent,
  InputOptionContentProps,
} from '../InputOptionContent';

import { InputOption, type InputOptionProps } from '.';

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

export const Generated = {
  render: () => <></>,
  parameters: {
    generate: {
      combineArgs: {
        selected: [false, true],
        disabled: [false, true],
      },
    },
  },
} satisfies StoryObj<typeof InputOption>;

const _withContentDecorator: Decorator<InputOptionContentProps> = (
  Instance,
  ctx,
) => {
  return (
    <Instance>
      <InputOptionContent
        leftGlyph={ctx.args.leftGlyph}
        rightGlyph={ctx.args.rightGlyph}
        description={ctx.args.description}
        {...ctx.args}
      >
        {ctx.args.children}
      </InputOptionContent>
    </Instance>
  );
};

export const WithContent = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        showWedge: true,
      },
      combineArgs: {
        description: [undefined, 'Description'],
        preserveIconSpace: [false, true],
        leftGlyph: [undefined, <Icon glyph="Cloud" />],
        rightGlyph: [undefined, <Icon glyph="ChevronDown" />],
        highlighted: [false, true],
        disabled: [false, true],
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
      decorator: _withContentDecorator,
    },
  },
} satisfies StoryObj<typeof InputOptionContent>;
