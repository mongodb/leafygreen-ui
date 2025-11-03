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
  segmentRefsMock,
  segmentsMock,
} from '../testutils/testutils.mocks';

import { InputSegment } from '.';
import { InputBoxProvider } from '../InputBoxContext';

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

    min: defaultMinMock[SegmentObjMock.Day],
    max: defaultMaxMock[SegmentObjMock.Day],
    size: Size.Default,
    placeholder: defaultPlaceholderMock[SegmentObjMock.Day],
    shouldRollover: true,
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
        'min',
        'max',
        'shouldRollover',
        'shouldSkipValidation',
        'step',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        segment: ['day', 'month', 'year'],
        size: Object.values(Size),
      },
      decorator: (StoryFn, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <InputBoxProvider
            charsPerSegment={charsPerSegmentMock}
            segmentEnum={SegmentObjMock}
            onChange={() => {}}
            onBlur={() => {}}
            segmentRefs={segmentRefsMock}
            segments={{
              day: '02',
              month: '8',
              year: '2025',
            }}
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
  return (
    <InputBoxProvider
      charsPerSegment={charsPerSegmentMock}
      segmentEnum={SegmentObjMock}
      onChange={() => {}}
      onBlur={() => {}}
      segmentRefs={segmentRefsMock}
      segments={segmentsMock}
    >
      <InputSegment {...props} />
    </InputBoxProvider>
  );
};

export const Generated = () => {};

// TODO: save this and then update DatePicker. Ask team about tests for date picker.
// TODO: add min/max tests
// TODO: documentation
// TODO: PR comments
