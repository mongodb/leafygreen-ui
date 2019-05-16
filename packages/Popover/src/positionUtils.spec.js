import { Align, Justify } from './Popover';
import { calculatePosition } from './positionUtils';

const SPACING = 5;
const WINDOWWIDTH = 100;
const WINDOWHEIGHT = 100;

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
    describe('when the reference element is on the top', () => {
      describe('it correcly calculates alignment, when justification is constant', () => {
        test('Align.Top repositions to Align.Bottom based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(15);
          expect(pos.left).toBe(45);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(0, -5px, 0) scale(0.8)');
        });

        test('Align.Right works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(0);
          expect(pos.left).toBe(60);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });

        test('Align.Bottom works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(15);
          expect(pos.left).toBe(45);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(0, -5px, 0) scale(0.8)');
        });

        test('Align.Left works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(0);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });
      });

      describe('it correctly calculates justification, when alignment is constant', () => {
        test('Justify.Start works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(0);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justify.Center respositions to Justify.Start based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(0);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justification.End respositions to Justify.Start based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElPos: refElPos.top,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(0);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });
      });
    });

    describe('when the reference element is on the right', () => {
      describe('it correctly calculates alignment, when justification is constant', () => {
        test('Align.Top works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.End,
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(20);
          expect(pos.left).toBe(80);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(0, 5px, 0) scale(0.8)');
        });

        test('Align.Right repositions to Align.Left based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(35);
          expect(pos.left).toBe(65);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Align.Bottom works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(60);
          expect(pos.left).toBe(80);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(0, -5px, 0) scale(0.8)');
        });

        test('Align.Left works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(35);
          expect(pos.left).toBe(65);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });
      });

      describe('it correctly calculates jusitification, when alignment is constant', () => {
        test('Justify.Start works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(45);
          expect(pos.left).toBe(65);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justify.Center works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(40);
          expect(pos.left).toBe(65);
          expect(pos.transformOrigin).toBe('right center');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justification.End works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElPos: refElPos.right,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(35);
          expect(pos.left).toBe(65);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });
      });
    });

    describe('when reference element is on the bottom', () => {
      describe('it correcly calculates alignment, when justification is constant', () => {
        test('Align.Top works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.End,
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(65);
          expect(pos.left).toBe(35);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(0, 5px, 0) scale(0.8)');
        });

        test('Align.Right works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(80);
          expect(pos.left).toBe(60);
          expect(pos.transformOrigin).toBe('left bottom');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });

        test('Align.Bottom repositions to Align.Top based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(65);
          expect(pos.left).toBe(35);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(0, 5px, 0) scale(0.8)');
        });

        test('Align.Left works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(80);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });
      });

      describe('it correcly calculates justification, when alignment is constant', () => {
        test('Justification.Start repositions to Justification.End based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(80);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justification.Middle repositions to Justification.End based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(80);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justification.End works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElPos: refElPos.bottom,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(80);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });
      });
    });

    describe('when reference element is on the left', () => {
      describe('it correcly calculates alignment, when justification is constant', () => {
        test('Align.Top works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(20);
          expect(pos.left).toBe(0);
          expect(pos.transformOrigin).toBe('left bottom');
          expect(pos.transform).toBe('translate3d(0, 5px, 0) scale(0.8)');
        });

        test('Align.Right works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(45);
          expect(pos.left).toBe(15);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });

        test('Align.Bottom works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(60);
          expect(pos.left).toBe(0);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(0, -5px, 0) scale(0.8)');
        });

        test('Align.Left repositions to Align.Right based on available space', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(45);
          expect(pos.left).toBe(15);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });
      });

      describe('it correctly calculates justification, when alignment is constant', () => {
        test('Justification.Start works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(45);
          expect(pos.left).toBe(15);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });

        test('Justification.Middle works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(40);
          expect(pos.left).toBe(15);
          expect(pos.transformOrigin).toBe('left center');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });

        test('Justification.End works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElPos: refElPos.left,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(35);
          expect(pos.left).toBe(15);
          expect(pos.transformOrigin).toBe('left bottom');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });
      });
    });

    describe('when reference element is in the ceneter', () => {
      describe('Align.Top', () => {
        test('Justification.Start works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Start,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(20);
          expect(pos.left).toBe(45);
          expect(pos.transformOrigin).toBe('left bottom');
          expect(pos.transform).toBe('translate3d(0, 5px, 0) scale(0.8)');
        });

        test('Justification.Middle works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.Middle,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(20);
          expect(pos.left).toBe(40);
          expect(pos.transformOrigin).toBe('center bottom');
          expect(pos.transform).toBe('translate3d(0, 5px, 0) scale(0.8)');
        });

        test('Justification.End works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Top,
            justify: Justify.End,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(20);
          expect(pos.left).toBe(35);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(0, 5px, 0) scale(0.8)');
        });
      });

      describe('Align.Right', () => {
        test('Justification.Start works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Start,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(45);
          expect(pos.left).toBe(60);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });

        test('Justification.Middle works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.Middle,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(40);
          expect(pos.left).toBe(60);
          expect(pos.transformOrigin).toBe('left center');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });

        test('Justification.End works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Right,
            justify: Justify.End,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(35);
          expect(pos.left).toBe(60);
          expect(pos.transformOrigin).toBe('left bottom');
          expect(pos.transform).toBe('translate3d(-5px, 0, 0) scale(0.8)');
        });
      });

      describe('Align.Bottom', () => {
        test('Justification.Start works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Start,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(60);
          expect(pos.left).toBe(45);
          expect(pos.transformOrigin).toBe('left top');
          expect(pos.transform).toBe('translate3d(0, -5px, 0) scale(0.8)');
        });

        test('Justification.Middle works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.Middle,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(60);
          expect(pos.left).toBe(40);
          expect(pos.transformOrigin).toBe('center top');
          expect(pos.transform).toBe('translate3d(0, -5px, 0) scale(0.8)');
        });

        test('Justification.End works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Bottom,
            justify: Justify.End,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(60);
          expect(pos.left).toBe(35);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(0, -5px, 0) scale(0.8)');
        });
      });

      describe('Align.Left', () => {
        test('Justification.Start works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Start,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(45);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right top');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justification.Middle works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.Middle,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(40);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right center');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });

        test('Justification.End works', () => {
          const pos = calculatePosition({
            spacing: SPACING,
            windowHeight: WINDOWHEIGHT,
            windowWidth: WINDOWWIDTH,
            useRelativePositioning: false,
            align: Align.Left,
            justify: Justify.End,
            referenceElPos: refElPos.center,
            contentElPos: contentElPos,
          });

          expect(pos.top).toBe(35);
          expect(pos.left).toBe(20);
          expect(pos.transformOrigin).toBe('right bottom');
          expect(pos.transform).toBe('translate3d(5px, 0, 0) scale(0.8)');
        });
      });
    });
  });
});
