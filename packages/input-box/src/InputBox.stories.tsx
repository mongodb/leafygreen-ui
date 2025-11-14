import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { SegmentObjMock } from './testutils/testutils.mocks';
import { InputBox, InputBoxProps } from './InputBox';
import { Size } from './shared.types';
import { InputBoxWithState } from './testutils';

const meta: StoryMetaType<typeof InputBox> = {
  title: 'Components/Inputs/InputBox',
  component: InputBox,
  decorators: [
    StoryFn => (
      <div
        className={css`
          border: 1px solid ${palette.gray.base};
        `}
      >
        <StoryFn />
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
