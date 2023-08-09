import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import PropTypes from 'prop-types';

import { usePrefersReducedMotion } from '@leafygreen-ui/a11y';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Popover, { Align } from '@leafygreen-ui/popover';

import { beaconStyles, timeout1, timeout2 } from './styles';
import TooltipContent from './TooltipContent';
import { GuideCueProps, TooltipAlign, TooltipJustify } from './types';

function GuideCue({
  open,
  setOpen,
  refEl,
  numberOfSteps,
  currentStep = 1,
  darkMode: darkModeProp,
  title,
  children,
  onDismiss = () => {},
  onPrimaryButtonClick = () => {},
  tooltipClassName,
  portalClassName,
  buttonText: buttonTextProp,
  tooltipAlign = TooltipAlign.Top,
  tooltipJustify = TooltipJustify.Middle,
  beaconAlign = Align.CenterHorizontal,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  ...tooltipProps
}: GuideCueProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const beaconRef = useRef<HTMLDivElement | null>(null);

  /**
   * Determines the button text. If there is nothing passed to the `buttonText` prop then default text will show depending on the numberOfSteps.
   */
  const buttonText = buttonTextProp
    ? buttonTextProp
    : currentStep === numberOfSteps || numberOfSteps === 1
    ? 'Got it'
    : 'Next';

  /**
   * Determines if the stand-alone tooltip should be shown. If there are multiple steps the multip-step tooltip will be shown.
   */
  const isStandalone = numberOfSteps <= 1;

  useEffect(() => {
    let openTimeout: NodeJS.Timeout, closeTimeout: NodeJS.Timeout;

    if (open && !isStandalone) {
      // Adding a timeout to the tooltip so the tooltip is positioned correctly. Without the delay the tooltip can sometime shift when it is first visible. Only applies to multi-step tooltip.
      setPopoverOpen(true); // beacon opens first
      openTimeout = setTimeout(
        () =>
          // React 18 automatically batches all updates which appears to break the opening transition. flushSync prevents this state update from automically batching. Instead updates are made synchronously.
          flushSync(() => {
            setTooltipOpen(true);
          }),
        timeout1,
      ); // tooltip opens a little after
    } else {
      // Adding a timeout to the popover because if we close both the tooltip and the popover at the same time the transition is not visible. Only applies to multi-step tooltip.
      setTooltipOpen(false); // tooltip closes first
      closeTimeout = setTimeout(() => setPopoverOpen(false), timeout2); // beacon closes a little after
    }

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, [open, isStandalone]);

  /**
   * Callback fired when the X icon is clicked . It closes the tooltip and fires the callback that was passed to `onDismiss`.
   */
  const handleCloseClick = () => {
    setOpen(false);
    setTimeout(() => onDismiss(), timeout1);
  };

  /**
   * Callback fired when the primary bottom is clicked. It closes the tooltip and fires the callback that was passed to `onPrimaryButtonClick`.
   */
  const handleButtonClick = () => {
    setOpen(false);
    setTimeout(() => onPrimaryButtonClick(), isStandalone ? 0 : timeout1);
  };

  /**
   * This callback is fired when the Esc key closes the tooltip since this happens directly in the `Tooltip` component. If this is a stand-alone tooltip then we use the callback for the primary button(`onPrimaryButtonClick`) since that is the callback that would be fired if the primary button was clicked. If it's the multi-step tooltip we use the callback from the dismiss(X) button(`onDismiss`) since thats the callback that would be fired if the dismiss(X) button was clicked.
   */
  const onEscClose = isStandalone ? onPrimaryButtonClick : onDismiss;

  const sharedProps = {
    portalClassName,
    portalContainer,
    scrollContainer,
  };

  const tooltipContentProps = {
    darkMode,
    open,
    setOpen,
    tooltipJustify,
    tooltipAlign,
    refEl,
    popoverZIndex,
    numberOfSteps,
    currentStep,
    theme,
    title,
    isStandalone,
    buttonText,
    tooltipClassName,
    onEscClose,
    handleButtonClick,
    handleCloseClick,
    ...tooltipProps,
  };

  const [shouldRender, setShouldRender] = useState(false);

  useIsomorphicLayoutEffect(() => setShouldRender(true), []);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      {isStandalone ? (
        // Standalone tooltip
        // this is using the reference from the `refEl` prop to position itself against
        <TooltipContent {...tooltipContentProps} {...sharedProps}>
          {children}
        </TooltipContent>
      ) : (
        // Multistep tooltip

        <Popover
          active={popoverOpen}
          refEl={refEl}
          align={beaconAlign}
          justify={TooltipJustify.Middle}
          spacing={-12} // width of beacon is 24px, 24/2 = 12
          adjustOnMutation={true}
          popoverZIndex={popoverZIndex}
          {...sharedProps}
        >
          {/* The beacon is using the popover component to position itself */}
          <div
            ref={beaconRef}
            className={beaconStyles(prefersReducedMotion, darkMode)}
          >
            <div />
          </div>

          <TooltipContent
            {...tooltipContentProps}
            refEl={beaconRef}
            open={tooltipOpen}
            usePortal={false}
          >
            {children}
          </TooltipContent>
        </Popover>
      )}
    </>
  );
}

GuideCue.displayName = 'GuideCue';
GuideCue.propTypes = {
  children: PropTypes.node,
  darkMode: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refEl: PropTypes.shape({
    current:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(Element)
        : PropTypes.any,
  }),
  numberOfSteps: PropTypes.number.isRequired,
  currentStep: function (props: { [x: string]: any }, propName: string) {
    // if numberOfSteps > 1 and currentStep is not a number then throw error
    if (props['numberOfSteps'] > 1 && typeof props[propName] !== 'number') {
      return new Error(
        '`currentStep` prop of type `number` is required if numberOfSteps > 1',
      );
    }

    // if numberOfSteps <= 1 && currentStep prop exist and it is not a number make sure its a number
    if (
      props['numberOfSteps'] <= 1 &&
      props[propName] !== undefined &&
      typeof props[propName] !== 'number'
    ) {
      return new Error(
        `'currentStep' prop is invalid. Type '${typeof props[
          propName
        ]}' supplied to 'currentStep', expected 'number'`,
      );
    }
  },
  title: PropTypes.string,
  tooltipClassName: PropTypes.string,
  buttonText: PropTypes.string,
  onDismiss: PropTypes.func,
  onPrimaryButtonClick: PropTypes.func,
  tooltipAlign: PropTypes.oneOf(Object.values(TooltipAlign)),
  tooltipJustify: PropTypes.oneOf(Object.values(TooltipJustify)),
  beaconAlign: PropTypes.oneOf(Object.values(Align)),
  // Popover Props
  popoverZIndex: PropTypes.number,
  scrollContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  portalContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  portalClassName: PropTypes.string,
};

export default GuideCue;
