import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { InputSegment, type InputSegmentProps } from '../InputSegment';

import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  defaultPlaceholderMock,
  InputSegmentValueMock,
  SegmentObjMock,
} from './testutils.mocks';

/*
 * InputSegment Utils // TODO: remove this?
 */
export const setSegmentProps = (segment: SegmentObjMock) => {
  return {
    segment: segment,
    charsPerSegment: charsPerSegmentMock[segment],
    minSegmentValue: defaultMinMock[segment],
    maxSegmentValue: defaultMaxMock[segment],
    placeholder: defaultPlaceholderMock[segment],
  };
};

interface RenderSegmentReturnType {
  getInput: () => HTMLInputElement;
  input: HTMLInputElement;
  rerenderSegment: (
    newProps: Partial<InputSegmentProps<SegmentObjMock, InputSegmentValueMock>>,
  ) => void;
}

const defaultSegmentProps: InputSegmentProps<
  SegmentObjMock,
  InputSegmentValueMock
> = {
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
  props: Partial<InputSegmentProps<SegmentObjMock, InputSegmentValueMock>>,
): RenderResult & RenderSegmentReturnType => {
  const mergedProps = {
    ...defaultSegmentProps,
    ...props,
  } as InputSegmentProps<SegmentObjMock, InputSegmentValueMock>;

  const utils = render(<InputSegment {...mergedProps} />);

  const rerenderSegment = (
    newProps: Partial<InputSegmentProps<SegmentObjMock, InputSegmentValueMock>>,
  ) => {
    utils.rerender(<InputSegment {...mergedProps} {...newProps} />);
  };

  const getInput = () =>
    utils.getByTestId('lg-input-segment') as HTMLInputElement;
  return { ...utils, getInput, input: getInput(), rerenderSegment };
};
