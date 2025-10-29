/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  defaultPlaceholderMock,
  SegmentObjMock,
} from '../testutils';

import { InputSegment } from '.';

const meta: StoryMetaType<typeof InputSegment> = {
  title: 'Components/Inputs/InputBox/InputSegment',
  component: InputSegment,
  decorators: [
    (StoryFn, context) => (
      <LeafyGreenProvider darkMode={context?.args?.darkMode}>
        <StoryFn />
      </LeafyGreenProvider>
    ),
  ],
  args: {
    segment: SegmentObjMock.Day,
    value: '',
    charsPerSegment: charsPerSegmentMock[SegmentObjMock.Day],
    segmentObj: SegmentObjMock,
    min: defaultMinMock[SegmentObjMock.Day],
    max: defaultMaxMock[SegmentObjMock.Day],
    size: Size.Default,
    placeholder: defaultPlaceholderMock[SegmentObjMock.Day],
    shouldNotRollover: false,
    step: 1,
    darkMode: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    shouldNotRollover: {
      control: 'boolean',
    },
    step: {
      control: 'number',
    },
    darkMode: {
      control: 'boolean',
    },
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'segment',
        'value',
        'onChange',
        'charsPerSegment',
        'segmentEnum',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: ['', '6', '06'],
        segment: ['day'],
        size: Object.values(Size),
      },
      decorator: (StoryFn, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <StoryFn />
        </LeafyGreenProvider>
      ),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<typeof InputSegment> = props => {
  const [value, setValue] = useState<string>('');
  return (
    <InputSegment
      {...props}
      value={value}
      onChange={({ value }) => {
        setValue(value);
        console.log('🌻Storybook: onChange', { value });
      }}
    />
  );
};

export const Generated = () => {};
