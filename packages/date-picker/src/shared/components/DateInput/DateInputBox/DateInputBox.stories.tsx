/* eslint-disable react/prop-types */
import React, { createRef, useEffect, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { isValid } from 'date-fns';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit, StoryMetaType, StoryType } from '@leafygreen-ui/lib';

import { Month } from '../../../constants';
import { newUTC } from '../../../utils';
import { Locales } from '../../../utils/testutils';
import {
  contextPropNames,
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateInputBox } from './DateInputBox';

const testDate = newUTC(1993, Month.December, 26);

const segmentRefs = {
  day: createRef<HTMLInputElement>(),
  month: createRef<HTMLInputElement>(),
  year: createRef<HTMLInputElement>(),
};

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => {
  const [contextProps, componentProps] = pickAndOmit(
    ctx?.args,
    contextPropNames,
  );

  return (
    <LeafyGreenProvider darkMode={contextProps.darkMode}>
      <DatePickerProvider {...contextProps}>
        <Story {...componentProps} />
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DateInputBox, DatePickerContextProps> = {
  title: 'Components/DatePicker/Shared/DateInputBox',
  component: DateInputBox,
  decorators: [ProviderWrapper],
  parameters: {
    controls: {
      exclude: ['onSegmentChange', 'setValue'],
    },
    default: null,
    generate: {
      storyNames: ['Formats'],
      combineArgs: {
        darkMode: [false, true],
        value: [null, testDate],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    label: 'Label',
    dateFormat: 'iso8601',
    timeZone: 'Europe/London',
  },
  argTypes: {
    value: { control: 'date' },
    dateFormat: { control: 'select', options: Locales },
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
    <DateInputBox
      value={date}
      setValue={updateDate}
      segmentRefs={segmentRefs}
    />
  );
};

export const Static: StoryFn<typeof DateInputBox> = () => {
  return <DateInputBox value={testDate} segmentRefs={segmentRefs} />;
};

export const Formats: StoryType<
  typeof DateInputBox,
  DatePickerContextProps
> = () => <></>;
Formats.parameters = {
  generate: {
    combineArgs: {
      dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
    },
  },
};
