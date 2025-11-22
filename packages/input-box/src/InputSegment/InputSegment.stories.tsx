import React, { useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Size } from '../shared.types';
import {
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
    minSegmentValue: 0,
    maxSegmentValue: 31,
    size: Size.Default,
    placeholder: 'DD',
    shouldWrap: true,
    step: 1,
    darkMode: false,
    charsCount: 2,
    segmentEnum: SegmentObjMock,
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
        'charsCount',
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
        value: ['', '2', '02', '0', '00', '2025', '0000'],
        // @ts-expect-error - data-focus is not a valid prop for InputSegment
        'data-focus': [false, true],
      },
      excludeCombinations: [
        {
          value: ['2', '02', '0', '00'],
          segment: 'year',
        },
        {
          value: ['2025', '0000'],
          segment: ['day'],
        },
        [
          // @ts-expect-error - data-focus is not a valid prop for InputSegment
          'data-focus',
          {
            value: ['02', '0', '00', '2025', '0000'],
          },
        ],
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
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
