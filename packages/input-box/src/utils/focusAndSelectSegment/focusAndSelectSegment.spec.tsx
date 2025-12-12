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

  test('focuses and selects the target segment when target is a segment', () => {
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

  test('focuses and selects the first empty segment when target is not a segment', () => {
    const yearSegment = document.createElement('input');
    const monthSegment = document.createElement('input');
    monthSegment.value = '12';
    const daySegment = document.createElement('input');
    daySegment.value = '26';

    const yearFocusSpy = jest.spyOn(yearSegment, 'focus');
    const yearSelectSpy = jest.spyOn(yearSegment, 'select');

    const target = document.createElement('div');

    const segmentRefs: SegmentRefsType = {
      year: { current: yearSegment },
      month: { current: monthSegment },
      day: { current: daySegment },
    };

    focusAndSelectSegment({
      target,
      formatParts,
      segmentRefs,
    });

    expect(yearFocusSpy).toHaveBeenCalledTimes(1);
    expect(yearSelectSpy).toHaveBeenCalledTimes(1);
  });

  test('focuses and selects the last filled segment when target is not a segment', () => {
    const yearSegment = document.createElement('input');
    yearSegment.value = '1993';
    const monthSegment = document.createElement('input');
    monthSegment.value = '12';
    const daySegment = document.createElement('input');
    daySegment.value = '26';

    const dayFocusSpy = jest.spyOn(daySegment, 'focus');
    const daySelectSpy = jest.spyOn(daySegment, 'select');

    const target = document.createElement('div');

    const segmentRefs: SegmentRefsType = {
      year: { current: yearSegment },
      month: { current: monthSegment },
      day: { current: daySegment },
    };

    focusAndSelectSegment({
      target,
      formatParts,
      segmentRefs,
    });

    expect(dayFocusSpy).toHaveBeenCalledTimes(1);
    expect(daySelectSpy).toHaveBeenCalledTimes(1);
  });

  test('Does not focus or select any segment when target is undefined', () => {
    const yearSegment = document.createElement('input');
    const monthSegment = document.createElement('input');
    const daySegment = document.createElement('input');

    const yearFocusSpy = jest.spyOn(yearSegment, 'focus');
    const yearSelectSpy = jest.spyOn(yearSegment, 'select');

    const monthFocusSpy = jest.spyOn(monthSegment, 'focus');
    const monthSelectSpy = jest.spyOn(monthSegment, 'select');
    const dayFocusSpy = jest.spyOn(daySegment, 'focus');
    const daySelectSpy = jest.spyOn(daySegment, 'select');

    const segmentRefs: SegmentRefsType = {
      year: { current: yearSegment },
      month: { current: monthSegment },
      day: { current: daySegment },
    };

    focusAndSelectSegment({
      target: undefined,
      formatParts,
      segmentRefs,
    });

    expect(yearFocusSpy).not.toHaveBeenCalled();
    expect(yearSelectSpy).not.toHaveBeenCalled();
    expect(monthFocusSpy).not.toHaveBeenCalled();
    expect(monthSelectSpy).not.toHaveBeenCalled();
    expect(dayFocusSpy).not.toHaveBeenCalled();
    expect(daySelectSpy).not.toHaveBeenCalled();
  });

  test('Does not focus or select any segment when formatParts is undefined', () => {
    const yearSegment = document.createElement('input');
    const monthSegment = document.createElement('input');
    const daySegment = document.createElement('input');

    const yearFocusSpy = jest.spyOn(yearSegment, 'focus');
    const yearSelectSpy = jest.spyOn(yearSegment, 'select');

    const monthFocusSpy = jest.spyOn(monthSegment, 'focus');
    const monthSelectSpy = jest.spyOn(monthSegment, 'select');
    const dayFocusSpy = jest.spyOn(daySegment, 'focus');
    const daySelectSpy = jest.spyOn(daySegment, 'select');

    const target = document.createElement('div');

    const segmentRefs: SegmentRefsType = {
      year: { current: yearSegment },
      month: { current: monthSegment },
      day: { current: daySegment },
    };

    focusAndSelectSegment({
      target,
      formatParts: undefined,
      segmentRefs,
    });

    expect(yearFocusSpy).not.toHaveBeenCalled();
    expect(yearSelectSpy).not.toHaveBeenCalled();
    expect(monthFocusSpy).not.toHaveBeenCalled();
    expect(monthSelectSpy).not.toHaveBeenCalled();
    expect(dayFocusSpy).not.toHaveBeenCalled();
    expect(daySelectSpy).not.toHaveBeenCalled();
  });
});
