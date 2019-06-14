import Align from './Align';
import Justify from './Justify';

interface ElementPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

type ReferencePosition = ElementPosition;
type ContentPosition = ElementPosition;

interface ElementPositions {
  spacing: number;
  referenceElPos: ReferencePosition;
  contentElPos: ContentPosition;
}

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
}

interface CalculatePosition extends ElementPositions, Partial<WindowSize> {
  useRelativePositioning: boolean;
  align: Align;
  justify: Justify;
}

// Returns the style object that is used to position and transition the popover component
export function calculatePosition({
  useRelativePositioning,
  spacing,
  align,
  justify,
  referenceElPos = defaultElementPosition,
  contentElPos = defaultElementPosition,
  windowHeight = window.innerHeight,
  windowWidth = window.innerWidth,
}: CalculatePosition) {
  const windowSafeCommonArgs = {
    windowWidth,
    windowHeight,
    referenceElPos,
    contentElPos,
    spacing,
  };

  const alignment = getWindowSafeAlignment(align, windowSafeCommonArgs);
  const justification = getWindowSafeJustification(
    justify,
    alignment,
    windowSafeCommonArgs,
  );

  const transformOrigin = getTransformOrigin({
    alignment,
    justification,
  });

  const transform = getTransform(alignment, spacing);

  if (useRelativePositioning) {
    return {
      ...calcRelativePosition({
        alignment,
        justification,
        referenceElPos,
        contentElPos,
        spacing,
      }),
      transformOrigin,
      transform,
    };
  }

  return {
    top: calcTop({
      alignment,
      justification,
      contentElPos,
      referenceElPos,
      spacing,
    }),
    left: calcLeft({
      alignment,
      justification,
      contentElPos,
      referenceElPos,
      spacing,
    }),
    transformOrigin,
    transform,
  };
}

const defaultElementPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
};

// Gets top offset, left offset, width and height dimensions for a node
export function getElementPosition(
  element: HTMLElement | null,
): ElementPosition {
  if (!element) {
    return defaultElementPosition;
  }

  const { top, bottom, left, right } = element.getBoundingClientRect();
  const { offsetHeight: height, offsetWidth: width } = element;

  return { top, bottom, left, right, height, width };
}

// We transform 'middle' into 'center-vertical' or 'center-horizontal' for internal use,
// So both Justify and Justification are needed, where the same is not true for Alignment.
const Justification = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  CenterVertical: 'center-vertical',
  CenterHorizontal: 'center-horizontal',
} as const;

type Justification = typeof Justification[keyof typeof Justification];

interface TransformOriginArgs {
  alignment: Align;
  justification: Justification;
}

// Constructs the transform origin for any given pair of alignment / justification
function getTransformOrigin({
  alignment,
  justification,
}: TransformOriginArgs): string {
  let x = '';
  let y = '';

  switch (alignment) {
    case Align.Left:
      x = 'right';
      break;

    case Align.Right:
      x = 'left';
      break;

    case Align.Bottom:
      y = 'top';
      break;

    case Align.Top:
      y = 'bottom';
      break;
  }

  switch (justification) {
    case Justification.Left:
      x = 'left';
      break;

    case Justification.Right:
      x = 'right';
      break;

    case Justification.Bottom:
      y = 'bottom';
      break;

    case Justification.Top:
      y = 'top';
      break;

    case Justification.CenterHorizontal:
      x = 'center';
      break;

    case Justification.CenterVertical:
      y = 'center';
      break;
  }

  return `${x} ${y}`;
}

// Get transform styles for position object
function getTransform(alignment: Align, transformAmount: number): string {
  const scaleAmount = 0.8;

  switch (alignment) {
    case Align.Top:
      return `translate3d(0, ${transformAmount}px, 0) scale(${scaleAmount})`;

    case Align.Bottom:
      return `translate3d(0, -${transformAmount}px, 0) scale(${scaleAmount})`;

    case Align.Left:
      return `translate3d(${transformAmount}px, 0, 0) scale(${scaleAmount})`;

    case Align.Right:
      return `translate3d(-${transformAmount}px, 0, 0) scale(${scaleAmount})`;
  }
}

