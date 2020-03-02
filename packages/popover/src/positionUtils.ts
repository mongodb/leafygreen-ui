import { Align, Justify, ElementPosition } from './types';

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
}: CalculatePosition): {
  alignment: Align;
  justify: Justify;
  positionCSS: any;
} {
  const windowSafeCommonArgs = {
    windowWidth,
    windowHeight,
    referenceElPos,
    contentElPos,
    spacing,
  };

  const alignment = getWindowSafeAlignment(align, windowSafeCommonArgs);
  const windowSafeJustify = getWindowSafeJustify(
    justify,
    alignment,
    windowSafeCommonArgs,
  );

  const transformOrigin = getTransformOrigin({
    alignment,
    justify,
  });

  const transform = getTransform(alignment, spacing);

  if (useRelativePositioning) {
    return {
      alignment,
      justify: windowSafeJustify,
      positionCSS: {
        ...calcRelativePosition({
          alignment,
          justify: windowSafeJustify,
          referenceElPos,
          contentElPos,
          spacing,
        }),
        transformOrigin,
        transform,
      },
    };
  }

  return {
    alignment,
    justify: windowSafeJustify,
    positionCSS: {
      ...calcAbsolutePosition({
        alignment,
        justify: windowSafeJustify,
        referenceElPos,
        contentElPos,
        spacing,
        windowHeight,
        windowWidth,
      }),
      transformOrigin,
      transform,
    },
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

interface TransformOriginArgs {
  alignment: Align;
  justify: Justify;
}

type XOrigin = 'left' | 'right' | 'center';
type YOrigin = 'top' | 'bottom' | 'center';

const yJustifyOrigins: { [J in Justify]: YOrigin } = {
  [Justify.Start]: 'top',
  [Justify.Middle]: 'center',
  [Justify.End]: 'bottom',
  [Justify.Fit]: 'center',
};
const xJustifyOrigins: { [J in Justify]: XOrigin } = {
  [Justify.Start]: 'left',
  [Justify.Middle]: 'center',
  [Justify.End]: 'right',
  [Justify.Fit]: 'center',
};

const transformOriginMappings: {
  [A in Align]: { x: XOrigin; y?: undefined } | { x?: undefined; y: YOrigin };
} = {
  [Align.Left]: { x: 'right' },
  [Align.Right]: { x: 'left' },
  [Align.Top]: { y: 'bottom' },
  [Align.Bottom]: { y: 'top' },
  [Align.CenterHorizontal]: { x: 'center' },
  [Align.CenterVertical]: { y: 'center' },
};

// Constructs the transform origin for any given pair of alignment / justification
function getTransformOrigin({
  alignment,
  justify,
}: TransformOriginArgs): string {
  const alignmentMapping = transformOriginMappings[alignment];
  const x: XOrigin = alignmentMapping.x ?? xJustifyOrigins[justify];
  const y: YOrigin = alignmentMapping.y ?? yJustifyOrigins[justify];

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

    case Align.CenterHorizontal:
    case Align.CenterVertical:
      // NOTE(JeT): For centered alignments, "spacing" doesn't make sense
      return `scale(${scaleAmount})`;
  }
}

interface AbsolutePositionObject {
  top?: string | 0;
  bottom?: string | 0;
  left?: string | 0;
  right?: string | 0;
}

interface CalcPositionArgs extends ElementPositions {
  alignment: Align;
  justify: Justify;
}

type JustifyPositions = {
  readonly [J in Justify]:
    | AbsolutePositionObject
    | ((positions: ElementPositions) => AbsolutePositionObject);
};

/**
 * Position mappings for when the main axis alignment is horizontal
 * (left/right/horizontal-center)
 */
const verticalJustifyRelativePositions: JustifyPositions = {
  [Justify.Start]: { top: 0 },
  [Justify.End]: { bottom: 0 },
  [Justify.Middle]: ({ contentElPos, referenceElPos }) => ({
    top: `${referenceElPos.height / 2 - contentElPos.height / 2}px`,
  }),
  [Justify.Fit]: { top: 0, bottom: 0 },
};

/**
 * Position mappings for when the main axis alignment is vertical
 * (top/bottom/vertical-center)
 */
const horizontalJustifyRelativePositions: JustifyPositions = {
  [Justify.Start]: { left: 0 },
  [Justify.End]: { right: 0 },
  [Justify.Middle]: ({ contentElPos, referenceElPos }) => ({
    left: `${referenceElPos.width / 2 - contentElPos.width / 2}px`,
  }),
  [Justify.Fit]: { left: 0, right: 0 },
};

const relativePositionMappings: {
  [A in Align]: {
    constant?: (positions: ElementPositions) => AbsolutePositionObject;
    justifyPositions: JustifyPositions;
  };
} = {
  [Align.Top]: {
    constant: ({ spacing }) => ({ bottom: `calc(100% + ${spacing}px)` }),
    justifyPositions: horizontalJustifyRelativePositions,
  },
  [Align.Bottom]: {
    constant: ({ spacing }) => ({ top: `calc(100% + ${spacing}px)` }),
    justifyPositions: horizontalJustifyRelativePositions,
  },
  [Align.CenterVertical]: {
    constant: ({ referenceElPos }) => ({
      top: `calc(${referenceElPos.height / 2}px - 50%)`,
    }),
    justifyPositions: horizontalJustifyRelativePositions,
  },
  [Align.Left]: {
    constant: ({ spacing }) => ({ right: `calc(100% + ${spacing}px)` }),
    justifyPositions: verticalJustifyRelativePositions,
  },
  [Align.Right]: {
    constant: ({ spacing }) => ({ left: `calc(100% + ${spacing}px)` }),
    justifyPositions: verticalJustifyRelativePositions,
  },
  [Align.CenterHorizontal]: {
    constant: ({ referenceElPos }) => ({
      left: `calc(${referenceElPos.width / 2}px - 50%)`,
    }),
    justifyPositions: verticalJustifyRelativePositions,
  },
};

// Returns positioning for an element absolutely positioned within it's relative parent
function calcRelativePosition({
  alignment,
  justify,
  referenceElPos,
  contentElPos,
  spacing,
}: CalcPositionArgs): AbsolutePositionObject {
  const alignMapping = relativePositionMappings[alignment];
  const justifyMapping = alignMapping.justifyPositions[justify];
  return {
    ...alignMapping.constant?.({ contentElPos, referenceElPos, spacing }),
    ...(typeof justifyMapping === 'function'
      ? justifyMapping({ contentElPos, referenceElPos, spacing })
      : justifyMapping),
  };
}

type CalcAbsolutePositionArgs = CalcPositionArgs & WindowSize;

function calcAbsolutePosition({
  alignment,
  justify,
  referenceElPos,
  contentElPos,
  spacing,
  windowWidth,
  windowHeight,
}: CalcAbsolutePositionArgs): AbsolutePositionObject {
  const left = `${calcLeft({
    alignment,
    justify,
    referenceElPos,
    contentElPos,
    spacing,
  })}px`;
  const top = `${calcTop({
    alignment,
    justify,
    referenceElPos,
    contentElPos,
    spacing,
  })}px`;

  if (justify !== Justify.Fit) {
    return { left, top };
  }

  if (
    ([Align.Left, Align.Right, Align.CenterHorizontal] as Array<
      Align
    >).includes(alignment)
  ) {
    return {
      left,
      top,
      bottom: `${windowHeight - referenceElPos.bottom}px`,
    };
  }

  return {
    left,
    top,
    right: `${windowWidth - referenceElPos.right}px`,
  };
}

interface CalcPosition extends ElementPositions {
  alignment?: Align;
  justify?: Justify;
}

// Returns the 'top' position in pixels for a valid alignment or justification.
function calcTop({
  alignment,
  justify,
  contentElPos,
  referenceElPos,
  spacing,
}: CalcPosition): number {
  switch (alignment) {
    case Align.Left:
    case Align.Right:
    case Align.CenterHorizontal:
      switch (justify) {
        case Justify.Start:
        case Justify.Fit:
          return referenceElPos.top;

        case Justify.End:
          return (
            referenceElPos.top + referenceElPos.height - contentElPos.height
          );

        case Justify.Middle:
        default:
          return (
            referenceElPos.top -
            (contentElPos.height - referenceElPos.height) / 2
          );
      }

    case Align.CenterVertical:
      return (
        referenceElPos.top - (contentElPos.height - referenceElPos.height) / 2
      );

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
  justify,
  contentElPos,
  referenceElPos,
  spacing,
}: CalcPosition): number {
  switch (alignment) {
    case Align.Top:
    case Align.Bottom:
    case Align.CenterVertical:
      switch (justify) {
        case Justify.End:
          return (
            referenceElPos.left + referenceElPos.width - contentElPos.width
          );

        case Justify.Middle:
          return (
            referenceElPos.left -
            (contentElPos.width - referenceElPos.width) / 2
          );

        case Justify.Start:
        case Justify.Fit:
        default:
          return referenceElPos.left;
      }

    case Align.Left:
      return referenceElPos.left - contentElPos.width - spacing;

    case Align.Right:
      return referenceElPos.left + referenceElPos.width + spacing;

    case Align.CenterHorizontal:
    default:
      return (
        referenceElPos.left - (contentElPos.width - referenceElPos.width) / 2
      );
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

  const alignments: { [A in Align]: ReadonlyArray<Align> } = {
    [Align.Top]: [Align.Top, Align.Bottom],
    [Align.Bottom]: [Align.Bottom, Align.Top],
    [Align.Left]: [Align.Left, Align.Right],
    [Align.Right]: [Align.Right, Align.Left],
    [Align.CenterHorizontal]: [Align.CenterHorizontal, Align.Left, Align.Right],
    [Align.CenterVertical]: [Align.CenterVertical, Align.Top, Align.Bottom],
  };

  return (
    alignments[align].find(alignment => {
      // Check that an alignment will not cause the popover to collide with the window.

      if (
        ([Align.Top, Align.Bottom, Align.CenterVertical] as Array<
          Align
        >).includes(alignment)
      ) {
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

      if (
        ([Align.Left, Align.Right, Align.CenterHorizontal] as Array<
          Align
        >).includes(alignment)
      ) {
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

const justifyFallbacks: { [J in Justify]: ReadonlyArray<Justify> } = {
  [Justify.Start]: [Justify.End, Justify.Middle],
  [Justify.Middle]: [Justify.End, Justify.Start],
  [Justify.End]: [Justify.Start, Justify.Middle],
  [Justify.Fit]: [Justify.Middle, Justify.Start, Justify.End],
};

// Determines the justification to render based on an order of justification fallbacks
// Returns the first justification that doesn't collide with the window,
// defaulting to the justify prop if all justifications fail.
function getWindowSafeJustify(
  justify: Justify,
  alignment: Align,
  windowSafeCommon: WindowSafeCommonArgs,
): Justify {
  const {
    spacing,
    contentElPos,
    windowWidth,
    windowHeight,
    referenceElPos,
  } = windowSafeCommon;

  const justifyOptions = [justify, ...justifyFallbacks[justify]];

  switch (alignment) {
    case Align.Top:
    case Align.Bottom:
    case Align.CenterVertical:
      return (
        justifyOptions.find(fallback =>
          safelyWithinHorizontalWindow({
            contentWidth: contentElPos.width,
            windowWidth,
            left: calcLeft({
              contentElPos,
              referenceElPos,
              spacing,
              justify: fallback,
            }),
          }),
        ) ?? justifyFallbacks[justify][0]
      );

    case Align.Left:
    case Align.Right:
    case Align.CenterHorizontal:
      return (
        justifyOptions.find(fallback =>
          safelyWithinVerticalWindow({
            contentHeight: contentElPos.height,
            windowHeight,
            top: calcTop({
              contentElPos,
              referenceElPos,
              spacing,
              justify: fallback,
            }),
          }),
        ) ?? justifyFallbacks[justify][0]
      );
  }
}
