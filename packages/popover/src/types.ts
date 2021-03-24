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
  CenterVertical: 'center-vertical',
  CenterHorizontal: 'center-horizontal',
} as const;

type Align = typeof Align[keyof typeof Align];

export { Align };

/**
 * Options to determine the justification of the popover relative to
 * the other component
 * @param Start will justify content against the start of other element
 * @param Middle will justify content against the middle of other element
 * @param Bottom will justify content against the end of other element
 * @param Fit will justify content against both the start and the end of the other element
 */
const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
  Fit: 'fit',
} as const;

type Justify = typeof Justify[keyof typeof Justify];

export { Justify };

export interface ElementPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

interface ChildrenFunctionParameters {
  align: Align;
  justify: Justify;
  referenceElPos: ElementPosition;
}

export type PopoverProps = {
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
  active?: boolean;

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

  onClick?: React.MouseEventHandler;

  scrollContainer?: HTMLElement;
} & (
  {
    /**
     * Specifies that the popover content will appear portaled to the end of the DOM,
     * rather than in the DOM tree.
     *
     * default: `true`
     */
    usePortal?: true;

    /**
     * If using a portal, specifies a class name to apply to the root element of the portal.
     *
     * default: undefined
     */
    portalClassName?: string;

    /**
     * If using a portal, specifies the element to portal within.
     */
    portalContainer?: HTMLElement;
  } | {
    usePortal: false;

    /**
     * If using a portal, specifies a class name to apply to the root element of the portal.
     *
     * default: undefined
     */
    portalClassName?: undefined;

    /**
     * If using a portal, specifies the element to portal within.
     */
    portalContainer?: undefined;
  }
);