interface AbsolutePositionObject {
  top?: string | 0;
  bottom?: string | 0;
  left?: string | 0;
  right?: string | 0;
}

interface CalcRelativePositionArgs extends ElementPositions {
  alignment: Align;
  justification: Justification;
}

// Returns positioning for an element absolutely positioned within it's relative parent
function calcRelativePosition({
  alignment,
  justification,
  referenceElPos,
  contentElPos,
  spacing,
}: CalcRelativePositionArgs): AbsolutePositionObject {
  const positionObject: AbsolutePositionObject = {};

  switch (alignment) {
    case Align.Top:
      positionObject.bottom = `calc(100% + ${spacing}px)`;
      break;

    case Align.Bottom:
      positionObject.top = `calc(100% + ${spacing}px)`;
      break;

    case Align.Left:
      positionObject.right = `calc(100% + ${spacing}px)`;
      break;

    case Align.Right:
      positionObject.left = `calc(100% + ${spacing}px)`;
      break;
  }

  switch (justification) {
    case Justification.Top:
      positionObject.top = 0;
      break;

    case Justification.Bottom:
      positionObject.bottom = 0;
      break;

    case Justification.Left:
      positionObject.left = 0;
      break;

    case Justification.Right:
      positionObject.right = 0;
      break;

    case Justification.CenterHorizontal:
      positionObject.left = `${referenceElPos.width / 2 -
        contentElPos.width / 2}px`;
      break;

    case Justification.CenterVertical:
      positionObject.top = `${referenceElPos.height / 2 -
        contentElPos.height / 2}px`;
      break;
  }

  return positionObject;
}

interface CalcPosition extends ElementPositions {
  alignment?: Align;
  justification?: Justification;
}

// Returns the 'top' position in pixels for a valid alignment or justification.
function calcTop({
  alignment,
  justification,
  contentElPos,
  referenceElPos,
  spacing,
}: CalcPosition): number {
  switch (justification) {
    case Justification.Top:
      return referenceElPos.top;

    case Justification.Bottom:
      return referenceElPos.top + referenceElPos.height - contentElPos.height;

    case Justification.CenterVertical:
      return (
        referenceElPos.top + referenceElPos.height / 2 - contentElPos.height / 2
      );
  }

  switch (alignment) {
    case Align.Top:
      return referenceElPos.top - contentElPos.height - spacing;

    case Align.Bottom:
    default:
      return referenceElPos.top + referenceElPos.height + spacing;
  }
}

// Returns the 'left' position in pixels for a valid alignment or justification.
function calcLeft({
  alignment,
  justification,
  contentElPos,
  referenceElPos,
  spacing,
}: CalcPosition): number {
  switch (alignment) {
    case Align.Left:
      return referenceElPos.left - contentElPos.width - spacing;

    case Align.Right:
      return referenceElPos.left + referenceElPos.width + spacing;
  }

  switch (justification) {
    case Justification.Right:
      return referenceElPos.left + referenceElPos.width - contentElPos.width;

    case Justification.CenterHorizontal:
      return (
        referenceElPos.left + referenceElPos.width / 2 - contentElPos.width / 2
      );

    case Justification.Left:
    default:
      return referenceElPos.left;
  }
}

// Check if horizontal position is safely within edge of window
function safelyWithinHorizontalWindow({
  left,
  windowWidth,
  contentWidth,
}: {
  left: number;
  windowWidth: number;
  contentWidth: number;
}): boolean {
  const tooWide = left + contentWidth > windowWidth;

  return left >= 0 && !tooWide;
}

// Check if vertical position is safely within edge of window
function safelyWithinVerticalWindow({
  top,
  windowHeight,
  contentHeight,
}: {
  top: number;
  windowHeight: number;
  contentHeight: number;
}): boolean {
  const tooTall = top + contentHeight > windowHeight;

  return top >= 0 && !tooTall;
}

interface WindowSafeCommonArgs extends ElementPositions, WindowSize {}

