import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import {
  InputBoxProvider,
  type InputBoxProviderProps,
} from '../InputBoxContext';
import { InputSegment, type InputSegmentProps } from '../InputSegment';

import {
  charsPerSegmentMock,
  defaultMaxMock,
  defaultMinMock,
  defaultPlaceholderMock,
  SegmentObjMock,
  segmentRefsMock,
} from './testutils.mocks';

/*
 * InputSegment Utils
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
  minSegmentValue: defaultMinMock['day'],
  maxSegmentValue: defaultMaxMock['day'],
  shouldWrap: true,
  placeholder: defaultPlaceholderMock['day'],
  // @ts-expect-error - data-testid
  ['data-testid']: 'lg-input-segment',
};

/**
 * Renders the InputSegment component for testing purposes.
 */
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
