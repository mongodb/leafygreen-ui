/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

import Button from '@leafygreen-ui/button';
import {
  DateType,
  isValidDate,
  Month,
  newUTC,
  testLocales,
  testTimeZoneLabels,
} from '@leafygreen-ui/date-utils';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import Modal from '@leafygreen-ui/modal';
import { Size } from '@leafygreen-ui/tokens';
import { Overline } from '@leafygreen-ui/typography';

import { MAX_DATE, MIN_DATE } from './shared/constants';
import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
} from './shared/context';
import { getProviderPropsFromStoryContext } from './shared/testutils/getProviderPropsFromStoryContext';
import { AutoComplete } from './shared/types';
import { DatePicker } from './DatePicker';

const ProviderWrapper = (Story: StoryFn, ctx: any) => {
  const { leafyGreenProviderProps, datePickerProviderProps, storyProps } =
    getProviderPropsFromStoryContext(ctx?.args);

  return (
    <LeafyGreenProvider {...leafyGreenProviderProps}>
      <SharedDatePickerProvider {...datePickerProviderProps}>
        <Story {...storyProps} />
      </SharedDatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DatePicker, SharedDatePickerContextProps> = {
  title: 'Components/DatePicker/DatePicker',
  component: DatePicker,
  decorators: [ProviderWrapper],
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
    description: 'description',
    size: Size.Default,
    autoComplete: AutoComplete.Off,
    min: MIN_DATE,
    max: MAX_DATE,
  },
  argTypes: {
    baseFontSize: { control: 'select' },
    locale: { control: 'select', options: testLocales },
    description: { control: 'text' },
    label: { control: 'text' },
    min: { control: 'date' },
    max: { control: 'date' },
    size: { control: 'select' },
    state: { control: 'select' },
    timeZone: {
      control: 'select',
      options: [undefined, ...testTimeZoneLabels],
    },
    autoComplete: { control: 'select', options: Object.values(AutoComplete) },
  },
};

export default meta;

export const LiveExample: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<DateType>();

  return (
    <div
      className={css`
        width: 200px;
      `}
    >
      <DatePicker
        {...props}
        value={value}
        onDateChange={v => {
          // eslint-disable-next-line no-console
          console.log('Storybook: onDateChange', {
            value: v!.toUTCString(),
            'value with local browser timezone': v,
          });
          setValue(v);
        }}
        handleValidation={date =>
          // eslint-disable-next-line no-console
          console.log('Storybook: handleValidation', {
            'date with local browser timezone': date,
          })
        }
      />
      <br />
      <Overline>Current value</Overline>
      <code>
        {isValidDate(value)
          ? value.toISOString()
          : isNull(value) || isUndefined(value)
          ? String(value)
          : value.toDateString()}
      </code>
    </div>
  );
};

export const Uncontrolled: StoryFn<typeof DatePicker> = props => {
  return <DatePicker {...props} />;
};
Uncontrolled.parameters = {
  chromatic: {
    disableSnapshots: true,
  },
};

export const InModal: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<DateType>();
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
