import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@leafygreen-ui/tooltip';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';
import XIcon from '@leafygreen-ui/icon/dist/X';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import { Disclaimer } from '@leafygreen-ui/typography';
import FocusTrap from 'focus-trap-react';
import {
  beaconStyles,
  closeStyles,
  footerStyles,
  tooltipStyles,
} from './styles';
import { GuidecueProps } from './types';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { PrimaryButton, Content } from './';

const focusClassName = createUniqueClassName('guidecue');

// TODO: reduce motion

function Guidecue({
  open,
  setOpen,
  refEl,
  numberOfSteps = 1,
  currentStep = 1,
  darkMode: darkModeProp,
  title,
  children,
  onClose = () => {},
  onButtonClick = () => {},
  tooltipClassName,
  portalClassName,
  buttonText: buttonTextProp,
  tooltipAlign = Align.Top,
  tooltipJustify = Justify.Middle,
  beaconAlign = Align.CenterHorizontal,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  ...tooltipProps
}: GuidecueProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const beaconRef = useRef<HTMLDivElement | null>(null);

  const ariaLabelledby = 'guidecue-label';
  const ariaDescribedby = 'guidecue-desc';

  /**
   * Determines the button text. If there is nothing passed then default text will show depending on the numberOfSteps.
   */
  const buttonText = buttonTextProp
    ? buttonTextProp
    : currentStep === numberOfSteps
    ? 'Got it'
    : 'Next';

  /**
   * Determines if the stand-alone tooltip should be shown. If there are multiple steps the guided multipstep tooltip will be shown.
   */
  const isStandalone = numberOfSteps <= 1;

  useEffect(() => {
    let openTimeout: NodeJS.Timeout, closeTimeout: NodeJS.Timeout;

    if (open) {
      // Adding a timeout to the tooltip so the tooltip is positioned correctly. Without the delay the tooltip can sometime shift when it is first visible. Only applies to guided multistep tooltip.
      setPopoverOpen(true); // beacon opens first
      openTimeout = setTimeout(() => setTooltipOpen(true), 400); // tooltip opens a little after
    } else {
      // Adding a timeout to the popover because if we close both the tooltip and the popover at the same time the transition is not visible. Only applies to guided multistep tooltip.
      setTooltipOpen(false); // tooltip closes first
      closeTimeout = setTimeout(() => setPopoverOpen(false), 200); // beacon closes a little after
    }

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, [open]);

  //TODO: Warning if current step is larger than number of steps

  /**
   * Callback fired when the x icon is clicked. It closes the tooltip and fires the callback that was passed to `onClose`.
   */
  const handleCloseClick = () => {
    setOpen(false);
    onClose();
  };

  /**
   * Callback fired when the primary bottom is clicked. It closes the tooltip and fires the callback that was passed to `onButtonClick`.
   */
  const handleButtonClick = () => {
    setOpen(false);
    onButtonClick();
  };

  /**
   * This callback is fired when the Esc key closes the tooltip since this happens directly in the `Tooltip` component. If this is a stand-alone tooltip then we use the callback for the primary button(`onButtonClick`) since that is the callback that would be fired if the primary button was clicked. If it's the guided multi-step tooltip we use the callback from the close icon button(`onClose`) since thats the callback that would be fired if the close icon was clicked.
   */
  const onEscCloseCallback = isStandalone ? onButtonClick : onClose;

  // Test are failing because of `focus-trap-react`. Even though there is a focusable element it does not find it in time and throws an error. A fix is to point to the primary button and set that as the fallback focus. (https://github.com/focus-trap/focus-trap-react/issues/91)
  const focusTrapOptions = { fallbackFocus: `.${focusClassName}` };

  return (
    <>
      {/* Guided multistep tooltip */}
      {!isStandalone && (
        <Popover
          active={popoverOpen}
          refEl={refEl}
          align={beaconAlign}
          justify={Justify.Middle}
          spacing={-12}
          portalClassName={portalClassName}
          portalContainer={portalContainer}
          scrollContainer={scrollContainer}
          adjustOnMutation={true}
          popoverZIndex={popoverZIndex}
          className={portalClassName}
        >
          {/* The beacon is using the popover component to position itself */}
          {/* Instead of passing this as the tooltip trigger prop we instead pass the reference so that the default behavior of closing the tooltip on background click or showing and hiding the tooltip on hover does not happen */}
          <div ref={beaconRef} className={beaconStyles} />
          {/* The tooltip is using the ref of the beacon as the trigger to position itself against */}
          <Tooltip
            darkMode={darkMode}
            open={tooltipOpen}
            setOpen={setOpen}
            justify={tooltipJustify}
            align={tooltipAlign}
            refEl={beaconRef}
            className={cx(tooltipStyles, tooltipClassName)}
            usePortal={false}
            onClose={() => onEscCloseCallback()}
            role="dialog"
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            {...tooltipProps}
          >
            <FocusTrap focusTrapOptions={focusTrapOptions}>
              <div>
                <IconButton
                  className={closeStyles}
                  aria-label="Close Tooltip"
                  onClick={() => handleCloseClick()}
                  darkMode={!darkMode}
                >
                  <XIcon />
                </IconButton>
                <Content
                  theme={theme}
                  title={title}
                  ariaLabelledby={ariaLabelledby}
                  ariaDescribedby={ariaDescribedby}
                >
                  {children}
                </Content>
                <div className={footerStyles}>
                  <Disclaimer>
                    {currentStep} of {numberOfSteps}
                  </Disclaimer>
                  <PrimaryButton
                    buttonText={buttonText}
                    handleButtonClick={handleButtonClick}
                    focusClassName={focusClassName}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </FocusTrap>
          </Tooltip>
        </Popover>
      )}
      {/* Standalone tooltip */}
      {/* this is using the ref of the `refEl` prop to position itself against  */}
      {isStandalone && (
        <Tooltip
          darkMode={darkMode}
          open={open}
          setOpen={setOpen}
          justify={tooltipJustify}
          align={tooltipAlign}
          refEl={refEl}
          className={cx(tooltipClassName)}
          portalClassName={portalClassName}
          portalContainer={portalContainer}
          scrollContainer={scrollContainer}
          popoverZIndex={popoverZIndex}
          onClose={() => onEscCloseCallback()}
          role="dialog"
          aria-labelledby={ariaLabelledby}
          {...tooltipProps}
        >
          <FocusTrap focusTrapOptions={focusTrapOptions}>
            <div>
              <Content
                theme={theme}
                title={title}
                ariaLabelledby={ariaLabelledby}
                ariaDescribedby={ariaDescribedby}
              >
                {children}
              </Content>
              <div className={footerStyles}>
                <PrimaryButton
                  buttonText={buttonText}
                  handleButtonClick={handleButtonClick}
                  focusClassName={focusClassName}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </FocusTrap>
        </Tooltip>
      )}
    </>
  );
}

Guidecue.displayName = 'Guidecue';
// TODO: make sure the correct props are here
Guidecue.propTypes = {
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
  numberOfSteps: PropTypes.number,
  currentStep: PropTypes.number,
  title: PropTypes.string,
  tooltipClassName: PropTypes.string,
  buttonText: PropTypes.string,
  onClose: PropTypes.func,
  onButtonClick: PropTypes.func,
  tooltipAlign: PropTypes.oneOf(Object.values(Align)),
  tooltipJustify: PropTypes.oneOf(Object.values(Justify)),
  beaconAlign: PropTypes.oneOf(Object.values(Align)),
};

export default Guidecue;
