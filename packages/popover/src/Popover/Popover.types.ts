import React from 'react';
import { Transition } from 'react-transition-group';
import { Placement } from '@floating-ui/react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

type TransitionProps = React.ComponentProps<typeof Transition<HTMLElement>>;

type TransitionLifecycleCallbacks = Pick<
  TransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;

/**
 * Options to render the popover element
 * @param Inline will render the popover element inline in the DOM where it's written
 * @param Portal will render the popover element in a new div appended to the body. Alternatively, can be portaled into a provided `portalContainer`
 * @param TopLayer will render the popover element in the top layer
 */
export const RenderMode = {
  Inline: 'inline',
  Portal: 'portal',
  TopLayer: 'top-layer',
} as const;
export type RenderMode = (typeof RenderMode)[keyof typeof RenderMode];

/**
 * Options to control how the popover element is dismissed. This should not be altered
 * because it is intended to have parity with the web-native {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover popover attribute}
 * @param Auto will automatically handle dismissal on backdrop click or esc key press, ensuring only one popover is visible at a time
 * @param Manual will require that the consumer handle dismissal manually
 */
export const DismissMode = {
  Auto: 'auto',
  Manual: 'manual',
} as const;
export type DismissMode = (typeof DismissMode)[keyof typeof DismissMode];

/** Local implementation of web-native `ToggleEvent` until we use typescript v5 */
export interface ToggleEvent extends Event {
  type: 'toggle';
  newState: 'open' | 'closed';
  oldState: 'open' | 'closed';
}

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
 */
const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
} as const;

type Justify = (typeof Justify)[keyof typeof Justify];

export { Justify };

/**
 * This value is derived from the placement value returned by the `useFloating` hook and
 * used to determine the `transform` styling of the popover element
 */
export const TransformAlign = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  Center: 'center',
} as const;
export type TransformAlign =
  (typeof TransformAlign)[keyof typeof TransformAlign];

export type ExtendedPlacement =
  | Placement
  | 'center'
  | 'center-start'
  | 'center-end';

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

export interface RenderInlineProps {
  /**
   * Options to render the popover element
   * @defaultValue 'top-layer'
   * @param Inline will render the popover element inline in the DOM where it's written. This option is deprecated and will be removed in the future.
   * @param Portal will render the popover element in a new div appended to the body. Alternatively, can be portaled into a provided `portalContainer`. This option is deprecated and will be removed in the future.
   * @param TopLayer will render the popover element in the top layer
   */
  renderMode: 'inline';

  /**
   * When `renderMode="top-layer"`, these options can control how a popover element is dismissed
   * - `'auto'` will automatically handle dismissal on backdrop click or key press, ensuring only one popover is visible at a time
   * - `'manual'` will require that the consumer handle dismissal manually
   */
  dismissMode?: never;

  /**
   * A callback function that is called when the visibility of a popover element rendered in the top layer is toggled
   */
  onToggle?: never;

  /**
   * When `renderMode="portal"`, it specifies a class name to apply to the portal element
   * @deprecated
   */
  portalClassName?: never;

  /**
   * When `renderMode="portal"`, it specifies an element to portal within. If not provided, a div is generated at the end of the body
   * @deprecated
   */
  portalContainer?: never;

  /**
   * When `renderMode="portal"`, it passes a ref to forward to the portal element
   * @deprecated
   */
  portalRef?: never;

  /**
   * When `renderMode="portal"`, it specifies the scrollable element to position relative to
   * @deprecated
   */
  scrollContainer?: never;
}

export interface RenderPortalProps {
  /**
   * Options to render the popover element
   * @defaultValue 'top-layer'
   * @param Inline will render the popover element inline in the DOM where it's written. This option is deprecated and will be removed in the future.
   * @param Portal will render the popover element in a new div appended to the body. Alternatively, can be portaled into a provided `portalContainer`. This option is deprecated and will be removed in the future.
   * @param TopLayer will render the popover element in the top layer
   */
  renderMode: 'portal';

  /**
   * When `renderMode="top-layer"`, these options can control how a popover element is dismissed
   * - `'auto'` will automatically handle dismissal on backdrop click or key press, ensuring only one popover is visible at a time
   * - `'manual'` will require that the consumer handle dismissal manually
   */
  dismissMode?: never;

  /**
   * When `renderMode="top-layer"`, this callback function is called when the visibility of a popover element is toggled
   */
  onToggle?: never;

