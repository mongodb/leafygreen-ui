import React from 'react';
import { Transition } from 'react-transition-group';

import { HTMLElementProps } from '@leafygreen-ui/lib';

type TransitionProps = React.ComponentProps<typeof Transition<HTMLElement>>;

type TransitionLifecycleCallbacks = Pick<
  TransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;

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

type Align = (typeof Align)[keyof typeof Align];

export { Align };

/**
 * Options to determine the justification of the popover relative to
 * the other component
 * @param Start will justify content against the start of other element
 * @param Middle will justify content against the middle of other element
 * @param End will justify content against the end of other element
 * @param Fit will justify content against both the start and the end of the other element
 */
const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
  Fit: 'fit',
} as const;

type Justify = (typeof Justify)[keyof typeof Justify];

export { Justify };

export interface ElementPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

export interface ChildrenFunctionParameters {
  align: Align;
  justify: Justify;
  referenceElPos: ElementPosition;
}

export type PortalControlProps =
  | {
      /**
       * Specifies that the popover content should be rendered at the end of the DOM,
       * rather than in the DOM tree.
       *
       * default: `true`
       */
      usePortal?: true;

      /**
       * When usePortal is `true`, specifies a class name to apply to the root element of the portal.
       */
      portalClassName?: string;

      /**
       * When usePortal is `true`, specifies an element to portal within. The default behavior is to generate a div at the end of the document to render within.
       */
      portalContainer?: HTMLElement | null;

      /**
       * A ref for the portal element
       */
      portalRef?: React.MutableRefObject<HTMLElement | null>;

      /**
       * When usePortal is `true`, specifies the scrollable element to position relative to.
       */
      scrollContainer?: HTMLElement | null;
    }
  | {
      /**
       * Specifies that the popover content should be rendered at the end of the DOM,
       * rather than in the DOM tree.
       *
       * default: `true`
       */
      usePortal: false;

      /**
       * When usePortal is `true`, specifies a class name to apply to the root element of the portal.
       */
      portalClassName?: undefined;

      /**
       * When usePortal is `true`, specifies an element to portal within. The default behavior is to generate a div at the end of the document to render within.
       */
      portalContainer?: null;

      /**
       * A ref for the portal element
       */
      portalRef?: undefined;

      /**
       * When usePortal is `true`, specifies the scrollable element to position relative to.
       */
      scrollContainer?: null;
    };

/**
 * Base popover props.
 * Use these props to extend popover behavior
 */
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
   * Class name applied to popover container.
   */
  className?: string;

  /**
   * Class name applied to the popover content container
   */
  contentClassName?: string;

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

  /**
   * Click event handler passed to the root div element within the portal container.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Number that controls the z-index of the popover element directly.
   */
  popoverZIndex?: number;
} & PortalControlProps &
  TransitionLifecycleCallbacks;

/** Props used by the popover component */
export type PopoverComponentProps = Omit<HTMLElementProps<'div'>, 'children'> &
  PopoverProps;
