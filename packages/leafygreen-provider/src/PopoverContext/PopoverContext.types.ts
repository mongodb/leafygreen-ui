import { Transition } from 'react-transition-group';

import { OverlayContext } from '@leafygreen-ui/leafygreen-provider';

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

/** @deprecated - use {@link RenderTopLayerProps} */
interface RenderInlineProps {
  /**
   * Popover element will render inline with the reference element
   */
  renderMode: 'inline';

  /** Not used in this `renderMode` */
  dismissMode?: never;

  /** Not used in this `renderMode` */
  onToggle?: never;

  /** Not used in this `renderMode` */
  portalClassName?: never;

  /** Not used in this `renderMode` */
  portalContainer?: never;

  /** Not used in this `renderMode` */
  portalRef?: never;

  /** Not used in this `renderMode` */
  scrollContainer?: never;
}

/** @deprecated - use {@link RenderTopLayerProps} */
interface RenderPortalProps {
  /**
   * Popover element will render in a provided `portalContainer` or in a new div appended to the body
   */
  renderMode?: 'portal';

  /** Not used in this `renderMode` */
  dismissMode?: never;

  /** Not used in this `renderMode` */
  onToggle?: never;

  /**
   * Specifies a class name to apply to the portal element
   */
  portalClassName?: string;

  /**
   * Specifies an element to portal within. If not provided, a div is generated at the end of the body
   */
  portalContainer?: HTMLElement | null;

  /**
   * Passes a ref to forward to the portal element
   */
  portalRef?: React.MutableRefObject<HTMLElement | null>;

  /**
   * Specifies the scrollable element to position relative to
   */
  scrollContainer?: HTMLElement | null;
}

interface RenderTopLayerProps {
  /**
   * Popover element will render in the top layer
   */
  renderMode?: 'top-layer';

  /**
   * Options to control how the popover element is dismissed
   * - `'auto'` will automatically handle dismissal on backdrop click or key press, ensuring only one popover is visible at a time
   * - `'manual'` will require that the consumer handle dismissal manually
   */
  dismissMode?: DismissMode;

  /**
   * A callback function that is called when the popover is toggled
   */
  onToggle?: (e: ToggleEvent) => void;

  /** Not used in this `renderMode` */
  portalClassName?: never;

  /** Not used in this `renderMode` */
  portalContainer?: never;

  /** Not used in this `renderMode` */
  portalRef?: never;

  /** Not used in this `renderMode` */
  scrollContainer?: never;
}

type PopoverRenderModeProps =
  | RenderInlineProps
  | RenderPortalProps
  | RenderTopLayerProps;

export type PopoverProviderProps = TransitionLifecycleCallbacks &
  PopoverRenderModeProps & {
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
  };

/** TODO: https://jira.mongodb.org/browse/LG-4475 */
interface DeprecatedPopoverState {
  /**
   * Whether the most immediate popover ancestor is open
   *
   * @deprecated Use {@link OverlayContext} instead
   */
  isPopoverOpen: boolean;

  /**
   * Sets the internal state
   * @internal
   *
   * @deprecated Use {@link OverlayContext} instead
   */
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type PopoverContextType = PopoverProviderProps & DeprecatedPopoverState;
