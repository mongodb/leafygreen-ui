import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { InputBox, InputBoxProps } from '../InputBox';
import { InputSegment, type InputSegmentProps } from '../InputSegment';
import { InputSegmentComponentProps, Size } from '../shared.types';

import {
  defaultFormatPartsMock,
  defaultMaxMock,
  defaultMinMock,
  defaultPlaceholderMock,
  SegmentObjMock,
  segmentRefsMock,
  segmentRulesMock,
  segmentsMock,
  segmentWidthStyles,
} from './testutils.mocks';

export const defaultProps: Partial<InputBoxProps<SegmentObjMock>> = {
  segments: segmentsMock,
  segmentEnum: SegmentObjMock,
  segmentRefs: segmentRefsMock,
  setSegment: () => {},
  formatParts: defaultFormatPartsMock,
  segmentRules: segmentRulesMock,
};

/**
 * This component is used to render the InputSegment component for testing purposes.
 * @param segment - The segment to render
 * @returns
 */
export const InputSegmentWrapper = React.forwardRef<
  HTMLInputElement,
  InputSegmentComponentProps<SegmentObjMock>
>(
  (
    {
      segment,
      value,
      onChange = () => {},
      onBlur = () => {},
      segmentEnum = SegmentObjMock,
      disabled = false,
      charsCount,
      size,
    },
    ref,
  ) => {
    return (
      <InputSegment
        segment={segment}
        data-testid={`input-segment-${segment}`}
        className={segmentWidthStyles[segment]}
        shouldValidate={segment !== SegmentObjMock.Year}
        shouldWrap={segment !== SegmentObjMock.Year}
        placeholder={defaultPlaceholderMock[segment]}
        autoComplete="off"
        minSegmentValue={defaultMinMock[segment]}
        maxSegmentValue={defaultMaxMock[segment]}
        value={value}
        charsCount={charsCount}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
        segmentEnum={segmentEnum}
        ref={ref}
        disabled={disabled}
      />
    );
  },
);

InputSegmentWrapper.displayName = 'InputSegmentWrapper';

/**
 * This component is used to render the InputBox component for testing purposes.
 * Includes segment state management and a default renderSegment function.
 * Props can override the internal state management.
 */
export const InputBoxWithState = ({
  segments: segmentsProp = {
    day: '',
    month: '',
    year: '',
  },
  setSegment: setSegmentProp,
  disabled = false,
  size = Size.Default,
  ...props
}: Partial<InputBoxProps<SegmentObjMock>> & {
  segments?: Record<SegmentObjMock, string>;
}) => {
  const [segments, setSegments] = React.useState(segmentsProp);

  const defaultSetSegment = (segment: SegmentObjMock, value: string) => {
    setSegments(prev => ({ ...prev, [segment]: value }));
  };

  // If setSegment is provided, use controlled mode with the provided segments
  // Otherwise, use internal state management
  const effectiveSegments = setSegmentProp ? segmentsProp : segments;
  const effectiveSetSegment = setSegmentProp ?? defaultSetSegment;

  return (
    <InputBox
      segmentEnum={SegmentObjMock}
      segments={effectiveSegments}
      setSegment={effectiveSetSegment}
      formatParts={defaultFormatPartsMock}
      segmentRules={segmentRulesMock}
      segmentComponent={InputSegmentWrapper}
      disabled={disabled}
      size={size}
      {...props}
    />
  );
};

interface RenderInputBoxReturnType {
  dayInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  yearInput: HTMLInputElement;
  rerenderInputBox: (props: Partial<InputBoxProps<SegmentObjMock>>) => void;
  getDayInput: () => HTMLInputElement;
  getMonthInput: () => HTMLInputElement;
  getYearInput: () => HTMLInputElement;
}

/**
 * Renders InputBox with internal state management for testing purposes.
 * Props can be passed to override the default state behavior.
 */
export const renderInputBox = ({
  ...props
}: Partial<InputBoxProps<SegmentObjMock>> = {}): RenderResult &
  RenderInputBoxReturnType => {
  const result = render(<InputBoxWithState {...props} />);

  const getDayInput = () =>
    result.getByTestId('input-segment-day') as HTMLInputElement;
  const getMonthInput = () =>
    result.getByTestId('input-segment-month') as HTMLInputElement;
  const getYearInput = () =>
    result.getByTestId('input-segment-year') as HTMLInputElement;

  const rerenderInputBox = (
    newProps: Partial<InputBoxProps<SegmentObjMock>>,
  ) => {
    result.rerender(<InputBoxWithState {...props} {...newProps} />);
  };

  return {
    ...result,
    rerenderInputBox,
    dayInput: getDayInput(),
    monthInput: getMonthInput(),
    yearInput: getYearInput(),
    getDayInput,
    getMonthInput,
    getYearInput,
  };
};

interface RenderSegmentReturnType {
  getInput: () => HTMLInputElement;
  input: HTMLInputElement;
  rerenderSegment: (
    newProps: Partial<InputSegmentProps<SegmentObjMock>>,
  ) => void;
}

const defaultSegmentProps: InputSegmentProps<SegmentObjMock> = {
  segment: 'day',
  minSegmentValue: 0,
  maxSegmentValue: 31,
  shouldWrap: true,
  placeholder: 'DD',
  onChange: () => {},
  onBlur: () => {},
  value: '',
  charsCount: 2,
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
