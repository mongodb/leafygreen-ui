/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import Modal from '@leafygreen-ui/modal';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../shared/components/DatePickerContext';
import { Month } from '../shared/constants';
import { Locales, TimeZones } from '../shared/testutils';
import { AutoComplete } from '../shared/types';
import { newUTC } from '../shared/utils';

import { DatePicker } from './DatePicker';
import { getProviderPropsFromStoryArgs } from './DatePicker.testutils';

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

const meta: StoryMetaType<typeof DatePicker, DatePickerContextProps> = {
  title: 'Components/DatePicker/DatePicker',
  component: DatePicker,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    controls: {
      exclude: [
        'handleValidation',
        'initialValue',
        'onChange',
        'onDateChange',
        'onSegmentChange',
        'value',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [newUTC(2023, Month.December, 26)],
        locale: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        timeZone: ['UTC', 'Europe/London', 'America/New_York', 'Asia/Seoul'],
        disabled: [false, true],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    locale: 'iso8601',
    label: 'Pick a date',
    size: Size.Default,
    autoComplete: AutoComplete.Off,
  },
  argTypes: {
    baseFontSize: { control: 'select' },
    locale: { control: 'select', options: Locales },
    description: { control: 'text' },
    label: { control: 'text' },
    min: { control: 'date' },
    max: { control: 'date' },
    size: { control: 'select' },
    state: { control: 'select' },
    timeZone: { control: 'select', options: [undefined, ...TimeZones] },
    autoComplete: { control: 'select', options: Object.values(AutoComplete) },
  },
};

export default meta;

export const Basic: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<Date | null | undefined>();

  return (
    <DatePicker
      {...props}
      value={value}
      onDateChange={setValue}
      handleValidation={date =>
        // eslint-disable-next-line no-console
        console.log('Storybook: handleValidation', { date })
      }
    />
  );
};

export const Uncontrolled: StoryFn<typeof DatePicker> = props => {
  return <DatePicker {...props} />;
};

export const InModal: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<Date | null | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(curr => !curr)}>Open Modal</Button>
      <Modal open={isModalOpen} setOpen={setIsModalOpen}>
        Inside the modal
        <DatePicker {...props} value={value} onDateChange={setValue} />
      </Modal>
    </>
  );
};
InModal.parameters = {
  chromatic: {
    disableSnapshots: true,
  },
};

export const Generated = () => {};