  /**
   * When `renderMode="portal"`, it specifies a class name to apply to the portal element
   * @deprecated
   */
  portalClassName?: string;

  /**
   * When `renderMode="portal"`, it specifies an element to portal within. If not provided, a div is generated at the end of the body
   * @deprecated
   */
  portalContainer?: HTMLElement | null;

  /**
   * When `renderMode="portal"`, it passes a ref to forward to the portal element
   * @deprecated
   */
  portalRef?: React.MutableRefObject<HTMLElement | null>;

  /**
   * When `renderMode="portal"`, it specifies the scrollable element to position relative to
   * @deprecated
   */
  scrollContainer?: HTMLElement | null;
}

export interface RenderTopLayerProps {
  /**
   * Options to render the popover element
   * @defaultValue 'top-layer'
   * @param Inline will render the popover element inline in the DOM where it's written. This option is deprecated and will be removed in the future.
   * @param Portal will render the popover element in a new div appended to the body. Alternatively, can be portaled into a provided `portalContainer`. This option is deprecated and will be removed in the future.
   * @param TopLayer will render the popover element in the top layer
   */
  renderMode?: 'top-layer';

  /**
   * When `renderMode="top-layer"`, these options can control how a popover element is dismissed
   * - `'auto'` will automatically handle dismissal on backdrop click or key press, ensuring only one popover is visible at a time
   * - `'manual'` will require that the consumer handle dismissal manually
   */
  dismissMode?: DismissMode;

  /**
   * A callback function that is called when the visibility of a popover element rendered in the top layer is toggled
   */
  onToggle?: (e: ToggleEvent) => void;

  /**
   * When `renderMode="portal"`, it specifies a class name to apply to the portal element
   * @deprecated
   */
  portalClassName?: never;

  /**
   * When `renderMode="portal"`, it specifies an element to portal within. If not provided, a div is generated at the end of the body
   * @deprecated
   */
  portalContainer?: never;

  /**
   * When `renderMode="portal"`, it passes a ref to forward to the portal element
   * @deprecated
   */
  portalRef?: never;

  /**
   * When `renderMode="portal"`, it specifies the scrollable element to position relative to
   * @deprecated
   */
  scrollContainer?: never;
}

export type PopoverRenderModeProps =
  | RenderInlineProps
  | RenderPortalProps
  | RenderTopLayerProps;

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
   * Should the Popover auto adjust its content when the DOM changes (using MutationObserver).
   *
   * default: false
   */
  adjustOnMutation?: boolean;

  /**
   * Determines the alignment of the popover content relative to the trigger element
   *
   * default: `bottom`
   */
  align?: Align;

  /**
   * Class name applied to popover container.
   */
  className?: string;

  /**
   * Determines the justification of the popover content relative to the trigger element
   *
   * default: `start`
   */
  justify?: Justify;

  /**
   * Click event handler passed to the root div element within the portal container.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Number that controls the z-index of the popover element directly.
   * @deprecated
   */
  popoverZIndex?: number;

  /**
   * A reference to the element against which the popover component will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * Specifies the amount of spacing (in pixels) between the trigger element and the Popover content.
   *
   * default: `4`
   */
  spacing?: number;
} & PopoverRenderModeProps &
  TransitionLifecycleCallbacks;

/** Props used by the popover component */
export type PopoverComponentProps = Omit<HTMLElementProps<'div'>, 'children'> &
  PopoverProps;

export interface UseReferenceElementReturnObj {
  /**
   * Ref to access hidden placeholder element
   */
  placeholderRef: React.MutableRefObject<HTMLSpanElement | null>;

  /**
   * Element against which the popover component will be positioned
   */
  referenceElement: HTMLElement | null;

  /**
   * Document position details of the reference element
   */
  referenceElDocumentPos: ElementPosition;
}

export interface UseContentNodeReturnObj {
  /**
   * `contentNode` is the direct child of the popover element and wraps the children. It
   * is used to calculate the position of the popover because its parent has a transition.
   * This prevents getting the width of the popover until the transition completes
   */
  contentNode: HTMLDivElement | null;

  /**
   * We shadow the `contentNode` onto this `contentNodeRef` as `<Transition>` from
   * react-transition-group only accepts a `MutableRefObject` type. Without this, StrictMode
   * warnings are produced by react-transition-group.
   */
  contentNodeRef: React.MutableRefObject<HTMLDivElement | null>;

  /**
   * Dispatch method to attach `contentNode` to the `ContentWrapper`
   */
  setContentNode: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}
