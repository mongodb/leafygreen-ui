import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Size } from '@leafygreen-ui/tokens';

import { InputBox, InputBoxProps } from '../InputBox';
import { InputBoxProvider } from '../InputBoxContext';
import { InputBoxProviderProps } from '../InputBoxContext/InputBoxContext';
import { InputSegment } from '../InputSegment';
import {
  InputSegmentChangeEventHandler,
  InputSegmentProps,
} from '../InputSegment/InputSegment.types';

import {
  charsPerSegmentMock,
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
  charsPerSegment: charsPerSegmentMock,
  formatParts: defaultFormatPartsMock,
  segmentRules: segmentRulesMock,
};

export const InputSegmentWrapper = ({
  segment,
}: {
  segment: SegmentObjMock;
}) => {
  return (
    <InputSegment
      segment={segment}
      min={defaultMinMock[segment]}
      max={defaultMaxMock[segment]}
      data-testid={`input-segment-${segment}`}
      className={segmentWidthStyles[segment]}
      shouldSkipValidation={segment === SegmentObjMock.Year}
      shouldWrap={segment !== SegmentObjMock.Year}
      placeholder={defaultPlaceholderMock[segment]}
    />
  );
};

/**
 * This component is used to render the InputBox component for testing purposes.
 * Includes segment state management and a default renderSegment function.
 */
export const InputBoxWithState = ({
  onSegmentChange,
  disabled = false,
  segments: segmentsProp = {
    day: '',
    month: '',
    year: '',
  },
}: {
  onSegmentChange?: InputSegmentChangeEventHandler<SegmentObjMock, string>;
  disabled?: boolean;
  segments?: Record<SegmentObjMock, string>;
}) => {
  const dayRef = React.useRef<HTMLInputElement>(null);
  const monthRef = React.useRef<HTMLInputElement>(null);
  const yearRef = React.useRef<HTMLInputElement>(null);

  const segmentRefs = {
    day: dayRef,
    month: monthRef,
    year: yearRef,
  };

  const [segments, setSegments] = React.useState(segmentsProp);

  const setSegment = (segment: SegmentObjMock, value: string) => {
    setSegments(prev => ({ ...prev, [segment]: value }));
  };

  return (
    <InputBox
      disabled={disabled}
      segmentEnum={SegmentObjMock}
      segmentRefs={segmentRefs}
      segments={segments}
      setSegment={setSegment}
      charsPerSegment={charsPerSegmentMock}
      formatParts={defaultFormatPartsMock}
      segmentRules={segmentRulesMock}
      onSegmentChange={onSegmentChange}
      minValues={defaultMinMock}
      segmentComponent={InputSegmentWrapper}
      size={Size.Default}
    />
  );
};

interface RenderInputBoxWithStateReturnType {
  dayInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  yearInput: HTMLInputElement;
}

export const renderInputBoxWithState = ({
  onSegmentChange,
}: {
  onSegmentChange?: InputSegmentChangeEventHandler<SegmentObjMock, string>;
}): RenderResult & RenderInputBoxWithStateReturnType => {
  const utils = render(<InputBoxWithState onSegmentChange={onSegmentChange} />);

  const dayInput = utils.getByTestId('input-segment-day') as HTMLInputElement;
  const monthInput = utils.getByTestId(
    'input-segment-month',
  ) as HTMLInputElement;
  const yearInput = utils.getByTestId('input-segment-year') as HTMLInputElement;

  return { ...utils, dayInput, monthInput, yearInput };
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

export const renderInputBox = ({
  ...props
}: Partial<InputBoxProps<SegmentObjMock>>): RenderResult &
  RenderInputBoxReturnType => {
  const mergedProps = {
    ...defaultProps,
    ...props,
  } as InputBoxProps<SegmentObjMock>;

  const finalMergedProps = {
    ...mergedProps,
    segmentComponent: mergedProps.segmentComponent ?? InputSegmentWrapper,
  } as InputBoxProps<SegmentObjMock>;

  const result = render(<InputBox {...finalMergedProps} />);

  const rerenderInputBox = ({
    ...props
  }: Partial<InputBoxProps<SegmentObjMock>>) => {
    const mergedProps = {
      ...defaultProps,
      ...props,
    } as InputBoxProps<SegmentObjMock>;

    const finalMergedProps = {
      ...mergedProps,
      segmentComponent: mergedProps.segmentComponent ?? InputSegmentWrapper,
    } as InputBoxProps<SegmentObjMock>;

    result.rerender(<InputBox {...finalMergedProps} />);
  };

  const getDayInput = () =>
    result.getByTestId('input-segment-day') as HTMLInputElement;
  const getMonthInput = () =>
    result.getByTestId('input-segment-month') as HTMLInputElement;
  const getYearInput = () =>
    result.getByTestId('input-segment-year') as HTMLInputElement;

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

/*
 * InputSegment Utils
 */
export const setSegmentProps = (segment: SegmentObjMock) => {
  return {
    segment: segment,
    charsPerSegment: charsPerSegmentMock[segment],
    min: defaultMinMock[segment],
    max: defaultMaxMock[segment],
    placeholder: defaultPlaceholderMock[segment],
  };
};

interface RenderSegmentReturnType {
  getInput: () => HTMLInputElement;
  input: HTMLInputElement;
  rerenderSegment: (params: {
    newProps?: Partial<InputSegmentProps<SegmentObjMock>>;
    newProviderProps?: Partial<InputBoxProviderProps<SegmentObjMock>>;
  }) => void;
}

const defaultSegmentProviderProps: Partial<
  InputBoxProviderProps<SegmentObjMock>
> = {
  charsPerSegment: charsPerSegmentMock,
  segmentEnum: SegmentObjMock,
  onChange: () => {},
  onBlur: () => {},
  segments: {
    day: '',
    month: '',
    year: '',
  },
  segmentRefs: segmentRefsMock,
};

const defaultSegmentProps: InputSegmentProps<SegmentObjMock> = {
  segment: 'day',
  min: defaultMinMock['day'],
  max: defaultMaxMock['day'],
  shouldWrap: true,
  placeholder: defaultPlaceholderMock['day'],
  // @ts-expect-error - data-testid
  ['data-testid']: 'lg-input-segment',
};

export const renderSegment = ({
  props = {},
  providerProps = {},
}: {
  props?: Partial<InputSegmentProps<SegmentObjMock>>;
  providerProps?: Partial<InputBoxProviderProps<SegmentObjMock>>;
}): RenderResult & RenderSegmentReturnType => {
  const mergedProps = {
    ...defaultSegmentProps,
    ...props,
  } as InputSegmentProps<SegmentObjMock>;

  const mergedProviderProps = {
    ...defaultSegmentProviderProps,
    ...providerProps,
  } as InputBoxProviderProps<SegmentObjMock>;

  const utils = render(
    <InputBoxProvider {...mergedProviderProps}>
      <InputSegment {...mergedProps} />
    </InputBoxProvider>,
  );

  const rerenderSegment = ({
    newProps = {},
    newProviderProps = {},
  }: {
    newProps?: Partial<InputSegmentProps<SegmentObjMock>>;
    newProviderProps?: Partial<InputBoxProviderProps<SegmentObjMock>>;
  }) => {
    utils.rerender(
      <InputBoxProvider {...mergedProviderProps} {...newProviderProps}>
        <InputSegment {...mergedProps} {...newProps} />
      </InputBoxProvider>,
    );
  };

  const getInput = () =>
    utils.getByTestId('lg-input-segment') as HTMLInputElement;
  return { ...utils, getInput, input: getInput(), rerenderSegment };
};
