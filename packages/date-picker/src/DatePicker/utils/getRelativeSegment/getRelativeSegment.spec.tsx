import React from 'react';
import { render } from '@testing-library/react';

import { SegmentRefs } from '../../../shared/hooks';

import { getRelativeSegment } from '.';

const renderTestComponent = () => {
  const segmentRefs: SegmentRefs = {
    day: React.createRef<HTMLInputElement>(),
    month: React.createRef<HTMLInputElement>(),
    year: React.createRef<HTMLInputElement>(),
  };

  const result = render(
    <>
      <input id="day" ref={segmentRefs.day} />
      <input id="month" ref={segmentRefs.month} />
      <input id="year" ref={segmentRefs.year} />
    </>,
  );

  return {
    ...result,
    segmentRefs,
  };
};

describe('packages/date-picker/utils/getRelativeSegment', () => {
  const formatParts: Array<Intl.DateTimeFormatPart> = [
    { type: 'year', value: '2023' },
    { type: 'literal', value: '-' },
    { type: 'month', value: '10' },
    { type: 'literal', value: '-' },
    { type: 'day', value: '31' },
  ];

  let segmentRefs: SegmentRefs;
  beforeEach(() => {
    segmentRefs = renderTestComponent().segmentRefs;
  });

  test('next from year => month', () => {
    expect(
      getRelativeSegment('next', {
        segment: segmentRefs.year,
        formatParts,
        segmentRefs,
      }),
    ).toBe(segmentRefs.month);
  });
  test('next from month => day', () => {
    expect(
      getRelativeSegment('next', {
        segment: segmentRefs.month,
        formatParts,
        segmentRefs,
      }),
    ).toBe(segmentRefs.day);
  });

  test('prev from day => month', () => {
    expect(
      getRelativeSegment('prev', {
        segment: segmentRefs.day,
        formatParts,
        segmentRefs,
      }),
    ).toBe(segmentRefs.month);
  });

  test('prev from month => year', () => {
    expect(
      getRelativeSegment('prev', {
        segment: segmentRefs.month,
        formatParts,
        segmentRefs,
      }),
    ).toBe(segmentRefs.year);
  });

  test('first = year', () => {
    expect(
      getRelativeSegment('first', {
        segment: segmentRefs.day,
        formatParts,
        segmentRefs,
      }),
    ).toBe(segmentRefs.year);
  });

  test('last = day', () => {
    expect(
      getRelativeSegment('last', {
        segment: segmentRefs.year,
        formatParts,
        segmentRefs,
      }),
    ).toBe(segmentRefs.day);
  });
});
