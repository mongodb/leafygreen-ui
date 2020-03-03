import { Align, Justify } from './types';
import { calculatePosition, getElementPosition } from './positionUtils';

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

describe('positionUtils', () => {
  describe('calculatePosition', () => {
    describe('returns an object with three key-value pairs', () => {
      const calcPositionObject = calculatePosition({
        spacing: SPACING,
        windowHeight: WINDOW_HEIGHT,
        windowWidth: WINDOW_WIDTH,
        useRelativePositioning: false,
        align: Align.Top,
        justify: Justify.Start,
        referenceElPos: refElPos.top,
        contentElPos: contentElPos,
      });

      expect(calcPositionObject.alignment).toBeTruthy();
      expect(calcPositionObject.justify).toBeTruthy();
      expect(calcPositionObject.positionCSS).toBeTruthy();
    });

    describe('when the reference element is on the top', () => {
      describe('Align.Top', () => {
        test('Align.Top respositions to Align.Bottom based on available space', () => {
          const { alignment, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(alignment).toBe('bottom');
          expect(justify).toBe('start');
          expect(positionCSS.top).toBePx(15);
          expect(positionCSS.left).toBePx(45);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Right', () => {
        test('Justify.Start works', () => {
          const { alignment, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(alignment).toBe('right');
          expect(justify).toBe('start');
          expect(positionCSS.top).toBePx(0);
          expect(positionCSS.left).toBePx(60);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Middle repositions to Justify.Start based on available space', () => {
          const { alignment, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Middle,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(alignment).toBe('right');
          expect(justify).toBe('start');
          expect(positionCSS.top).toBePx(0);
          expect(positionCSS.left).toBePx(60);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justify.Bottom repositions to Justify.Start based on available space', () => {
          const { alignment, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(alignment).toBe('right');
          expect(justify).toBe('start');
          expect(positionCSS.top).toBePx(0);
          expect(positionCSS.left).toBePx(60);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });
      });

      describe('Align.Bottom', () => {
        test('Justify.Start works', () => {
          const { alignment, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(alignment).toBe('bottom');
          expect(justify).toBe('start');
          expect(positionCSS.top).toBePx(15);
          expect(positionCSS.left).toBePx(45);
          expect(positionCSS.transformOrigin).toBe('left top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
        test('Justify.Middle works', () => {
          const { alignment, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Middle,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(alignment).toBe('bottom');
          expect(justify).toBe('middle');
          expect(positionCSS.top).toBePx(15);
          expect(positionCSS.left).toBePx(40);
          expect(positionCSS.transformOrigin).toBe('center top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
        test('Justify.End works', () => {
          const { alignment, justify, positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(alignment).toBe('bottom');
          expect(justify).toBe('end');
          expect(positionCSS.top).toBePx(15);
          expect(positionCSS.left).toBePx(35);
          expect(positionCSS.transformOrigin).toBe('right top');
          expect(positionCSS.transform).toBe(
            'translate3d(0, -5px, 0) scale(0.8)',
          );
        });
      });
    });

    describe('Align.Left', () => {
      test('Justify.Start', () => {
        const { alignment, justify, positionCSS } = calculatePosition({
          spacing: SPACING,
          windowHeight: WINDOW_HEIGHT,
          windowWidth: WINDOW_WIDTH,
          useRelativePositioning: false,
          align: Align.Left,
          justify: Justify.Start,
          referenceElPos: refElPos.top,
          contentElPos: contentElPos,
        });

        expect(alignment).toBe('left');
        expect(justify).toBe('start');
        expect(positionCSS.top).toBePx(0);
        expect(positionCSS.left).toBePx(20);
        expect(positionCSS.transformOrigin).toBe('right top');
        expect(positionCSS.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
      });
      test('Justify.Center respositions to Justify.Start based on available space', () => {
        const { alignment, justify, positionCSS } = calculatePosition({
          spacing: SPACING,
          windowHeight: WINDOW_HEIGHT,
          windowWidth: WINDOW_WIDTH,
          useRelativePositioning: false,
          align: Align.Left,
          justify: Justify.Middle,
          referenceElPos: refElPos.top,
          contentElPos: contentElPos,
        });

        expect(alignment).toBe('left');
        expect(justify).toBe('start');
        expect(positionCSS.top).toBePx(0);
        expect(positionCSS.left).toBePx(20);
        expect(positionCSS.transformOrigin).toBe('right top');
        expect(positionCSS.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
      });

      test('Justify.End respositions to Justify.Start based on available space', () => {
        const { alignment, justify, positionCSS } = calculatePosition({
          spacing: SPACING,
          windowHeight: WINDOW_HEIGHT,
          windowWidth: WINDOW_WIDTH,
          useRelativePositioning: false,
          align: Align.Left,
          justify: Justify.End,
          referenceElPos: refElPos.top,
          contentElPos: contentElPos,
        });

        expect(alignment).toBe('left');
        expect(justify).toBe('start');
        expect(positionCSS.top).toBePx(0);
        expect(positionCSS.left).toBePx(20);
        expect(positionCSS.transformOrigin).toBe('right top');
        expect(positionCSS.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(80);
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(80);
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(80);
          expect(positionCSS.transformOrigin).toBe('right bottom');
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(45);
          expect(positionCSS.left).toBePx(65);
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(80);
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(80);
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(80);
          expect(positionCSS.transformOrigin).toBe('right top');
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(45);
          expect(positionCSS.left).toBePx(65);
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(40);
          expect(positionCSS.left).toBePx(65);
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
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(35);
          expect(positionCSS.left).toBePx(65);
          expect(positionCSS.transformOrigin).toBe('right bottom');
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(65);
          expect(positionCSS.left).toBePx(45);
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(65);
          expect(positionCSS.left).toBePx(40);
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(65);
          expect(positionCSS.left).toBePx(35);
          expect(positionCSS.transformOrigin).toBe('right bottom');
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(80);
          expect(positionCSS.left).toBePx(60);
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(80);
          expect(positionCSS.left).toBePx(60);
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(80);
          expect(positionCSS.left).toBePx(60);
          expect(positionCSS.transformOrigin).toBe('left bottom');
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(65);
          expect(positionCSS.left).toBePx(45);
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(80);
          expect(positionCSS.left).toBePx(20);
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(80);
          expect(positionCSS.left).toBePx(20);
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
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(80);
          expect(positionCSS.left).toBePx(20);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(0);
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(0);
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(0);
          expect(positionCSS.transformOrigin).toBe('left bottom');
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(45);
          expect(positionCSS.left).toBePx(15);
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(40);
          expect(positionCSS.left).toBePx(15);
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(35);
          expect(positionCSS.left).toBePx(15);
          expect(positionCSS.transformOrigin).toBe('left bottom');
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(0);
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(0);
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(0);
          expect(positionCSS.transformOrigin).toBe('left top');
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
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(45);
          expect(positionCSS.left).toBePx(15);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(45);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(40);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(20);
          expect(positionCSS.left).toBePx(35);
          expect(positionCSS.transformOrigin).toBe('right bottom');
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(45);
          expect(positionCSS.left).toBePx(60);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(40);
          expect(positionCSS.left).toBePx(60);
          expect(positionCSS.transformOrigin).toBe('left center');
          expect(positionCSS.transform).toBe(
            'translate3d(-5px, 0, 0) scale(0.8)',
          );
        });

        test('Justification.End works', () => {
          const { positionCSS } = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(35);
          expect(positionCSS.left).toBePx(60);
          expect(positionCSS.transformOrigin).toBe('left bottom');
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(45);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(40);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(60);
          expect(positionCSS.left).toBePx(35);
          expect(positionCSS.transformOrigin).toBe('right top');
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(45);
          expect(positionCSS.left).toBePx(20);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(40);
          expect(positionCSS.left).toBePx(20);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(35);
          expect(positionCSS.left).toBePx(20);
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.bottom).toBe('calc(100% + 5px)');
          expect(positionCSS.left).toBePx(0);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.bottom).toBe('calc(100% + 5px)');
          expect(positionCSS.right).toBePx(0);
          expect(positionCSS.transformOrigin).toBe('right bottom');
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(0);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.bottom).toBePx(0);
          expect(positionCSS.left).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('left bottom');
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBe('calc(100% + 5px)');
          expect(positionCSS.left).toBePx(0);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBe('calc(100% + 5px)');
          expect(positionCSS.right).toBePx(0);
          expect(positionCSS.transformOrigin).toBe('right top');
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.top).toBePx(0);
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
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
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(positionCSS.bottom).toBePx(0);
          expect(positionCSS.right).toBe('calc(100% + 5px)');
          expect(positionCSS.transformOrigin).toBe('right bottom');
          expect(positionCSS.transform).toBe(
            'translate3d(5px, 0, 0) scale(0.8)',
          );
        });
      });
    });
  });

  describe('getElementPosition', () => {
    test('given an element, it returns an object with information about its position', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const pos = getElementPosition(div);

      expect(pos.top).toBe(0);
      expect(pos.bottom).toBe(0);
      expect(pos.left).toBe(0);
      expect(pos.right).toBe(0);
      expect(pos.height).toBe(0);
      expect(pos.width).toBe(0);
    });
  });
});
