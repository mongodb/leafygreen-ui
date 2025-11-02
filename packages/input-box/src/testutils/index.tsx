import { createContext, useContext } from 'react';
import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Size } from '@leafygreen-ui/tokens';

import { InputBox, InputBoxProps } from '../InputBox';
import { InputSegment } from '../InputSegment';
import {
  InputSegmentChangeEventHandler,
  InputSegmentProps,
} from '../InputSegment/InputSegment.types';
import { InputBoxProvider } from '../InputBoxContext';
import { InputBoxProviderProps } from '../InputBoxContext/InputBoxContext';
import {
  SegmentObjMock,
  SegmentRefsMock,
  defaultMinMock,
  defaultMaxMock,
  charsPerSegmentMock,
  defaultFormatPartsMock,
  segmentRulesMock,
  defaultPlaceholderMock,
  segmentsMock,
  segmentRefsMock,
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

/*
 * InputBoxWrapper Context and Provider
 */
const InputBoxWrapperContext = createContext<{
  segments: Record<SegmentObjMock, string>;
  segmentRefs: SegmentRefsMock;
} | null>(null);

const InputBoxWrapperProvider = ({
  children,
  segments,
  segmentRefs,
}: {
  children: React.ReactNode;
  segments: Record<SegmentObjMock, string>;
  segmentRefs: SegmentRefsMock;
}) => {
  return (
    <InputBoxWrapperContext.Provider value={{ segments, segmentRefs }}>
      {children}
    </InputBoxWrapperContext.Provider>
  );
};

const useInputBoxWrapperContext = () => {
  const context = useContext(InputBoxWrapperContext);
  if (!context) {
    throw new Error(
      'useInputBoxWrapperContext must be used within InputBoxWrapperProvider',
    );
  }
  return context;
};

export const InputSegmentWrapper = ({
  segment,
}: {
  segment: SegmentObjMock;
}) => {
  const { segments, segmentRefs } = useInputBoxWrapperContext();
  return (
    <InputSegment
      segment={segment}
      value={segments[segment]}
      ref={segmentRefs[segment]}
      min={defaultMinMock[segment]}
      max={defaultMaxMock[segment]}
      size={Size.Default}
      data-testid={`input-segment-${segment}`}
      className={segmentWidthStyles[segment]}
      shouldSkipValidation={segment === SegmentObjMock.Year}
      shouldNotRollover={segment === SegmentObjMock.Year}
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
    <InputBoxWrapperProvider segments={segments} segmentRefs={segmentRefs}>
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
        segment={InputSegmentWrapper}
      />
    </InputBoxWrapperProvider>
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
    segment: mergedProps.segment ?? InputSegmentWrapper,
  } as InputBoxProps<SegmentObjMock>;

  const result = render(
    <InputBoxWrapperProvider
      segments={mergedProps.segments}
      segmentRefs={mergedProps.segmentRefs}
    >
      <InputBox {...finalMergedProps} />
    </InputBoxWrapperProvider>,
  );

  const rerenderInputBox = ({
    ...props
  }: Partial<InputBoxProps<SegmentObjMock>>) => {
    const mergedProps = {
      ...defaultProps,
      ...props,
    } as InputBoxProps<SegmentObjMock>;

    const finalMergedProps = {
      ...mergedProps,
      segment: mergedProps.segment ?? InputSegmentWrapper,
    } as InputBoxProps<SegmentObjMock>;

    result.rerender(
      <InputBoxWrapperProvider
        segments={mergedProps.segments}
        segmentRefs={mergedProps.segmentRefs}
      >
        <InputBox {...finalMergedProps} />
      </InputBoxWrapperProvider>,
    );
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
  rerenderSegment: (
    newProps: Partial<InputSegmentProps<SegmentObjMock, string>>,
  ) => void;
}

export const renderSegment = (
  props?: Partial<InputSegmentProps<SegmentObjMock, string>>,
  providerProps?: Partial<InputBoxProviderProps<SegmentObjMock>>,
): RenderResult & RenderSegmentReturnType => {
  const defaultProviderProps: Partial<InputBoxProviderProps<SegmentObjMock>> = {
    charsPerSegment: charsPerSegmentMock,
    segmentEnum: SegmentObjMock,
    onChange: () => {},
    onBlur: () => {},
  };

  const defaultProps: InputSegmentProps<SegmentObjMock, string> = {
    value: '',
    segment: 'day',
    min: defaultMinMock['day'],
    max: defaultMaxMock['day'],
    size: Size.Default,
    shouldNotRollover: false,
    placeholder: defaultPlaceholderMock['day'],
    // @ts-expect-error - data-testid
    ['data-testid']: 'lg-input-segment',
  };

  const mergedProps = {
    ...defaultProps,
    ...props,
  };

  const mergedProviderProps = {
    ...defaultProviderProps,
    ...providerProps,
  } as InputBoxProviderProps<SegmentObjMock>;

  const utils = render(
    <InputBoxProvider {...mergedProviderProps}>
      <InputSegment {...mergedProps} />
    </InputBoxProvider>,
  );

  const rerenderSegment = (
    newProps: Partial<InputSegmentProps<SegmentObjMock, string>>,
    newProviderProps?: Partial<InputBoxProviderProps<SegmentObjMock>>,
  ) => {
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
