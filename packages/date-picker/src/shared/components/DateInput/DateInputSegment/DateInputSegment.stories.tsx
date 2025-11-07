import React, { useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import {
  InputBoxProvider,
  InputSegmentChangeEventHandler,
} from '@leafygreen-ui/input-box';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { charsPerSegment } from '../../../constants';
import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
} from '../../../context';
import { useSegmentRefs } from '../../../hooks';
import { DateSegment } from '../../../types';
import { DateInputBoxProvider } from '../DateInputBoxContext';

import { DateInputSegment } from './DateInputSegment';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => {
  const { value, segment, size, darkMode } = ctx?.args ?? {};
  const segments = {
    day: segment === 'day' ? value : '',
    month: segment === 'month' ? value : '',
    year: segment === 'year' ? value : '',
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <SharedDatePickerProvider {...ctx?.args}>
        <DateInputBoxProvider>
          <InputBoxProvider
            charsPerSegment={charsPerSegment}
            segmentEnum={DateSegment}
            onChange={() => {}}
            onBlur={() => {}}
            segmentRefs={useSegmentRefs()}
            segments={segments}
            size={size}
            disabled={false}
          >
            <Story />
          </InputBoxProvider>
        </DateInputBoxProvider>
      </SharedDatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<
  typeof DateInputSegment,
  SharedDatePickerContextProps
> = {
  title: 'Components/Inputs/DatePicker/Shared/DateInputSegment',
  component: DateInputSegment,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [undefined, '6', '2023'],
        segment: ['day', 'month', 'year'],
        size: Object.values(Size),
      },
      decorator: ProviderWrapper,
      excludeCombinations: [
        {
          value: '6',
          segment: 'year',
        },
        {
          value: '2023',
          segment: ['day', 'month'],
        },
      ],
    },
  },
  args: {
    segment: 'day',
  },
  argTypes: {
    segment: {
      control: 'select',
      options: ['day', 'month', 'year'],
    },
  },
};

export default meta;

const Template: StoryFn<typeof DateInputSegment> = props => {
  const [segments, setSegments] = useState({
    day: '',
    month: '',
    year: '',
  });

  const handleChange: InputSegmentChangeEventHandler<DateSegment, string> = ({
    segment,
    value,
  }) => {
    setSegments(prev => ({ ...prev, [segment]: value }));
  };

  return (
    <LeafyGreenProvider>
      <DateInputBoxProvider>
        <InputBoxProvider
          charsPerSegment={charsPerSegment}
          segmentEnum={DateSegment}
          onChange={handleChange}
          onBlur={() => {}}
          segmentRefs={useSegmentRefs()}
          segments={segments}
          size={Size.Default}
          disabled={false}
        >
          <DateInputSegment {...props} />
        </InputBoxProvider>
      </DateInputBoxProvider>
    </LeafyGreenProvider>
  );
};

export const Basic = Template.bind({});

Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
