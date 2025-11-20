/* eslint-disable no-console */
import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';

import {
  dateSegmentEmptyMock,
  defaultFormatPartsMock,
  SegmentObjMock,
  segmentRulesMock,
  segmentsMock,
  timeFormatPartsMock,
  TimeInputSegmentWrapper,
  TimeSegmentObjMock,
  timeSegmentRulesMock,
  timeSegmentsEmptyMock,
  timeSegmentsMock,
} from './testutils/testutils.mocks';
import { InputBox, InputBoxProps } from './InputBox';
import { Size } from './shared.types';
import { InputBoxWithState, InputSegmentWrapper } from './testutils';

const meta: StoryMetaType<typeof InputBox> = {
  title: 'Components/Inputs/InputBox',
  component: InputBox,
  decorators: [
    (StoryFn, context: any) => (
      <div
        className={css`
          border: 1px solid ${palette.gray.base};
        `}
      >
        <LeafyGreenProvider darkMode={context?.args?.darkMode}>
          <StoryFn />
        </LeafyGreenProvider>
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'segments',
        'segmentObj',
        'segmentRefs',
        'setSegment',
        'formatParts',
        'segmentRules',
        'labelledBy',
        'onSegmentChange',
        'renderSegment',
        'segmentComponent',
        'segmentEnum',
      ],
    },
    generate: {
      storyNames: ['Date', 'Time'],
      combineArgs: {
        disabled: [false, true],
        size: Object.values(Size),
        darkMode: [false, true],
      },
      decorator: (StoryFn, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <StoryFn />
        </LeafyGreenProvider>
      ),
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
  },
  args: {
    disabled: false,
    size: Size.Default,
  },
};
export default meta;

export const LiveExample: StoryFn<typeof InputBox> = props => {
  return (
    <InputBoxWithState {...(props as Partial<InputBoxProps<SegmentObjMock>>)} />
  );
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Date: StoryObj<InputBoxProps<SegmentObjMock>> = {
  parameters: {
    generate: {
      combineArgs: {
        segments: [segmentsMock, dateSegmentEmptyMock],
      },
    },
  },
  args: {
    formatParts: defaultFormatPartsMock,
    segmentRules: segmentRulesMock,
    segmentEnum: SegmentObjMock,
    setSegment: (segment: SegmentObjMock, value: string) => {
      console.log('setSegment', segment, value);
    },
    disabled: false,
    size: Size.Default,
    segmentComponent: InputSegmentWrapper,
  },
};

export const Time: StoryObj<InputBoxProps<TimeSegmentObjMock>> = {
  parameters: {
    generate: {
      combineArgs: {
        segments: [timeSegmentsMock, timeSegmentsEmptyMock],
      },
    },
  },
  args: {
    formatParts: timeFormatPartsMock,
    segmentRules: timeSegmentRulesMock,
    segmentEnum: TimeSegmentObjMock,
    setSegment: (segment: TimeSegmentObjMock, value: string) => {
      console.log('setSegment', segment, value);
    },
    disabled: false,
    size: Size.Default,
    segmentComponent: TimeInputSegmentWrapper,
  },
};
