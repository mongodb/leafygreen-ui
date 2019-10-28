import React from 'react';

/**
 * Options to determine the alignment of the popover relative to
 * the other component
 * @param Top will align content above other element
 * @param Bottom will align content below other element
 * @param Left will align content to the left of other element
 * @param Right will align content to the right of other element
 */
const Align = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
} as const;

type Align = typeof Align[keyof typeof Align];

const Justification = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  CenterVertical: 'center-vertical',
  CenterHorizontal: 'center-horizontal',
} as const;

type Justification = typeof Justification[keyof typeof Justification];

/**
 * Options to determine the justification of the popover relative to
 * the other component
 * @param Start will justify content against the start of other element
 * @param Middle will justify content against the middle of other element
 * @param Bottom will justify content against the end of other element
 */
const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
} as const;

type Justify = typeof Justify[keyof typeof Justify];

export { Align, Justification, Justify };

export interface ElementPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

interface ChildrenFunctionParameters {
  alignment: Align;
  justification: Justify | Justification;
  referenceElPos: ElementPosition;
}

export interface PopoverProps {
  /**
   * Content that will appear inside of the popover component.
   */
  children:
    | React.ReactNode
    | ((Options: ChildrenFunctionParameters) => React.ReactNode);

  /**
   * Determines the active state of the popover component
   *
   * default: `false`
   */
  active: boolean;

  /**
   * Class name applied to popover content container.
   */
  className?: string;

  /**
   * Determines the alignment of the popover content relative to the trigger element
   *
   * default: `bottom`
   */
  align?: Align;

  /**
   * Determines the justification of the popover content relative to the trigger element
   *
   * default: `start`
   */
  justify?: Justify;

  /**
   * A reference to the element against which the popover component will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * Specifies that the popover content will appear portaled to the end of the DOM,
   * rather than in the DOM tree.
   *
   * default: `true`
   */
  usePortal?: boolean;

  /**
   * Specifies the amount of spacing (in pixels) between the trigger element and the Popover content.
   *
   * default: `10`
   */
  spacing?: number;

  /**
   * Should the Popover auto adjust its content when the DOM changes (using MutationObserver).
   *
   * default: false
   */
  adjustOnMutation?: boolean;
}
