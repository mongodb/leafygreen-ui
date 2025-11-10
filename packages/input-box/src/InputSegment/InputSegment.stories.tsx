import React, { useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { InputBoxProvider } from '../InputBoxContext';
import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  defaultPlaceholderMock,
  SegmentObjMock,
  segmentRefsMock,
  segmentsMock,
} from '../testutils/testutils.mocks';

import { InputSegment } from '.';
import { InputSegmentChangeEventHandler } from '../shared/types';

interface InputSegmentStoryProps {
  size: Size;
  segments: Record<SegmentObjMock, string>;
}

const meta: StoryMetaType<typeof InputSegment, InputSegmentStoryProps> = {
  title: 'Components/Inputs/InputBox/InputSegment',
  component: InputSegment,
  decorators: [
    (StoryFn, context: any) => (
      <LeafyGreenProvider darkMode={context?.args?.darkMode}>
        <StoryFn />
      </LeafyGreenProvider>
    ),
  ],
  args: {
    segment: SegmentObjMock.Day,
    minSegmentValue: defaultMinMock[SegmentObjMock.Day],
    maxSegmentValue: defaultMaxMock[SegmentObjMock.Day],
    size: Size.Default,
    placeholder: defaultPlaceholderMock[SegmentObjMock.Day],
    shouldWrap: true,
    step: 1,
    darkMode: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
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
        'shouldSkipValidation',
        'step',
        'placeholder',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        segment: ['day', 'month', 'year'],
        size: Object.values(Size),
        segments: [
          {
            day: '2',
            month: '8',
            year: '2025',
          },
          {
            day: '00',
            month: '0',
            year: '0000',
          },
          {
            day: '',
            month: '',
            year: '',
          },
        ],
      },
      decorator: (StoryFn, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <InputBoxProvider
            charsPerSegment={charsPerSegmentMock}
            segmentEnum={SegmentObjMock}
            onChange={() => {}}
            onBlur={() => {}}
            segmentRefs={segmentRefsMock}
            segments={context?.args.segments}
            size={context?.args.size}
            disabled={false}
          >
            <StoryFn
              placeholder={
                defaultPlaceholderMock[context?.args.segment as SegmentObjMock]
              }
            />
          </InputBoxProvider>
        </LeafyGreenProvider>
      ),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<typeof InputSegment> = (
  props,
  context: any,
) => {
  const [segments, setSegments] = useState(segmentsMock);

  const handleChange: InputSegmentChangeEventHandler<
    SegmentObjMock,
    string
  > = ({ segment, value }) => {
    setSegments(prev => ({ ...prev, [segment]: value }));
  };

  return (
    <InputBoxProvider
      charsPerSegment={charsPerSegmentMock}
      segmentEnum={SegmentObjMock}
      onChange={handleChange}
      onBlur={() => {}}
      segmentRefs={segmentRefsMock}
      segments={segments}
      disabled={false}
      size={context?.args?.size || Size.Default}
    >
      <InputSegment {...props} autoComplete="off" />
    </InputBoxProvider>
  );
};

export const Generated = () => {};
