import React, { useState } from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { TimeInput } from '.';
import { DateType, SupportedLocales } from '@leafygreen-ui/date-utils';

const meta: StoryMetaType<typeof TimeInput> = {
  title: 'Components/Inputs/TimeInput',
  component: TimeInput,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        'handleValidation',
        'initialValue',
        'onChange',
        'onDateChange',
        'onSegmentChange',
        'value',
        'onTimeChange',
      ],
    },
  },
  args: {
    showSeconds: true,
    locale: SupportedLocales.ISO_8601,
  },
  argTypes: {
    locale: { control: 'select', options: Object.values(SupportedLocales) },
  },
};

export default meta;

const Template: StoryFn<typeof TimeInput> = props => {
  const [value, setValue] = useState<DateType>(new Date());

  return (
    <TimeInput {...props} value={value} onTimeChange={time => setValue(time)} />
  );
};

export const LiveExample = Template.bind({});
