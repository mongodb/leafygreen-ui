import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Size } from '@leafygreen-ui/tokens';

import { SegmentObjMock } from './testutils/testutils.mocks';
import { InputBox, InputBoxProps } from './InputBox';
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
        'charsPerSegment',
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
    size: {
      control: 'select',
      options: Object.values(Size),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<typeof InputBox> = props => {
  return (
    <InputBoxWithState {...(props as Partial<InputBoxProps<SegmentObjMock>>)} />
  );
};
