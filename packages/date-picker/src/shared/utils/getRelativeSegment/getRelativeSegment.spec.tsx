import React from 'react';
import { render } from '@testing-library/react';

import { SegmentRefs } from '../../../shared/hooks';
import { segmentRefsMock } from '../../../shared/testutils';

import { getRelativeSegmentRef } from '.';

const renderTestComponent = () => {
  const result = render(
    <>
      <input data-testid="day" ref={segmentRefsMock.day} />
      <input data-testid="month" ref={segmentRefsMock.month} />
      <input data-testid="year" ref={segmentRefsMock.year} />
    </>,
  );

  const elements = {
    day: result.getByTestId('day'),
    month: result.getByTestId('month'),
    year: result.getByTestId('year'),
  } as {
    day: HTMLInputElement;
    month: HTMLInputElement;
    year: HTMLInputElement;
  };

  return {
    ...result,
    segmentRefs: segmentRefsMock,
    elements,
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

  describe('from ref', () => {
    let segmentRefs: SegmentRefs;
    beforeEach(() => {
      segmentRefs = renderTestComponent().segmentRefs;
    });
    test('next from year => month', () => {
      expect(
        getRelativeSegmentRef('next', {
          segment: segmentRefs.year,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.month);
    });
    test('next from month => day', () => {
      expect(
        getRelativeSegmentRef('next', {
          segment: segmentRefs.month,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.day);
    });

    test('prev from day => month', () => {
      expect(
        getRelativeSegmentRef('prev', {
          segment: segmentRefs.day,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.month);
    });

    test('prev from month => year', () => {
      expect(
        getRelativeSegmentRef('prev', {
          segment: segmentRefs.month,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.year);
    });

    test('first = year', () => {
      expect(
        getRelativeSegmentRef('first', {
          segment: segmentRefs.day,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.year);
    });

    test('last = day', () => {
      expect(
        getRelativeSegmentRef('last', {
          segment: segmentRefs.year,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.day);
    });
  });

  describe('from element', () => {
    let segmentRefs: SegmentRefs;

    let elements: {
      day: HTMLInputElement;
      month: HTMLInputElement;
      year: HTMLInputElement;
    };
    beforeEach(() => {
      const result = renderTestComponent();
      segmentRefs = result.segmentRefs;
      elements = result.elements;
    });
    test('next from year => month', () => {
      expect(
        getRelativeSegmentRef('next', {
          segment: elements.year,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.month);
    });
    test('next from month => day', () => {
      expect(
        getRelativeSegmentRef('next', {
          segment: elements.month,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.day);
    });

    test('prev from day => month', () => {
      expect(
        getRelativeSegmentRef('prev', {
          segment: elements.day,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.month);
    });

    test('prev from month => year', () => {
      expect(
        getRelativeSegmentRef('prev', {
          segment: elements.month,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.year);
    });

    test('first = year', () => {
      expect(
        getRelativeSegmentRef('first', {
          segment: elements.day,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.year);
    });

    test('last = day', () => {
      expect(
        getRelativeSegmentRef('last', {
          segment: elements.year,
          formatParts,
          segmentRefs,
        }),
      ).toBe(segmentRefs.day);
    });
  });
});
