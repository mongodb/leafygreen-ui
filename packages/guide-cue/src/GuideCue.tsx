import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { usePrefersReducedMotion } from '@leafygreen-ui/a11y';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Popover, {
  Align,
  DismissMode,
  RenderMode,
} from '@leafygreen-ui/popover';

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
  buttonText: buttonTextProp,
  tooltipAlign = TooltipAlign.Top,
  tooltipJustify = TooltipJustify.Middle,
  beaconAlign = Align.CenterHorizontal,
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
      // beacon opens first
      setPopoverOpen(true);
      openTimeout = setTimeout(
        () =>
          // React 18 automatically batches all updates which appears to break the opening transition. flushSync prevents this state update from automically batching. Instead updates are made synchronously.
          flushSync(() => {
            // tooltip opens a little after the beacon opens
            setTooltipOpen(true);
          }),
        timeout1,
      );
    } else {
      // Adding a timeout to the popover because if we close both the tooltip and the popover at the same time the transition is not visible. Only applies to multi-step tooltip.
      // tooltip closes first
      setTooltipOpen(false);
      // beacon closes a little after the tooltip cloese
      closeTimeout = setTimeout(() => setPopoverOpen(false), timeout2);
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

  const tooltipContentProps = {
    darkMode,
    open,
    setOpen,
    tooltipJustify,
    tooltipAlign,
    refEl,
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
        <TooltipContent {...tooltipContentProps}>{children}</TooltipContent>
      ) : (
        // Multistep tooltip
        <Popover
          active={popoverOpen}
          refEl={refEl}
          align={beaconAlign}
          justify={TooltipJustify.Middle}
          spacing={-12} // width of beacon is 24px, 24/2 = 12
          adjustOnMutation={true}
          dismissMode={DismissMode.Manual}
          renderMode={RenderMode.TopLayer}
        >
          {/* The beacon is using the popover component to position itself */}
          <div
            ref={beaconRef}
            className={beaconStyles(prefersReducedMotion, darkMode)}
          >
            <div />
          </div>

          {/* The tooltip is using the ref of the beacon as the trigger to position itself against */}
          {/* Instead of passing the beacon as the tooltip trigger prop we pass a reference to the beacon to the `refEl` prop. By passing only the reference we avoid default tooltip behaviors such as closing the tooltip on background click or showing and hiding the tooltip on hover. */}
          <TooltipContent
            {...tooltipContentProps}
            refEl={beaconRef}
            open={tooltipOpen}
          >
            {children}
          </TooltipContent>
        </Popover>
      )}
    </>
  );
}

GuideCue.displayName = 'GuideCue';

export default GuideCue;
