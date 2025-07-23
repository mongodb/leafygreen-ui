import { Transition } from 'react-transition-group';

/**
 * These types are duplicated in `@leafygreen-ui/popover`: https://github.com/mongodb/leafygreen-ui/blob/02e1d77e5ed7d55f9b8402299eae0c6d540c53f8/packages/popover/src/Popover.types.ts
 *
 * We cannot import `PopoverProps` into `@leafygreen-ui/leafygreen-provider` without introducing a circular dependency.
 */

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
const DismissMode = {
  Auto: 'auto',
  Manual: 'manual',
} as const;
type DismissMode = (typeof DismissMode)[keyof typeof DismissMode];

/** Local implementation of web-native `ToggleEvent` until we use typescript v5 */
interface ToggleEvent extends Event {
  type: 'toggle';
  newState: 'open' | 'closed';
  oldState: 'open' | 'closed';
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

type PopoverRenderModeProps =
  | RenderPortalProps
  | RenderInlineProps
  | RenderTopLayerProps;

export type PopoverPropsProviderProps = {
  /**
   * Specifies the amount of spacing (in pixels) between the trigger element and the Popover content.
   *
   * default: `10`
   */
  spacing?: number;

  /**
   * Number that controls the z-index of the popover element directly.
   */
  popoverZIndex?: number;
} & PopoverRenderModeProps &
  TransitionLifecycleCallbacks;
