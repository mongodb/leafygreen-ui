/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { isValid } from 'date-fns';

import { StoryMetaType } from '@leafygreen-ui/lib';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../DatePickerContext';

import { DateInputBox } from './DateInputBox';

const meta: StoryMetaType<typeof DateInputBox, DatePickerContextProps> = {
  title: 'Components/DatePicker/DateInputBox',
  component: DateInputBox,
  decorators: [
    (Story, ctx) => (
      // @ts-expect-error - decoratorFn context only has access to component props
      <DatePickerProvider value={{ ...ctx.args }}>
        <Story />
      </DatePickerProvider>
    ),
  ],
  parameters: {
    default: null,
    generate: {},
  },
  args: {
    label: 'Label',
    dateFormat: 'en-UK',
    timeZone: 'Europe/London',
  },
  argTypes: {
    value: { control: 'date' },
  },
};

export default meta;

export const Basic: StoryFn<typeof DateInputBox> = props => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (props.value && isValid(new Date(props.value))) {
      setDate(new Date(props.value));
    }
  }, [props.value]);

  const updateDate = (date: Date | null) => {
    setDate(date);
  };

  return (
    <>
      <DateInputBox {...props} value={date} setValue={updateDate} />
    </>
  );
};

export const Generated = () => {};
