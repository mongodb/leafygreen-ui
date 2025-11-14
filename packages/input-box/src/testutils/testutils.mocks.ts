import { createRef } from 'react';

import { css } from '@leafygreen-ui/emotion';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';

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
