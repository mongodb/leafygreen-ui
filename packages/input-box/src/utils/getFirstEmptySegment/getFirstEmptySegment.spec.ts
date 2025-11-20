import { getFirstEmptySegment } from './getFirstEmptySegment';

describe('packages/input-box/utils/getFirstEmptySegment', () => {
  const formatParts: Array<Intl.DateTimeFormatPart> = [
    { type: 'year', value: '' },
    { type: 'literal', value: '-' },
    { type: 'month', value: '' },
    { type: 'literal', value: '-' },
    { type: 'day', value: '' },
  ];

  test('returns first segment when all segments are empty', () => {
    const yearEl = document.createElement('input');
    const monthEl = document.createElement('input');
    const dayEl = document.createElement('input');

    const segmentRefs = {
      year: { current: yearEl },
      month: { current: monthEl },
      day: { current: dayEl },
    };

    const segment = getFirstEmptySegment({
      formatParts,
      segmentRefs,
    });

    expect(segment).toBe(yearEl);
  });

  test('returns first segment when the other segments are filled', () => {
    const yearEl = document.createElement('input');
    const monthEl = document.createElement('input');
    monthEl.value = '12';
    const dayEl = document.createElement('input');
    dayEl.value = '26';

    const segmentRefs = {
      year: { current: yearEl },
      month: { current: monthEl },
      day: { current: dayEl },
    };

    const segment = getFirstEmptySegment({
      formatParts,
      segmentRefs,
    });

    expect(segment).toBe(yearEl);
  });

  test('returns second segment when first segment is filled', () => {
    const yearEl = document.createElement('input');
    yearEl.value = '1993';
    const monthEl = document.createElement('input');
    const dayEl = document.createElement('input');
    dayEl.value = '26';

    const segmentRefs = {
      year: { current: yearEl },
      month: { current: monthEl },
      day: { current: dayEl },
    };

    const segment = getFirstEmptySegment({
      formatParts,
      segmentRefs,
    });

    expect(segment).toBe(monthEl);
  });

  test('returns third segment when first two segments are filled', () => {
    const yearEl = document.createElement('input');
    yearEl.value = '1993';
    const monthEl = document.createElement('input');
    monthEl.value = '12';
    const dayEl = document.createElement('input');

    const segmentRefs = {
      year: { current: yearEl },
      month: { current: monthEl },
      day: { current: dayEl },
    };

    const segment = getFirstEmptySegment({
      formatParts,
      segmentRefs,
    });

    expect(segment).toBe(dayEl);
  });

  test('returns null when all segments are filled', () => {
    const yearEl = document.createElement('input');
    yearEl.value = '1993';
    const monthEl = document.createElement('input');
    monthEl.value = '12';
    const dayEl = document.createElement('input');
    dayEl.value = '26';

    const segmentRefs = {
      year: { current: yearEl },
      month: { current: monthEl },
      day: { current: dayEl },
    };

    const segment = getFirstEmptySegment({
      formatParts,
      segmentRefs,
    });

    expect(segment).toBeNull();
  });
});
