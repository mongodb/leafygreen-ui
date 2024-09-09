import { Placement } from '@floating-ui/react';

import { Align, Justify } from '../Popover.types';

import {
  calculatePosition,
  getElementDocumentPosition,
  getElementViewportPosition,
  getExtendedPlacementValue,
  getFloatingPlacement,
  getWindowSafePlacementValues,
} from './positionUtils';

// These values were explicitly created to test Popover positioning against a clearly defined window size.
const SPACING = 5;
const WINDOW_WIDTH = 100;
const WINDOW_HEIGHT = 100;

const refElPos = {
  top: {
    bottom: 10,
    height: 10,
    left: 45,
    right: 55,
    top: 0,
    width: 10,
  },

  right: {
    bottom: 55,
    height: 10,
    left: 90,
    right: 100,
    top: 45,
    width: 10,
  },

  bottom: {
    bottom: 100,
    height: 10,
    left: 45,
    right: 55,
    top: 90,
    width: 10,
  },

  left: {
    bottom: 55,
    height: 10,
    left: 0,
    right: 10,
    top: 45,
    width: 10,
  },

  center: {
    bottom: 55,
    height: 10,
    left: 45,
    right: 55,
    top: 45,
    width: 10,
  },
};

const contentElPos = {
  bottom: 20,
  height: 20,
  left: 0,
  right: 20,
  top: 0,
  width: 20,
};

const scrollContainerNull = null;

function checkPixelValue(actual: string | number, expected: number) {
  if (typeof actual === 'string') {
    expect(actual).toBe(`${expected}px`);
  } else {
    expect(actual).toBe(expected);
  }
}

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    width: '0px',
  }),
});

