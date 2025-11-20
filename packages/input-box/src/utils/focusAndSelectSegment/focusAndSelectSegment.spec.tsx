import { createRef } from 'react';

import { SegmentRefsType } from '../getSegmentToFocus/getSegmentToFocus';

import { focusAndSelectSegment } from './focusAndSelectSegment';

describe('packages/input-box/utils/focusAndSelectSegment', () => {
  const formatParts: Array<Intl.DateTimeFormatPart> = [
    { type: 'year', value: '' },
    { type: 'literal', value: '-' },
    { type: 'month', value: '' },
    { type: 'literal', value: '-' },
    { type: 'day', value: '' },
  ];

  test('focuses and selects the target segment', () => {
    const target = document.createElement('input');
    const focusSpy = jest.spyOn(target, 'focus');
    const selectSpy = jest.spyOn(target, 'select');

    const segmentRefs: SegmentRefsType = {
      year: createRef(),
      month: createRef(),
      day: { current: target },
    };

    focusAndSelectSegment({
      target,
      formatParts,
      segmentRefs,
    });

    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledTimes(1);
  });
});
