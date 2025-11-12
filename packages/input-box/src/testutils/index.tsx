import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { InputSegment, type InputSegmentProps } from '../InputSegment';

import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  defaultPlaceholderMock,
  SegmentObjMock,
} from './testutils.mocks';

interface RenderSegmentReturnType {
  getInput: () => HTMLInputElement;
  input: HTMLInputElement;
  rerenderSegment: (
    newProps: Partial<InputSegmentProps<SegmentObjMock>>,
  ) => void;
}

const defaultSegmentProps: InputSegmentProps<SegmentObjMock> = {
  segment: 'day',
  minSegmentValue: defaultMinMock['day'],
  maxSegmentValue: defaultMaxMock['day'],
  shouldWrap: true,
  placeholder: defaultPlaceholderMock['day'],
  onChange: () => {},
  onBlur: () => {},
  value: '',
  charsPerSegment: charsPerSegmentMock['day'],
  segmentEnum: SegmentObjMock,
  // @ts-expect-error - data-testid
  ['data-testid']: 'lg-input-segment',
};

/**
 * Renders the InputSegment component for testing purposes.
 */
export const renderSegment = (
  props: Partial<InputSegmentProps<SegmentObjMock>>,
): RenderResult & RenderSegmentReturnType => {
  const mergedProps = {
    ...defaultSegmentProps,
    ...props,
  } as InputSegmentProps<SegmentObjMock>;

  const utils = render(<InputSegment {...mergedProps} />);

  const rerenderSegment = (
    newProps: Partial<InputSegmentProps<SegmentObjMock>>,
  ) => {
    utils.rerender(<InputSegment {...mergedProps} {...newProps} />);
  };

  const getInput = () =>
    utils.getByTestId('lg-input-segment') as HTMLInputElement;
  return { ...utils, getInput, input: getInput(), rerenderSegment };
};
