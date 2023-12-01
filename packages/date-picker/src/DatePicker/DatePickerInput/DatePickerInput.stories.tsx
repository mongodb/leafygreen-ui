/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { isValid } from 'date-fns';
import { isUndefined } from 'lodash';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../shared/components/DatePickerContext';
import { getProviderPropsFromStoryArgs } from '../DatePicker.testutils';
import { DatePickerProps } from '../DatePicker.types';
import {
  SingleDateContextProps,
  SingleDateProvider,
  SingleDateProviderProps,
} from '../SingleDateContext';

import { DatePickerInput } from './DatePickerInput';

const ProviderWrapper = (Story: StoryFn, ctx: any) => {
  const { contextProps, componentProps } = getProviderPropsFromStoryArgs(
    ctx?.args,
  );

  return (
    <LeafyGreenProvider darkMode={contextProps.darkMode}>
      <DatePickerProvider {...contextProps}>
        <Story {...componentProps} />
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<
  typeof DatePickerInput,
  SingleDateContextProps & DatePickerContextProps
> = {
  title: 'Components/DatePicker/DatePicker/DatePickerInput',
  component: DatePickerInput,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    controls: {
      exclude: ['segmentRefs'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [null, new Date('1993-12-26')],
        dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        size: Object.values(Size),
      },
      decorator: ProviderWrapper,
    },
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

export const Basic: StoryFn<DatePickerProps & SingleDateProviderProps> = ({
  value,
}) => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (value && isValid(new Date(value))) {
      setDate(new Date(value));
    }
  }, [value]);

  const updateDate = (date?: Date | null) => {
    if (!isUndefined(date)) {
      setDate(date);
    }
  };

  return (
    <SingleDateProvider value={date} setValue={updateDate}>
      <DatePickerInput />
    </SingleDateProvider>
  );
};

export const Generated = () => {};
