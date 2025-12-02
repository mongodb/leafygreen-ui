import React, { useState } from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { DateType, SupportedLocales } from '@leafygreen-ui/date-utils';

import { TimeInput } from '.';

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
    timeZone: 'UTC',
    label: 'Time Input',
  },
  argTypes: {
    locale: { control: 'select', options: Object.values(SupportedLocales) },
    timeZone: {
      control: 'select',
      options: [undefined, 'UTC', 'America/New_York', 'Europe/London'],
    },
  },
};

export default meta;

const Template: StoryFn<typeof TimeInput> = props => {
  const [value, setValue] = useState<DateType | undefined>(
    new Date('1990-02-20T14:30:50Z'),
  );
  // const [value, setValue] = useState<DateType | undefined>();
  // const [value, setValue] = useState<DateType | undefined>(
  //   new Date('1990--20T14:30:50Z'),
  // );

  return (
    <TimeInput {...props} value={value} onTimeChange={time => setValue(time)} />
  );
};

export const LiveExample = Template.bind({});
