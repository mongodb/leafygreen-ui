import { createRef } from 'react';

import { SegmentRefs } from '../../../shared/hooks';
import { getFormatParts } from '../../../shared/utils';

import { getSegmentToFocus } from '.';

describe('packages/date-picker/utils/getSegmentToFocus', () => {
  const formatParts = getFormatParts('iso8601');

  test('if target is a segment, return target', () => {
    const target = document.createElement('input');

    const segmentRefs: SegmentRefs = {
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

    const segmentRefs: SegmentRefs = {
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

    const segmentRefs: SegmentRefs = {
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
      formatParts: undefined,
      // @ts-expect-error
      segmentRefs: undefined,
    });

    expect(segment).toBeUndefined();
  });
});
