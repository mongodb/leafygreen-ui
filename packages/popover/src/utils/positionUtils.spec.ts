import { Placement } from '@floating-ui/react';

import { Align, Justify } from '../Popover.types';

import {
  getElementDocumentPosition,
  getExtendedPlacementValue,
  getFloatingPlacement,
  getWindowSafePlacementValues,
} from './positionUtils';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    width: '0px',
  }),
});

describe('positionUtils', () => {
  describe('getElementDocumentPosition', () => {
    test('given an element, it returns an object with information about its position', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const pos = getElementDocumentPosition(div);

      expect(pos.top).toBe(0);
      expect(pos.bottom).toBe(0);
      expect(pos.left).toBe(0);
      expect(pos.right).toBe(0);
      expect(pos.height).toBe(0);
      expect(pos.width).toBe(0);
    });
  });

  describe('getFloatingPlacement', () => {
    test('given standard align and justify values, it returns the correct floating placement', () => {
      expect(getFloatingPlacement(Align.Top, Justify.Start)).toBe('top-start');
      expect(getFloatingPlacement(Align.Top, Justify.Middle)).toBe('top');
      expect(getFloatingPlacement(Align.Top, Justify.End)).toBe('top-end');
    });

    test(`given align value of ${Align.CenterHorizontal}, it returns a right* placement`, () => {
      expect(getFloatingPlacement(Align.CenterHorizontal, Justify.Start)).toBe(
        'right-start',
      );
      expect(getFloatingPlacement(Align.CenterHorizontal, Justify.Middle)).toBe(
        'right',
      );
      expect(getFloatingPlacement(Align.CenterHorizontal, Justify.End)).toBe(
        'right-end',
      );
    });

    test(`given align value of ${Align.CenterVertical}, it returns a bottom* placement`, () => {
      expect(getFloatingPlacement(Align.CenterVertical, Justify.Start)).toBe(
        'bottom-start',
      );
      expect(getFloatingPlacement(Align.CenterVertical, Justify.Middle)).toBe(
        'bottom',
      );
      expect(getFloatingPlacement(Align.CenterVertical, Justify.End)).toBe(
        'bottom-end',
      );
    });
  });

  describe('getWindowSafePlacementValues', () => {
    const testPlacements: Array<{
      placement: Placement;
      safePlacement: {
        align: Align;
        justify: Justify;
      };
    }> = [
      { placement: 'top', safePlacement: { align: 'top', justify: 'middle' } },
      {
        placement: 'right',
        safePlacement: { align: 'right', justify: 'middle' },
      },
      {
        placement: 'bottom',
        safePlacement: { align: 'bottom', justify: 'middle' },
      },
      {
        placement: 'left',
        safePlacement: { align: 'left', justify: 'middle' },
      },
      {
        placement: 'top-start',
        safePlacement: { align: 'top', justify: 'start' },
      },
      { placement: 'top-end', safePlacement: { align: 'top', justify: 'end' } },
      {
        placement: 'right-start',
        safePlacement: { align: 'right', justify: 'start' },
      },
      {
        placement: 'right-end',
        safePlacement: { align: 'right', justify: 'end' },
      },
      {
        placement: 'bottom-start',
        safePlacement: { align: 'bottom', justify: 'start' },
      },
      {
        placement: 'bottom-end',
        safePlacement: { align: 'bottom', justify: 'end' },
      },
      {
        placement: 'left-start',
        safePlacement: { align: 'left', justify: 'start' },
      },
      {
        placement: 'left-end',
        safePlacement: { align: 'left', justify: 'end' },
      },
    ];
    test.each(testPlacements)(
      'given a placement of $placement, it returns the correct window-safe placement values',
      ({ placement, safePlacement }) => {
        expect(getWindowSafePlacementValues(placement)).toEqual(safePlacement);
      },
    );
  });

  describe('getExtendedPlacementValue', () => {
    test(`returns standard placement values if align prop is not ${Align.CenterHorizontal} or ${Align.CenterVertical}`, () => {
      expect(
        getExtendedPlacementValue({ placement: 'top-start', align: 'top' }),
      ).toBe('top-start');
      expect(
        getExtendedPlacementValue({ placement: 'bottom', align: 'bottom' }),
      ).toBe('bottom');
      expect(
        getExtendedPlacementValue({ placement: 'left-end', align: 'left' }),
      ).toBe('left-end');
      expect(
        getExtendedPlacementValue({ placement: 'right', align: 'right' }),
      ).toBe('right');
    });

    describe(`when align prop is ${Align.CenterHorizontal}`, () => {
      test('returns right* placement values for right, right-start, and right-end placements', () => {
        expect(
          getExtendedPlacementValue({
            placement: 'right',
            align: Align.CenterHorizontal,
          }),
        ).toBe('center');
        expect(
          getExtendedPlacementValue({
            placement: 'right-start',
            align: Align.CenterHorizontal,
          }),
        ).toBe('center-start');
        expect(
          getExtendedPlacementValue({
            placement: 'right-end',
            align: Align.CenterHorizontal,
          }),
        ).toBe('center-end');
      });
    });

    describe(`when align prop is ${Align.CenterVertical}`, () => {
      test('returns bottom* placement values for bottom, bottom-start, and bottom-end placements', () => {
        expect(
          getExtendedPlacementValue({
            placement: 'bottom',
            align: Align.CenterVertical,
          }),
        ).toBe('center');
        expect(
          getExtendedPlacementValue({
            placement: 'bottom-start',
            align: Align.CenterVertical,
          }),
        ).toBe('right');
        expect(
          getExtendedPlacementValue({
            placement: 'bottom-end',
            align: Align.CenterVertical,
          }),
        ).toBe('left');
      });
    });
  });
});
