import { Align, Justify } from './Popover';
import { calculatePosition, getElementPosition } from './positionUtils';

const SPACING = 10;
const CENTERED_REFELPOS = {
  bottom: 393.3948802947998,
  height: 19,
  left: 482.585205078125,
  right: 541.0511131286621,
  top: 374.78692626953125,
  width: 58,
};
const TOP_LEFT_REFELPOS = {
  bottom: 18.607954025268555,
  height: 19,
  left: 0,
  right: 58.46590805053711,
  top: 0,
  width: 58,
};
const TOP_RIGHT_REFELPOS = {
  bottom: 18.607954025268555,
  height: 19,
  left: 965.17041015625,
  right: 1023.6363182067871,
  top: 0,
  width: 58,
};
const BOTTOM_LEFT_REFELPOS = {
  bottom: 768.181806564331,
  height: 18,
  left: 0,
  right: 58.46590805053711,
  top: 749.5738525390625,
  width: 58,
};
const CONTENTELPOS = {
  bottom: 48.8636360168457,
  height: 61,
  left: 0,
  right: 123.21591186523438,
  top: 0,
  width: 154,
};
global.window.innerWidth = 1024;
global.window.innerHeight = 768;

describe('unit tests', () => {
  describe('calculatePosition', () => {
    test('TOP: it aligns content to top, when the space is available and the prop is set', () => {
      const pos = calculatePosition({
        useRelativePositioning: false,
        spacing: SPACING,
        align: Align.Top,
        justify: Justify.Start,
        referenceElPos: CENTERED_REFELPOS,
        contentElPos: CONTENTELPOS,
      });

      expect(pos.top).toBe(303.78692626953125);
      expect(pos.left).toBe(482.585205078125);
      expect(pos.transformOrigin).toBe('left bottom');
      expect(pos.transform).toBe('translate3d(0, 10px, 0) scale(0.8)');
    });

    test('TOP: it aligns content to bottom, when there is no space at desired alignment', () => {
      const pos = calculatePosition({
        useRelativePositioning: false,
        spacing: SPACING,
        align: Align.Top,
        justify: Justify.Start,
        referenceElPos: TOP_LEFT_REFELPOS,
        contentElPos: CONTENTELPOS,
      });
      expect(pos.top).toBe(29);
      expect(pos.left).toBe(0);
      expect(pos.transformOrigin).toBe('left top');
      expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
    });
  });

  test('BOTTOM: it aligns content to bottom, when the space is available and the prop is set', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Bottom,
      justify: Justify.Start,
      referenceElPos: CENTERED_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(403.78692626953125);
    expect(pos.left).toBe(482.585205078125);
    expect(pos.transformOrigin).toBe('left top');
    expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
  });

  test('BOTTOM: it aligns content to top, when there is no space at desired alignment', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Bottom,
      justify: Justify.Start,
      referenceElPos: BOTTOM_LEFT_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(678.5738525390625);
    expect(pos.left).toBe(0);
    expect(pos.transformOrigin).toBe('left bottom');
    expect(pos.transform).toBe('translate3d(0, 10px, 0) scale(0.8)');
  });

  test('LEFT: it aligns content to left, when there is space available and the prop is set', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Left,
      justify: Justify.Start,
      referenceElPos: CENTERED_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(374.78692626953125);
    expect(pos.left).toBe(318.585205078125);
    expect(pos.transformOrigin).toBe('right top');
    expect(pos.transform).toBe('translate3d(10px, 0, 0) scale(0.8)');
  });

  test('LEFT: it aligns content to right, when there is no space at desired alignment', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Left,
      justify: Justify.Start,
      referenceElPos: TOP_LEFT_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(0);
    expect(pos.left).toBe(68);
    expect(pos.transformOrigin).toBe('left top');
    expect(pos.transform).toBe('translate3d(-10px, 0, 0) scale(0.8)');
  });

  test('RIGHT: it aligns content to right, when there is space available and the prop is set', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Right,
      justify: Justify.Start,
      referenceElPos: CENTERED_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(374.78692626953125);
    expect(pos.left).toBe(550.585205078125);
    expect(pos.transformOrigin).toBe('left top');
    expect(pos.transform).toBe('translate3d(-10px, 0, 0) scale(0.8)');
  });

  test('RIGHT: it aligns content to left, when there is no space at desired alignment', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Right,
      justify: Justify.Start,
      referenceElPos: TOP_RIGHT_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(0);
    expect(pos.left).toBe(801.17041015625);
    expect(pos.transformOrigin).toBe('right top');
    expect(pos.transform).toBe('translate3d(10px, 0, 0) scale(0.8)');
  });

  test('START: it aligns content to start, when there is space available and the prop is set', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Right,
      justify: Justify.Start,
      referenceElPos: CENTERED_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(374.78692626953125);
    expect(pos.left).toBe(550.585205078125);
    expect(pos.transformOrigin).toBe('left top');
    expect(pos.transform).toBe('translate3d(-10px, 0, 0) scale(0.8)');
  });

  test('START: it justifies content to end, when there is no space at desired justification', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Bottom,
      justify: Justify.Start,
      referenceElPos: TOP_RIGHT_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(29);
    expect(pos.left).toBe(869.17041015625);
    expect(pos.transformOrigin).toBe('right top');
    expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
  });

  test('END: it justifies content to end, when there is space available and the prop is set', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Bottom,
      justify: Justify.End,
      referenceElPos: CENTERED_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(403.78692626953125);
    expect(pos.left).toBe(386.585205078125);
    expect(pos.transformOrigin).toBe('right top');
    expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
  });

  test('END: it justifies content to start, when there is no space at desired justification', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Bottom,
      justify: Justify.End,
      referenceElPos: TOP_LEFT_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(29);
    expect(pos.left).toBe(0);
    expect(pos.transformOrigin).toBe('left top');
    expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
  });

  test('MIDDLE: it justifies content to middle, when there is space available and the prop is set', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Bottom,
      justify: Justify.Middle,
      referenceElPos: CENTERED_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(403.78692626953125);
    expect(pos.left).toBe(434.585205078125);
    expect(pos.transformOrigin).toBe('center top');
    expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
  });

  test('MIDDLE: it justifies content to start, when there is no space at desired justification', () => {
    const pos = calculatePosition({
      useRelativePositioning: false,
      spacing: SPACING,
      align: Align.Bottom,
      justify: Justify.Middle,
      referenceElPos: TOP_LEFT_REFELPOS,
      contentElPos: CONTENTELPOS,
    });
    expect(pos.top).toBe(29);
    expect(pos.left).toBe(0);
    expect(pos.transformOrigin).toBe('left top');
    expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
  });

  test('getElementPosition returns an object with expected values', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    const refPos = getElementPosition(el);
    expect(refPos.top).toBe(0);
    expect(refPos.bottom).toBe(0);
    expect(refPos.left).toBe(0);
    expect(refPos.right).toBe(0);
    expect(refPos.height).toBe(0);
    expect(refPos.width).toBe(0);
  });
});
