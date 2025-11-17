import { createRef } from 'react';

import { getSegmentToFocus, SegmentRefsType } from './getSegmentToFocus';

describe('packages/date-picker/utils/getSegmentToFocus', () => {
  const formatParts: Array<Intl.DateTimeFormatPart> = [
    { type: 'year', value: '' },
    { type: 'literal', value: '-' },
    { type: 'month', value: '' },
    { type: 'literal', value: '-' },
    { type: 'day', value: '' },
  ];

  test('if target is a segment, return target', () => {
    const target = document.createElement('input');

    const segmentRefs: SegmentRefsType = {
      year: createRef(),
      month: createRef(),
      day: { current: target },
    };

    const segment = getSegmentToFocus({
      target,
      formatParts,
      segmentRefs,
    });

    expect(segment).toBe(target);
  });

  test('if all inputs are filled, return the last input', () => {
    const target = document.createElement('div');

    const yearEl = document.createElement('input');
    yearEl.value = '1993';
    yearEl.id = 'year';
    const monthEl = document.createElement('input');
    monthEl.value = '12';
    monthEl.id = 'month';
    const dayEl = document.createElement('input');
    dayEl.value = '26';
    dayEl.id = 'day';

    const segmentRefs: SegmentRefsType = {
      year: { current: yearEl },
      month: { current: monthEl },
      day: { current: dayEl },
    };

    const segment = getSegmentToFocus({
      target,
      formatParts,
      segmentRefs,
    });

    expect(segment).toBe(dayEl);
  });

  test('if first input is filled, return second input', () => {
    const target = document.createElement('div');

    const yearEl = document.createElement('input');
    yearEl.value = '1993';
    yearEl.id = 'year';
    const monthEl = document.createElement('input');
    monthEl.id = 'month';
    const dayEl = document.createElement('input');
    dayEl.id = 'day';

    const segmentRefs: SegmentRefsType = {
      year: { current: yearEl },
      month: { current: monthEl },
      day: { current: dayEl },
    };

    const segment = getSegmentToFocus({
      target,
      formatParts,
      segmentRefs,
    });

    expect(segment).toBe(monthEl);
  });

  test('returns undefined for undefined input', () => {
    const segment = getSegmentToFocus({
      // @ts-expect-error
      target: undefined,
      // @ts-expect-error
      formatParts: undefined,
      // @ts-expect-error
      segmentRefs: undefined,
    });

    expect(segment).toBeUndefined();
  });
});
