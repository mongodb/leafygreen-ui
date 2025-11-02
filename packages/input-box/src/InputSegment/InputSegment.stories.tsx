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
} from '../testutils/testutils.mocks';

import { InputSegment } from '.';
import { InputBoxProvider } from '../InputBoxContext';

const meta: StoryMetaType<typeof InputSegment> = {
  title: 'Components/Inputs/InputBox/InputSegment',
  component: InputSegment,
  decorators: [
    (StoryFn, context) => (
      <LeafyGreenProvider darkMode={context?.args?.darkMode}>
        <InputBoxProvider
          charsPerSegment={charsPerSegmentMock}
          segmentEnum={SegmentObjMock}
          onChange={() => {}}
          onBlur={() => {}}
        >
          <StoryFn />
        </InputBoxProvider>
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
          <InputBoxProvider
            charsPerSegment={charsPerSegmentMock}
            segmentEnum={SegmentObjMock}
            onChange={() => {}}
            onBlur={() => {}}
          >
            <StoryFn />
          </InputBoxProvider>
        </LeafyGreenProvider>
      ),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<typeof InputSegment> = props => {
  const [value, setValue] = useState<string>('');
  return (
    <InputBoxProvider
      charsPerSegment={charsPerSegmentMock}
      segmentEnum={SegmentObjMock}
      onChange={({ value }) => {
        setValue(value);
        console.log('🌻Storybook: onChange', { value });
      }}
      onBlur={() => {}}
    >
      <InputSegment {...props} value={value} />
    </InputBoxProvider>
  );
};

export const Generated = () => {};
