import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { OverlayContext } from '@leafygreen-ui/leafygreen-provider';

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

export const PopoverContext = createContext<PopoverContextType>({
  isPopoverOpen: false,
  setIsPopoverOpen: () => {},
});

/**
 * Access the popover context
 */
export const usePopoverContext = (): PopoverContextType => {
  return useContext(PopoverContext);
};

/**
 * Creates a Popover context.
 * Call `usePopoverContext` to access the popover state
 */
export const PopoverProvider = ({
  children,
  ...props
}: PropsWithChildren<PopoverProviderProps>) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      isPopoverOpen,
      setIsPopoverOpen,
      ...props,
    }),
    [isPopoverOpen, props],
  );

  return (
    <PopoverContext.Provider value={providerValue}>
      {children}
    </PopoverContext.Provider>
  );
};

PopoverProvider.displayName = 'PopoverProvider';

PopoverProvider.propTypes = { children: PropTypes.node };
