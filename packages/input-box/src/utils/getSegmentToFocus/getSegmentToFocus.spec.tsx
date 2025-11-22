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
    const monthEl = document.createElement('input');
    monthEl.value = '12';
    const dayEl = document.createElement('input');
    dayEl.value = '26';

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

  test('if all inputs are empty, return the first input', () => {
    const target = document.createElement('div');

    const yearEl = document.createElement('input');
    const monthEl = document.createElement('input');
    const dayEl = document.createElement('input');

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

    expect(segment).toBe(yearEl);
  });

  test('if first input is filled, and the second is empty, return second input', () => {
    const target = document.createElement('div');

    const yearEl = document.createElement('input');
    yearEl.value = '1993';
    const monthEl = document.createElement('input');
    const dayEl = document.createElement('input');
    dayEl.value = '26';

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

  test('if first and second inputs are filled, and the third is empty, return third input', () => {
    const target = document.createElement('div');

    const yearEl = document.createElement('input');
    yearEl.value = '1993';
    const monthEl = document.createElement('input');
    monthEl.value = '12';
    const dayEl = document.createElement('input');

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

  test('if the first input is empty, and the second and third are filled, return first input', () => {
    const target = document.createElement('div');

    const yearEl = document.createElement('input');
    const monthEl = document.createElement('input');
    monthEl.value = '12';
    const dayEl = document.createElement('input');
    dayEl.value = '26';

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

    expect(segment).toBe(yearEl);
  });

  test('returns undefined for undefined input', () => {
    const segment = getSegmentToFocus({
      target: undefined,
      formatParts: undefined,
      segmentRefs: undefined,
    });

    expect(segment).toBeUndefined();
  });
});
