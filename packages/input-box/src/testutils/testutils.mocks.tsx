import React, { createRef, forwardRef } from 'react';

import { css } from '@leafygreen-ui/emotion';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { InputSegment } from '../InputSegment';
import { InputSegmentComponentProps } from '../shared.types';
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

export const dateSegmentEmptyMock: Record<SegmentObjMock, string> = {
  month: '',
  day: '',
  year: '',
};

export const segmentsMock: Record<SegmentObjMock, string> = {
  month: '02',
  day: '02',
  year: '2025',
};
export const segmentRulesMock: Record<SegmentObjMock, ExplicitSegmentRule> = {
  month: { maxChars: 2, minExplicitValue: 2 },
  day: { maxChars: 2, minExplicitValue: 4 },
  year: { maxChars: 4, minExplicitValue: 1970 },
};
export const defaultMinMock: Record<SegmentObjMock, number> = {
  month: 1,
  day: 0,
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
  // Standard font
  D: 46 / 40,
  M: 55 / 40,
  Y: 50 / 40,
  H: 46 / 40,
  MM: 55 / 40,
  S: 46 / 40,
} as const;

export const segmentWidthStyles: Record<SegmentObjMock, string> = {
  day: css`
    width: ${segmentRulesMock['day'].maxChars * characterWidth.D}ch;
  `,
  month: css`
    width: ${segmentRulesMock['month'].maxChars * characterWidth.M}ch;
  `,
  year: css`
    width: ${segmentRulesMock['year'].maxChars * characterWidth.Y}ch;
  `,
};

/** Mocks for time generate story */
export const TimeSegmentObjMock = {
  Hour: 'hour',
  Minute: 'minute',
  Second: 'second',
} as const;
export type TimeSegmentObjMock =
  (typeof TimeSegmentObjMock)[keyof typeof TimeSegmentObjMock];

export const timeSegmentsMock: Record<TimeSegmentObjMock, string> = {
  hour: '23',
  minute: '00',
  second: '59',
};

export const timeSegmentsEmptyMock: Record<TimeSegmentObjMock, string> = {
  hour: '',
  minute: '',
  second: '',
};

export const timeSegmentRulesMock: Record<
  TimeSegmentObjMock,
  ExplicitSegmentRule
> = {
  hour: { maxChars: 2, minExplicitValue: 3 },
  minute: { maxChars: 2, minExplicitValue: 6 },
  second: { maxChars: 2, minExplicitValue: 6 },
};

export const timeMinMock: Record<TimeSegmentObjMock, number> = {
  hour: 0,
  minute: 0,
  second: 0,
};
export const timeMaxMock: Record<TimeSegmentObjMock, number> = {
  hour: 23,
  minute: 59,
  second: 59,
};

export const timePlaceholderMock: Record<TimeSegmentObjMock, string> = {
  hour: 'HH',
  minute: 'MM',
  second: 'SS',
} as const;

export const timeFormatPartsMock: Array<Intl.DateTimeFormatPart> = [
  { type: 'hour', value: '' },
  { type: 'literal', value: ':' },
  { type: 'minute', value: '' },
  { type: 'literal', value: ':' },
  { type: 'second', value: '' },
];

export const timeSegmentWidthStyles: Record<TimeSegmentObjMock, string> = {
  hour: css`
    width: ${timeSegmentRulesMock['hour'].maxChars * characterWidth.D}ch;
  `,
  minute: css`
    width: ${timeSegmentRulesMock['minute'].maxChars * characterWidth.MM}ch;
  `,
  second: css`
    width: ${timeSegmentRulesMock['second'].maxChars * characterWidth.Y}ch;
  `,
};

export const TimeInputSegmentWrapper = forwardRef<
  HTMLInputElement,
  InputSegmentComponentProps<TimeSegmentObjMock>
>((props, ref) => {
  const { segment, ...rest } = props;
  return (
    <InputSegment
      {...rest}
      ref={ref}
      segment={segment}
      minSegmentValue={timeMinMock[segment]}
      maxSegmentValue={timeMaxMock[segment]}
      className={timeSegmentWidthStyles[segment]}
      placeholder={timePlaceholderMock[segment]}
    />
  );
});

TimeInputSegmentWrapper.displayName = 'TimeInputSegmentWrapper';
