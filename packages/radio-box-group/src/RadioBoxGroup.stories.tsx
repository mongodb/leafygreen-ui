import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';

import { RadioBox, RadioBoxGroup, type RadioBoxGroupProps, Size } from '.';

const meta: StoryMetaType<typeof RadioBoxGroup> = {
  title: 'Components/RadioBoxGroup',
  component: RadioBoxGroup,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children', 'name', 'value'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
      },
    },
  },
  args: {
    children: (
      <>
        <RadioBox checked value="1">
          Option One
        </RadioBox>
        <RadioBox value="2">Option Two</RadioBox>
        <RadioBox disabled={true} value="option-3">
          Disabled Option
        </RadioBox>
      </>
    ),
  },
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

export const LiveExample: StoryFn<RadioBoxGroupProps> = (
  args: RadioBoxGroupProps,
) => <RadioBoxGroup name="radio-box-group-default" {...args} />;
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Controlled: StoryFn<RadioBoxGroupProps> = (
  args: RadioBoxGroupProps,
) => {
  const [activeRadioBox, setActiveRadioBox] = useState<string>('test1');

  const handleChange = (e: React.FormEvent) => {
    setActiveRadioBox((e.target as HTMLInputElement).value);
  };

  return (
    <LiveExample {...args} onChange={handleChange} value={activeRadioBox} />
  );
};
Controlled.parameters = {
  chromatic: { disableSnapshot: true },
};
Controlled.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const TooltipTest = ({ darkMode }: RadioBoxGroupProps) => {
  return (
    <RadioBoxGroup darkMode={darkMode}>
      <Tooltip
        darkMode={darkMode}
        justify="middle"
        trigger={<RadioBox value="one">One</RadioBox>}
      >
        This one is pretty cool.
      </Tooltip>
      <Tooltip
        darkMode={darkMode}
        justify="middle"
        trigger={<RadioBox value="two">Two</RadioBox>}
      >
        This does a thing.
      </Tooltip>

      <Tooltip
        darkMode={darkMode}
        justify="middle"
        trigger={
          <RadioBox value="three" disabled>
            Three
          </RadioBox>
        }
      >
        This is disabled for a reason.
      </Tooltip>
    </RadioBoxGroup>
  );
};
TooltipTest.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
