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

interface InputSegmentStoryProps {
  darkMode: boolean;
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
    charsPerSegment: charsPerSegmentMock[SegmentObjMock.Day],
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
        'shouldValidate',
        'step',
        'placeholder',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        segment: ['day', 'year'],
        size: Object.values(Size),
        value: ['', '2', '0', '00', '2025', '0000'],
      },
      excludeCombinations: [
        {
          value: ['2', '0', '00'],
          segment: 'year',
        },
        {
          value: ['2025', '0000'],
          segment: ['day'],
        },
      ],
      decorator: (StoryFn, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <StoryFn
            placeholder={
              defaultPlaceholderMock[context?.args.segment as SegmentObjMock]
            }
          />
        </LeafyGreenProvider>
      ),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<typeof InputSegment> = ({
  // @ts-ignore - darkMode is not a valid prop for InputSegment
  darkMode: _darkMode,
  ...rest
}) => {
  const [value, setValue] = useState<string>('');

  return (
    <InputSegment
      {...rest}
      autoComplete="off"
      value={value}
      onChange={({ value }) => {
        setValue(value);
      }}
    />
  );
};

export const Generated = () => {};
