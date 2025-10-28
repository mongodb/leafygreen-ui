import { createRef } from 'react';
import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { css } from '@leafygreen-ui/emotion';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { Size } from '@leafygreen-ui/tokens';

import { InputBox, InputBoxProps } from '../InputBox';
import { RenderSegmentProps } from '../InputBox/InputBox.types';
import { InputSegment } from '../InputSegment';
import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';
import { ExplicitSegmentRule } from '../utils';

export const SegmentObjMock = {
  Month: 'month',
  Day: 'day',
  Year: 'year',
} as const;
export type SegmentObjMock =
  (typeof SegmentObjMock)[keyof typeof SegmentObjMock];

export type SegmentRefsMock = Record<
  SegmentObjMock,
  ReturnType<DynamicRefGetter<HTMLInputElement>>
>;

export const segmentRefsMock: SegmentRefsMock = {
  month: createRef<HTMLInputElement>(),
  day: createRef<HTMLInputElement>(),
  year: createRef<HTMLInputElement>(),
};

export const segmentsMock: Record<SegmentObjMock, string> = {
  month: '02',
  day: '02',
  year: '2025',
};
export const charsPerSegmentMock: Record<SegmentObjMock, number> = {
  month: 2,
  day: 2,
  year: 4,
};
export const segmentRulesMock: Record<SegmentObjMock, ExplicitSegmentRule> = {
  month: { maxChars: 2, minExplicitValue: 2 },
  day: { maxChars: 2, minExplicitValue: 4 },
  year: { maxChars: 4, minExplicitValue: 1970 },
};
export const defaultMinMock: Record<SegmentObjMock, number> = {
  month: 1,
  day: 1,
  year: 1970,
};
export const defaultMaxMock: Record<SegmentObjMock, number> = {
  month: 12,
  day: 31,
  year: 2038,
};

export const defaultPlaceholderMock: Record<SegmentObjMock, string> = {
  day: 'DD',
  month: 'MM',
  year: 'YYYY',
} as const;

export const defaultFormatPartsMock: Array<Intl.DateTimeFormatPart> = [
  { type: 'month', value: '' },
  { type: 'literal', value: '-' },
  { type: 'day', value: '' },
  { type: 'literal', value: '-' },
  { type: 'year', value: '' },
];

/** The percentage of 1ch these specific characters take up */
export const characterWidth = {
  // // Standard font
  D: 46 / 40,
  M: 55 / 40,
  Y: 50 / 40,
} as const;

export const segmentWidthStyles: Record<SegmentObjMock, string> = {
  day: css`
    width: ${charsPerSegmentMock.day * characterWidth.D}ch;
  `,
  month: css`
    width: ${charsPerSegmentMock.month * characterWidth.M}ch;
  `,
  year: css`
    width: ${charsPerSegmentMock.year * characterWidth.Y}ch;
  `,
};

export const defaultProps: Partial<InputBoxProps<typeof SegmentObjMock>> = {
  segments: segmentsMock,
  segmentObj: SegmentObjMock,
  segmentRefs: segmentRefsMock,
  setSegment: () => {},
  charsPerSegment: charsPerSegmentMock,
  formatParts: defaultFormatPartsMock,
  segmentRules: segmentRulesMock,
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
      segmentObj={SegmentObjMock}
      segmentRefs={segmentRefs}
      segments={segments}
      setSegment={setSegment}
      charsPerSegment={charsPerSegmentMock}
      formatParts={defaultFormatPartsMock}
      segmentRules={segmentRulesMock}
      onSegmentChange={onSegmentChange}
      renderSegment={({ onChange, onBlur, partType }) => (
        <InputSegment
          key={partType}
          ref={segmentRefs[partType]}
          disabled={disabled}
          segment={partType}
          value={segments[partType]}
          onChange={onChange}
          onBlur={onBlur}
          charsPerSegment={charsPerSegmentMock[partType]}
          min={defaultMinMock[partType]}
          max={defaultMaxMock[partType]}
          segmentObj={SegmentObjMock}
          size={Size.Default}
          data-testid={`input-segment-${partType}`}
          className={segmentWidthStyles[partType]}
          shouldNotRollover={partType === 'year'}
          placeholder={defaultPlaceholderMock[partType]}
        />
      )}
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

const createRenderSegment = (
  mergedProps: InputBoxProps<typeof SegmentObjMock>,
) => {
  const RenderSegment = ({
    onChange,
    onBlur,
    partType,
  }: RenderSegmentProps<SegmentObjMock>) => (
    <InputSegment
      ref={segmentRefsMock[partType]}
      key={partType}
      segment={partType}
      value={mergedProps.segments[partType]}
      onChange={onChange}
      onBlur={onBlur}
      charsPerSegment={charsPerSegmentMock[partType]}
      min={defaultMinMock[partType]}
      max={defaultMaxMock[partType]}
      segmentObj={SegmentObjMock}
      size={Size.Default}
      data-testid={`input-segment-${partType}`}
    />
  );

  return RenderSegment;
};

interface RenderInputBoxReturnType {
  dayInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  yearInput: HTMLInputElement;
  rerenderInputBox: (
    props: Partial<InputBoxProps<typeof SegmentObjMock>>,
  ) => void;
}

export const renderInputBox = ({
  ...props
}: Partial<InputBoxProps<typeof SegmentObjMock>>): RenderResult &
  RenderInputBoxReturnType => {
  const mergedProps = {
    ...defaultProps,
    ...props,
  } as InputBoxProps<typeof SegmentObjMock>;

  const finalMergedProps = {
    ...mergedProps,
    renderSegment:
      mergedProps.renderSegment ?? createRenderSegment(mergedProps),
  } as InputBoxProps<typeof SegmentObjMock>;

  const result = render(<InputBox {...finalMergedProps} />);

  const rerenderInputBox = ({
    ...props
  }: Partial<InputBoxProps<typeof SegmentObjMock>>) => {
    const mergedProps = {
      ...defaultProps,
      ...props,
    } as InputBoxProps<typeof SegmentObjMock>;

    const finalMergedProps = {
      ...mergedProps,
      renderSegment:
        mergedProps.renderSegment ?? createRenderSegment(mergedProps),
    } as InputBoxProps<typeof SegmentObjMock>;

    result.rerender(<InputBox {...finalMergedProps} />);
  };

  const dayInput = result.getByTestId('input-segment-day') as HTMLInputElement;
  const monthInput = result.getByTestId(
    'input-segment-month',
  ) as HTMLInputElement;
  const yearInput = result.getByTestId(
    'input-segment-year',
  ) as HTMLInputElement;

  return { ...result, rerenderInputBox, dayInput, monthInput, yearInput };
};

// InputSegment Utils
