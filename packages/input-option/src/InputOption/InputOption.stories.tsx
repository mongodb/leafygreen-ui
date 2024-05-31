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
      storyNames: ['Generated', 'Content'],
      combineArgs: {
        darkMode: [false, true],
        selected: [false, true],
        showWedge: [false, true],
        disabled: [false, true],
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

export const Generated = {
  render: () => <></>,
} satisfies StoryObj<typeof InputOption>;

export const Content = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        showWedge: true,
      },
      combineArgs: {
        leftGlyph: [undefined, <Icon glyph="Cloud" />],
        rightGlyph: [undefined, <Icon glyph="ChevronDown" />],
        description: [undefined, 'Description'],
      },
      decorator: (Instance, ctx) => {
        return (
          <Instance>
            <InputOptionContent
              leftGlyph={ctx.args.leftGlyph}
              rightGlyph={ctx.args.rightGlyph}
              description={ctx.args.description}
            >
              {ctx.args.children}
            </InputOptionContent>
          </Instance>
        );
      },
    },
  },
} satisfies StoryObj<typeof InputOptionContent>;