// Determines the alignment to render based on an order of alignment fallbacks
// Returns the first alignment that doesn't collide with the window,
// defaulting to the align prop if all alignments fail.
function getWindowSafeAlignment(
  align: Align,
  windowSafeCommon: WindowSafeCommonArgs,
): Align {
  const {
    spacing,
    contentElPos,
    windowWidth,
    windowHeight,
    referenceElPos,
  } = windowSafeCommon;

  const alignments: {
    top: ReadonlyArray<Align>;
    bottom: ReadonlyArray<Align>;
    left: ReadonlyArray<Align>;
    right: ReadonlyArray<Align>;
  } = {
    top: [Align.Top, Align.Bottom],
    bottom: [Align.Bottom, Align.Top],
    left: [Align.Left, Align.Right],
    right: [Align.Right, Align.Left],
  };

  return (
    alignments[align].find(alignment => {
      // Check that an alignment will not cause the popover to collide with the window.

      if (([Align.Top, Align.Bottom] as Array<Align>).includes(alignment)) {
        const top = calcTop({
          alignment,
          contentElPos,
          referenceElPos,
          spacing,
        });
        return safelyWithinVerticalWindow({
          top,
          windowHeight,
          contentHeight: contentElPos.height,
        });
      }

      if (([Align.Left, Align.Right] as Array<Align>).includes(alignment)) {
        const left = calcLeft({
          alignment,
          contentElPos,
          referenceElPos,
          spacing,
        });
        return safelyWithinHorizontalWindow({
          left,
          windowWidth,
          contentWidth: contentElPos.width,
        });
      }

      return false;
    }) || align
  );
}

// Determines the justification to render based on an order of justification fallbacks
// Returns the first justification that doesn't collide with the window,
// defaulting to the justify prop if all justifications fail.
function getWindowSafeJustification(
  justify: Justify,
  alignment: Align,
  windowSafeCommon: WindowSafeCommonArgs,
): Justification {
  const {
    spacing,
    contentElPos,
    windowWidth,
    windowHeight,
    referenceElPos,
  } = windowSafeCommon;

  let justifications: {
    [Justify.Start]: ReadonlyArray<Justification>;
    [Justify.Middle]: ReadonlyArray<Justification>;
    [Justify.End]: ReadonlyArray<Justification>;
  };

  switch (alignment) {
    case Align.Left:
    case Align.Right: {
      justifications = {
        [Justify.Start]: [
          Justification.Top,
          Justification.Bottom,
          Justification.CenterVertical,
        ],
        [Justify.Middle]: [
          Justification.CenterVertical,
          Justification.Bottom,
          Justification.Top,
        ],
        [Justify.End]: [
          Justification.Bottom,
          Justification.Top,
          Justification.CenterVertical,
        ],
      };
      break;
    }

    case Align.Top:
    case Align.Bottom:
    default: {
      justifications = {
        [Justify.Start]: [
          Justification.Left,
          Justification.Right,
          Justification.CenterHorizontal,
        ],
        [Justify.Middle]: [
          Justification.CenterHorizontal,
          Justification.Right,
          Justification.Left,
        ],
        [Justify.End]: [
          Justification.Right,
          Justification.Left,
          Justification.CenterHorizontal,
        ],
      };
      break;
    }
  }

  return (
    justifications[justify].find(justification => {
      // Check that a justification will not cause the popover to collide with the window.
      if (
        ([
          Justification.Top,
          Justification.Bottom,
          Justification.CenterVertical,
        ] as Array<Justification>).includes(justification)
      ) {
        const top = calcTop({
          justification,
          contentElPos,
          referenceElPos,
          spacing,
        });

        return safelyWithinVerticalWindow({
          top,
          windowHeight,
          contentHeight: contentElPos.height,
        });
      }

      if (
        ([
          Justification.Left,
          Justification.Right,
          Justification.CenterHorizontal,
        ] as Array<Justification>).includes(justification)
      ) {
        const left = calcLeft({
          justification,
          contentElPos,
          referenceElPos,
          spacing,
        });

        return safelyWithinHorizontalWindow({
          left,
          windowWidth,
          contentWidth: contentElPos.width,
        });
      }

      return false;
    }) || justifications[justify][0]
  );
}
