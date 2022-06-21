import { Align, Justify, ElementPosition } from './types';

interface ElementViewportPositions {
  referenceElViewportPos: ElementPosition;
  contentElViewportPos: ElementPosition;
  spacing: number;
}

interface ElementDocumentPositions {
  referenceElDocumentPos: ElementPosition;
  contentElDocumentPos: ElementPosition;
  spacing: number;
}

interface ElementPositions
  extends Partial<ElementViewportPositions>,
    Partial<ElementDocumentPositions> {}

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
}

interface CalculatePosition
  extends Required<ElementPositions>,
    Partial<WindowSize> {
  useRelativePositioning: boolean;
  align: Align;
  justify: Justify;
  scrollContainer: HTMLElement | null | undefined;
}

// Returns the style object that is used to position and transition the popover component
export function calculatePosition({
  useRelativePositioning,
  spacing,
  align,
  justify,
  referenceElViewportPos = defaultElementPosition,
  referenceElDocumentPos = defaultElementPosition,
  contentElViewportPos = defaultElementPosition,
  contentElDocumentPos = defaultElementPosition,
  scrollContainer,
  windowHeight = window.innerHeight,
  windowWidth = window.innerWidth,
}: CalculatePosition): {
  align: Align;
  justify: Justify;
  positionCSS: any;
} {
  // Use scrollContainer width and height instead of window width and height when a scrollContainer is set
  // so we can correctly determine if the content element is safely within the "window"
  const windowContainerWidth = scrollContainer
    ? scrollContainer.offsetWidth
    : windowWidth;
  const windowContainerHeight = scrollContainer
    ? scrollContainer.offsetHeight
    : windowHeight;

  const windowSafeCommonArgs = {
    windowWidth: windowContainerWidth,
    windowHeight: windowContainerHeight,
    referenceElViewportPos,
    contentElViewportPos,
    spacing,
  };

  const windowSafeAlign = getWindowSafeAlign(align, windowSafeCommonArgs);
  const windowSafeJustify = getWindowSafeJustify(
    justify,
    windowSafeAlign,
    windowSafeCommonArgs,
  );

  const transformOrigin = getTransformOrigin({
    align: windowSafeAlign,
    justify: windowSafeJustify,
  });

  const transform = getTransform(windowSafeAlign, spacing);

  // calculatePosition will run and return CSS even if getBoundingClientRect() returns 0 for all properties, which then causes the content to have incorrect CSS. To avoid this we only want to return CSS if something is returned.
  //  Justify fit does not position itself properly in this case so we continue to return the CSS
  if (Math.floor(contentElViewportPos.width) === 0 && justify !== Justify.Fit) {
    return {
      align,
      justify,
      positionCSS: {
        left: 0,
        top: 0,
        transform,
        transformOrigin,
      },
    };
  }

  if (useRelativePositioning) {
    return {
      align: windowSafeAlign,
      justify: windowSafeJustify,
      positionCSS: {
        ...calcRelativePosition({
          align: windowSafeAlign,
          justify: windowSafeJustify,
          referenceElDocumentPos,
          contentElDocumentPos,
          spacing,
        }),
        transformOrigin,
        transform,
      },
    };
  }

  return {
    align: windowSafeAlign,
    justify: windowSafeJustify,
    positionCSS: {
      ...calcAbsolutePosition({
        align: windowSafeAlign,
        justify: windowSafeJustify,
        referenceElDocumentPos,
        contentElDocumentPos,
        spacing,
        windowHeight: windowContainerHeight,
        windowWidth: windowContainerWidth,
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

/**
 * Returns the width and height as well as the top, bottom, left, and right positions of an element.
 */
const getElementPosition = (element: HTMLElement) => {
  const { top, bottom, left, right } = element.getBoundingClientRect();
  const { offsetHeight: height } = element;
  // Returns the unrounded, floating point width of the element which does not include transformations.
  // `offsetWidth` would not work because this returns a rounded number of the element's layout width and `getBoundingClientRect.width` would also not work because it returns an exact number of the rendered width which can include transformations.
  const width = parseFloat(getComputedStyle(element).width);

  return {
    top,
    bottom,
    left,
    right,
    height,
    width,
  };
};

export function getElementDocumentPosition(
  element: HTMLElement | null,
  scrollContainer?: HTMLElement | null,
): ElementPosition {
  if (!element) {
    return defaultElementPosition;
  }

  const { top, bottom, left, right, height, width } =
    getElementPosition(element);

  if (scrollContainer) {
    const { scrollTop, scrollLeft } = scrollContainer;
    const {
      top: offsetTop,
      bottom: offsetBottom,
      left: offsetLeft,
      right: offsetRight,
    } = scrollContainer.getBoundingClientRect();

    return {
      top: top + scrollTop - offsetTop,
      bottom: bottom + scrollTop - offsetBottom,
      left: left + scrollLeft - offsetLeft,
      right: right + scrollLeft - offsetRight,
      height,
      width,
    };
  }

  const { scrollX, scrollY } = window;

  return {
    top: top + scrollY,
    bottom: bottom + scrollY,
    left: left + scrollX,
    right: right + scrollX,
    height,
    width,
  };
}

// Gets top offset, left offset, width and height dimensions for a node
export function getElementViewportPosition(
  element: HTMLElement | null,
  scrollContainer?: HTMLElement | null,
): ElementPosition {
  if (!element) {
    return defaultElementPosition;
  }

  const { top, bottom, left, right, height, width } =
    getElementPosition(element);

  if (scrollContainer) {
    const {
      top: offsetTop,
      bottom: offsetBottom,
      left: offsetLeft,
      right: offsetRight,
    } = scrollContainer.getBoundingClientRect();

    return {
      top: top - offsetTop,
      bottom: bottom - offsetBottom,
      left: left - offsetLeft,
      right: right - offsetRight,
      height,
      width,
    };
  }

  return {
    top,
    bottom,
    left,
    right,
    height,
    width,
  };
}

interface TransformOriginArgs {
  align: Align;
  justify: Justify;
}

type XOrigin = 'left' | 'right' | 'center';
type YOrigin = 'top' | 'bottom' | 'center';

const yJustifyOrigins: Record<Justify, YOrigin> = {
  [Justify.Start]: 'top',
  [Justify.Middle]: 'center',
  [Justify.End]: 'bottom',
  [Justify.Fit]: 'center',
};

const xJustifyOrigins: Record<Justify, XOrigin> = {
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
function getTransformOrigin({ align, justify }: TransformOriginArgs): string {
  const alignMapping = transformOriginMappings[align];
  const x: XOrigin = alignMapping.x ?? xJustifyOrigins[justify];
  const y: YOrigin = alignMapping.y ?? yJustifyOrigins[justify];

  return `${x} ${y}`;
}

// Get transform styles for position object
function getTransform(align: Align, transformAmount: number): string {
  const scaleAmount = 0.8;

  switch (align) {
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

interface CalcPositionArgs extends ElementDocumentPositions {
  align: Align;
  justify: Justify;
  spacing: number;
}

type JustifyPositions = {
  readonly [J in Justify]:
    | AbsolutePositionObject
    | ((positions: ElementDocumentPositions) => AbsolutePositionObject);
};

/**
 * Position mappings for when the main axis alignment is horizontal
 * (left/right/horizontal-center)
 */
const verticalJustifyRelativePositions: JustifyPositions = {
  [Justify.Start]: { top: 0 },
  [Justify.End]: { bottom: 0 },
  [Justify.Middle]: ({ contentElDocumentPos, referenceElDocumentPos }) => ({
    top: `${
      referenceElDocumentPos.height / 2 - contentElDocumentPos.height / 2
    }px`,
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
  [Justify.Middle]: ({ contentElDocumentPos, referenceElDocumentPos }) => ({
    left: `${
      referenceElDocumentPos.width / 2 - contentElDocumentPos.width / 2
    }px`,
  }),
  [Justify.Fit]: { left: 0, right: 0 },
};

const relativePositionMappings: Record<
  Align,
  {
    constant?: (positions: ElementDocumentPositions) => AbsolutePositionObject;
    justifyPositions: JustifyPositions;
  }
> = {
  [Align.Top]: {
    constant: ({ spacing }) => ({ bottom: `calc(100% + ${spacing}px)` }),
    justifyPositions: horizontalJustifyRelativePositions,
  },
  [Align.Bottom]: {
    constant: ({ spacing }) => ({ top: `calc(100% + ${spacing}px)` }),
    justifyPositions: horizontalJustifyRelativePositions,
  },
  [Align.CenterVertical]: {
    constant: ({ referenceElDocumentPos }) => ({
      top: `calc(${referenceElDocumentPos.height / 2}px - 50%)`,
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
    constant: ({ referenceElDocumentPos }) => ({
      left: `calc(${referenceElDocumentPos.width / 2}px - 50%)`,
    }),
    justifyPositions: verticalJustifyRelativePositions,
  },
};

// Returns positioning for an element absolutely positioned within it's relative parent
function calcRelativePosition({
  align,
  justify,
  referenceElDocumentPos,
  contentElDocumentPos,
  spacing,
}: CalcPositionArgs): AbsolutePositionObject {
  const alignMapping = relativePositionMappings[align];
  const justifyMapping = alignMapping.justifyPositions[justify];
  const mappingArgs = { contentElDocumentPos, referenceElDocumentPos, spacing };

  return {
    ...alignMapping.constant?.(mappingArgs),
    ...(typeof justifyMapping === 'function'
      ? justifyMapping(mappingArgs)
      : justifyMapping),
  };
}

type CalcAbsolutePositionArgs = CalcPositionArgs & WindowSize;

function calcAbsolutePosition({
  align,
  justify,
  referenceElDocumentPos,
  contentElDocumentPos,
  spacing,
  windowWidth,
  windowHeight,
}: CalcAbsolutePositionArgs): AbsolutePositionObject {
  const leftNum = calcLeft({
    align,
    justify,
    referenceElPos: referenceElDocumentPos,
    contentElPos: contentElDocumentPos,
    spacing,
  });

  const left = `${leftNum}px`;

  const top = `${calcTop({
    align,
    justify,
    referenceElPos: referenceElDocumentPos,
    contentElPos: contentElDocumentPos,
    spacing,
  })}px`;

  if (justify !== Justify.Fit) {
    return { left, top };
  }

  if (
    (
      [Align.Left, Align.Right, Align.CenterHorizontal] as Array<Align>
    ).includes(align)
  ) {
    return {
      left,
      top,
      bottom: `${windowHeight - referenceElDocumentPos.bottom}px`,
    };
  }

  return {
    left,
    top,
    right: `${windowWidth - (leftNum + referenceElDocumentPos.width)}px`, // take the left position of the content element and add the width of the reference element. This is where we want the right position of the content element to be. To get the equivalent right position minus this number from the container width.
  };
}

interface CalcPosition {
  align?: Align;
  justify?: Justify;
  spacing: number;
  contentElPos: ElementPosition;
  referenceElPos: ElementPosition;
}

// Returns the 'top' position in pixels for a valid alignment or justification.
function calcTop({
  align,
  justify,
  contentElPos,
  referenceElPos,
  spacing,
}: CalcPosition): number {
  switch (align) {
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
  align,
  justify,
  contentElPos,
  referenceElPos,
  spacing,
}: CalcPosition): number {
  switch (align) {
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

interface WindowSafeCommonArgs extends ElementViewportPositions, WindowSize {}

const alignFallbacks: { [A in Align]: ReadonlyArray<Align> } = {
  [Align.Top]: [Align.Bottom],
  [Align.Bottom]: [Align.Top],
  [Align.Left]: [Align.Right],
  [Align.Right]: [Align.Left],
  [Align.CenterHorizontal]: [Align.Left, Align.Right],
  [Align.CenterVertical]: [Align.Top, Align.Bottom],
};

// Determines the alignment to render based on an order of alignment fallbacks
// Returns the first alignment that doesn't collide with the window,
// defaulting to the align prop if all alignments fail.
function getWindowSafeAlign(
  align: Align,
  windowSafeCommon: WindowSafeCommonArgs,
): Align {
  const {
    spacing,
    windowWidth,
    windowHeight,
    contentElViewportPos,
    referenceElViewportPos,
  } = windowSafeCommon;

  const alignOptions = [align, ...alignFallbacks[align]];

  return (
    alignOptions.find(fallback => {
      // Check that an alignment will not cause the popover to collide with the window.

      if (
        (
          [Align.Top, Align.Bottom, Align.CenterVertical] as Array<Align>
        ).includes(fallback)
      ) {
        const top = calcTop({
          align: fallback,
          contentElPos: contentElViewportPos,
          referenceElPos: referenceElViewportPos,
          spacing,
        });

        return safelyWithinVerticalWindow({
          top,
          windowHeight,
          contentHeight: contentElViewportPos.height,
        });
      }

      if (
        (
          [Align.Left, Align.Right, Align.CenterHorizontal] as Array<Align>
        ).includes(fallback)
      ) {
        const left = calcLeft({
          align: fallback,
          contentElPos: contentElViewportPos,
          referenceElPos: referenceElViewportPos,
          spacing,
        });
        return safelyWithinHorizontalWindow({
          left,
          windowWidth,
          contentWidth: contentElViewportPos.width,
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
  align: Align,
  windowSafeCommon: WindowSafeCommonArgs,
): Justify {
  const {
    spacing,
    windowWidth,
    windowHeight,
    contentElViewportPos,
    referenceElViewportPos,
  } = windowSafeCommon;

  const justifyOptions = [justify, ...justifyFallbacks[justify]];

  switch (align) {
    case Align.Top:
    case Align.Bottom:
    case Align.CenterVertical:
      return (
        justifyOptions.find(fallback =>
          safelyWithinHorizontalWindow({
            contentWidth:
              fallback === Justify.Fit
                ? referenceElViewportPos.width
                : contentElViewportPos.width,
            windowWidth,
            left: calcLeft({
              contentElPos: contentElViewportPos,
              referenceElPos: referenceElViewportPos,
              spacing,
              align: align,
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
            contentHeight:
              fallback === Justify.Fit
                ? referenceElViewportPos.height
                : contentElViewportPos.height,
            windowHeight,
            top: calcTop({
              contentElPos: contentElViewportPos,
              referenceElPos: referenceElViewportPos,
              spacing,
              align,
              justify: fallback,
            }),
          }),
        ) ?? justifyFallbacks[justify][0]
      );
  }
}
