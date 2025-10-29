import React from 'react';

import { isElementInputSegment } from './isElementInputSegment';

describe('packages/input-box/utils/isElementInputSegment', () => {
  describe('isElementInputSegment', () => {
    let dayInput: HTMLInputElement;
    let monthInput: HTMLInputElement;
    let yearInput: HTMLInputElement;
    let unrelatedInput: HTMLInputElement;
    let segmentRefs: Record<string, React.RefObject<HTMLInputElement>>;

    beforeEach(() => {
      // Create input elements
      dayInput = document.createElement('input');
      dayInput.setAttribute('data-segment', 'day');

      monthInput = document.createElement('input');
      monthInput.setAttribute('data-segment', 'month');

      yearInput = document.createElement('input');
      yearInput.setAttribute('data-segment', 'year');

      unrelatedInput = document.createElement('input');
      unrelatedInput.setAttribute('data-testid', 'unrelated');

      // Create segment refs
      segmentRefs = {
        day: { current: dayInput },
        month: { current: monthInput },
        year: { current: yearInput },
      };
    });

    test('returns true when element is the day segment', () => {
      expect(isElementInputSegment(dayInput, segmentRefs)).toBe(true);
    });

    test('returns true when element is the month segment', () => {
      expect(isElementInputSegment(monthInput, segmentRefs)).toBe(true);
    });

    test('returns true when element is the year segment', () => {
      expect(isElementInputSegment(yearInput, segmentRefs)).toBe(true);
    });

    test('returns false when element is not in segment refs', () => {
      expect(isElementInputSegment(unrelatedInput, segmentRefs)).toBe(false);
    });

    test('returns false when segmentRefs is empty', () => {
      const emptySegmentRefs = {};
      expect(isElementInputSegment(dayInput, emptySegmentRefs)).toBe(false);
    });

    test('returns false when all segment refs are null', () => {
      const nullSegmentRefs = {
        day: { current: null },
        month: { current: null },
        year: { current: null },
      };
      expect(isElementInputSegment(dayInput, nullSegmentRefs)).toBe(false);
    });

    test('returns true when element matches one of the non-null refs', () => {
      const partialSegmentRefs = {
        day: { current: dayInput },
        month: { current: null },
        year: { current: null },
      };
      expect(isElementInputSegment(dayInput, partialSegmentRefs)).toBe(true);
    });

    test('returns false when element does not match the only non-null ref', () => {
      const partialSegmentRefs = {
        day: { current: dayInput },
        month: { current: null },
        year: { current: null },
      };
      expect(isElementInputSegment(monthInput, partialSegmentRefs)).toBe(false);
    });

    test('returns false when checking a div element not in segment refs', () => {
      const divElement = document.createElement('div');
      expect(isElementInputSegment(divElement, segmentRefs)).toBe(false);
    });

    test('returns true when segment has a single input', () => {
      const singleSegmentRefs = {
        hour: { current: dayInput },
      };
      expect(isElementInputSegment(dayInput, singleSegmentRefs)).toBe(true);
    });
  });
});