describe('positionUtils', () => {
  describe('calculatePosition', () => {
    test('returns an object with three key-value pairs', () => {
      const calcPositionObject = calculatePosition({
        spacing: SPACING,
        windowHeight: WINDOW_HEIGHT,
        windowWidth: WINDOW_WIDTH,
        useRelativePositioning: false,
        align: Align.Top,
        justify: Justify.Start,
        referenceElDocumentPos: refElPos.top,
        referenceElViewportPos: refElPos.top,
        contentElDocumentPos: contentElPos,
        contentElViewportPos: contentElPos,
        scrollContainer: scrollContainerNull,
      });

      expect(calcPositionObject.align).toBeTruthy();
      expect(calcPositionObject.justify).toBeTruthy();
      expect(calcPositionObject.positionCSS).toBeTruthy();
    });

    describe('uses the scrollContainer offsetWidth and offsetHeight instead of windowHeight and windowWidth', () => {
      let offsetHeightSpy: jest.SpyInstance, offsetWeightSpy: jest.SpyInstance;
      const mockScrollContainer = document.createElement('div');

      // Mock the width and height of an HTML element
      beforeEach(() => {
        offsetWeightSpy = jest
          .spyOn(mockScrollContainer, 'offsetWidth', 'get')
          .mockImplementation(() => 100);
        offsetHeightSpy = jest
          .spyOn(mockScrollContainer, 'offsetHeight', 'get')
          .mockImplementation(() => 100);
      });

      afterEach(() => {
        offsetWeightSpy.mockRestore();
        offsetHeightSpy.mockRestore();
      });

      test('Align.Right, Justify.Start works', () => {
        const { align, justify, positionCSS } = calculatePosition({
          spacing: SPACING,
          windowHeight: 0,
          windowWidth: 0,
          useRelativePositioning: false,
          align: Align.Right,
          justify: Justify.Start,
          referenceElDocumentPos: refElPos.top,
          referenceElViewportPos: refElPos.top,
          contentElDocumentPos: contentElPos,
          contentElViewportPos: contentElPos,
          scrollContainer: mockScrollContainer,
        });

        expect(align).toBe('right');
        expect(justify).toBe('start');
        checkPixelValue(positionCSS.top, 0);
        checkPixelValue(positionCSS.left, 60);
        expect(positionCSS.transformOrigin).toBe('left top');
        expect(positionCSS.transform).toBe(
          'translate3d(-5px, 0, 0) scale(0.8)',
        );
      });
    });

    describe('when the reference element is on the top', () => {
      describe('Align.Top', () => {
        test('Align.Top respositions to Align.Bottom based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('bottom');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 15);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 45);
          checkPixelValue(positionCSS.right, 45);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Right', () => {
        test('Justify.Start works', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('right');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.Start based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('right');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Bottom repositions to Justify.Start based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('right');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.bottom, 90);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Bottom', () => {
        test('Justify.Start works', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('bottom');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 15);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('bottom');
          expect(justify).toBe('middle');
          checkPixelValue(positionCSS.top, 15);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('bottom');
          expect(justify).toBe('end');
          checkPixelValue(positionCSS.top, 15);
          checkPixelValue(positionCSS.left, 35);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 45);
          checkPixelValue(positionCSS.right, 45);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Left', () => {
        test('Justify.Start', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('left');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Center respositions to Justify.Start based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('left');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End respositions to Justify.Start based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('left');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.bottom, 90);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.CenterVertical', () => {
        test('Align.CenterVertical respositions to Align.Bottom based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('bottom');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 15);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 45);
          checkPixelValue(positionCSS.right, 45);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.CenterHorizontal', () => {
        test('Justify.Start', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('center-horizontal');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Center respositions to Justify.Start based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('center-horizontal');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End respositions to Justify.Start based on available space', () => {
          const { align, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(align).toBe('center-horizontal');
          expect(justify).toBe('start');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.top,
            referenceElViewportPos: refElPos.top,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.left, 40);
          checkPixelValue(positionCSS.bottom, 90);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });
    });

    describe('when the reference element is on the right', () => {
      describe('Align.Top', () => {
        test('Justify.Start repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 90);
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });
      });
      describe('Align.Right', () => {
        test('Align.Right respositions to Align.Left based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 65);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });
      describe('Align.Bottom', () => {
        test('Justify.Start repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 90);
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });
      describe('Align.Left', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 65);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 65);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 35);
          checkPixelValue(positionCSS.left, 65);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.bottom, 45);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });
      describe('Align.CenterVertical', () => {
        test('Justify.Start repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Middle repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 80);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 90);
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });
      describe('Align.CenterHorizontal', () => {
        test('Align.CenterHorizontal respositions to Align.Left based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.right,
            referenceElViewportPos: refElPos.right,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 65);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });
    });

    describe('when reference element is on the bottom', () => {
      describe('Align.Top', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 65);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 65);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 65);
          checkPixelValue(positionCSS.left, 35);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 45);
          checkPixelValue(positionCSS.right, 45);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Right', () => {
        test('Justify.Start repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 90);
          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });
      describe('Align.Bottom', () => {
        test('Align.Bottom repositions to Align.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 65);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Left', () => {
        test('Justify.Start repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 90);
          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.CenterVertical', () => {
        test('Align.CenterVertical repositions to Align.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 65);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.CenterHorizontal', () => {
        test('Justify.Start repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Middle repositions to Justify.End based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 80);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.bottom,
            referenceElViewportPos: refElPos.bottom,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 90);
          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });
    });

    describe('when reference element is on the left', () => {
      describe('Align.Top', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.End repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 0);
          checkPixelValue(positionCSS.right, 90);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Right', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 15);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 15);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 35);
          checkPixelValue(positionCSS.left, 15);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.bottom, 45);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });
      describe('Align.Bottom', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.End repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 0);
          checkPixelValue(positionCSS.right, 90);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Left', () => {
        test('Align.Left repositions to Align.Right based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 15);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.CenterVertical', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Middle repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End repositions to Justify.Start based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 0);
          checkPixelValue(positionCSS.right, 90);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });

      describe('Align.CenterHorizontal', () => {
        test('Align.CenterHorizontal repositions to Align.Right based on available space', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.left,
            referenceElViewportPos: refElPos.left,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 15);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });
    });

    describe('when reference element is in the center', () => {
      describe('Align.Top', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 20);
          checkPixelValue(positionCSS.left, 35);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 45);
          checkPixelValue(positionCSS.right, 45);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Right', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 35);
          checkPixelValue(positionCSS.left, 60);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.bottom, 45);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Bottom', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 60);
          checkPixelValue(positionCSS.left, 35);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 45);
          checkPixelValue(positionCSS.right, 45);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Left', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 35);
          checkPixelValue(positionCSS.left, 20);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.bottom, 45);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.CenterVertical', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 45);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 35);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterVertical,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 45);
          checkPixelValue(positionCSS.right, 45);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });

      describe('Align.CenterHorizontal', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 40);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 35);
          checkPixelValue(positionCSS.left, 40);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.CenterHorizontal,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 45);
          checkPixelValue(positionCSS.bottom, 45);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });
    });

    describe('when useRelativePositioning is true', () => {
      describe('Align.Top', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Top,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.bottom).toBe('calc(100% + 5px)');
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Top,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.bottom).toBe('calc(100% + 5px)');
          expect(positionCSS.left).toBe('-5px');
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Top,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.bottom).toBe('calc(100% + 5px)');
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Top,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 0);
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(0, 5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Right', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Right,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 0);
          expect(positionCSS.left).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Right,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('-5px');
          expect(positionCSS.left).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Right,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.left).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('left bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Right,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Bottom', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('calc(100% + 5px)');
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Bottom,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('calc(100% + 5px)');
          expect(positionCSS.left).toBe('-5px');
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('calc(100% + 5px)');
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Bottom,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 0);
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Left', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Left,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 0);
          expect(positionCSS.right).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('-5px');
          expect(positionCSS.right).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Left,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.right).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.Left,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.CenterVertical', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterVertical,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('calc(5px - 50%)');
          checkPixelValue(positionCSS.left, 0);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterVertical,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('calc(5px - 50%)');
          expect(positionCSS.left).toBe('-5px');
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterVertical,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('calc(5px - 50%)');
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('right center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterVertical,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.left, 0);
          checkPixelValue(positionCSS.right, 0);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });

      describe('Align.CenterHorizontal', () => {
        test('Justify.Start works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterHorizontal,
            justify: Justify.Start,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.top, 0);
          expect(positionCSS.left).toBe('calc(5px - 50%)');
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Middle works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterHorizontal,
            justify: Justify.Middle,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(positionCSS.top).toBe('-5px');
          expect(positionCSS.left).toBe('calc(5px - 50%)');
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterHorizontal,
            justify: Justify.End,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.left).toBe('calc(5px - 50%)');
          expect(positionCSS.transformOrigin).toBe('center bottom');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });

        test('Justify.Fit works', () => {
          const { justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: true,
            align: Align.CenterHorizontal,
            justify: Justify.Fit,
            referenceElDocumentPos: refElPos.center,
            referenceElViewportPos: refElPos.center,
            contentElDocumentPos: contentElPos,
            contentElViewportPos: contentElPos,
            scrollContainer: scrollContainerNull,
          });

          expect(justify).toBe('fit');
          checkPixelValue(positionCSS.top, 0);
          checkPixelValue(positionCSS.bottom, 0);
          expect(positionCSS.transformOrigin).toBe('center center');
          expect(positionCSS.transform).toBe('scale(0.8)');
        });
      });
    });
  });

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

  describe('getElementViewportPosition', () => {
    test('given an element, it returns an object with information about its position', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const pos = getElementViewportPosition(div);

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
