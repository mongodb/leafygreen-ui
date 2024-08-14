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

type PortalControlProps =
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

export type PopoverProviderProps = TransitionLifecycleCallbacks &
  PortalControlProps & {
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
