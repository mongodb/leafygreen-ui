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
  InputOption,
  type InputOptionProps,
  RenderedContext,
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
      storyNames: ['FormElement', 'Menu'],
      args: {
        showWedge: true,
      },
      combineArgs: {
        disabled: [false, true],
        highlighted: [false, true],
        checked: [false, true],
        darkMode: [false, true],
        'data-hover': [false, true],
        'data-focus': [false, true],
      },
      decorator: (Instance, context) => (
        <Instance>
          <InputOptionContent
            description="Description"
            leftGlyph={<Icon glyph="Cloud" />}
            rightGlyph={<Icon glyph="ChevronDown" />}
          >
            Title
          </InputOptionContent>
        </Instance>
      ),
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    highlighted: {
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

export const FormElement = () => <></>;
FormElement.parameters = {
  generate: {
    args: {
      renderedContext: RenderedContext.Form,
    },
  },
};

export const Menu = () => <></>;
Menu.parameters = {
  generate: {
    combineArgs: {
      actionType: Object.values(ActionType),
    },
    args: {
      renderedContext: RenderedContext.Menu,
    },
  },
};
