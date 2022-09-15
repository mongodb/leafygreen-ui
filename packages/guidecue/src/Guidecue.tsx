import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@leafygreen-ui/tooltip';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';
import XIcon from '@leafygreen-ui/icon/dist/X';
import Button from '@leafygreen-ui/button';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import FocusTrap from 'focus-trap-react';
import {
  beaconStyles,
  bodyThemeStyles,
  bodyTitleStyles,
  closeStyles,
  contentStyles,
  footerStyles,
  tooltipStyles,
} from './styles';
import { GuidecueProps } from './types';
import { createUniqueClassName } from '@leafygreen-ui/lib';

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
  ...rest
}: GuidecueProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const beaconRef = useRef<HTMLDivElement | null>(null);

  const ariaLabelledby = 'guidecue';

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
   * Callback fired when the button at the bottom of the tooltip is clicked. It closes the tooltip and fires the callback that was passed to `onButtonClick`.
   */
  const handleButtonClick = () => {
    setOpen(false);
    onButtonClick();
  };

  const renderContent = () => (
    <div className={contentStyles}>
      <Body
        id={ariaLabelledby}
        as="h2"
        className={cx(bodyThemeStyles[theme], bodyTitleStyles)}
      >
        <strong>{title}</strong>
      </Body>
      <Body as="div" className={bodyThemeStyles[theme]}>
        {children}
      </Body>
    </div>
  );

  const renderFooter = () => (
    <Button
      variant="primary"
      onClick={() => handleButtonClick()}
      darkMode={!darkMode}
      className={focusClassName}
    >
      {buttonText}
    </Button>
  );
  /**
   * This callback is fired when the Esc key closes the tooltip since this happens directly in the `Tooltip` component. If this is a stand-alone tooltip then we use the callback for the bottom button(`onButtonClick`) since that is the callback that would be fired if the bottom button was clicked. If it's the guided multistep tooltip we use the callback from the close icon button(`onClose`) since thats the callback that would be fired if the close icon was clicked.
   */
  const onEscCloseCallback = isStandalone ? onButtonClick : onClose;

  // Test are failing because of `focus-trap-react`. Even though there is a focusable element in the dialog it does not find it in time and throws an error. A fix is to add a classname to the primary button and set that as the fallback focus.
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
            justify={Justify.Middle}
            align={tooltipAlign}
            refEl={beaconRef}
            className={cx(tooltipStyles, tooltipClassName)}
            usePortal={false}
            onClose={() => onEscCloseCallback()}
            role="dialog"
            aria-labelledby={ariaLabelledby}
            {...rest}
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
                {renderContent()}
                <div className={footerStyles}>
                  <Disclaimer>
                    {currentStep} of {numberOfSteps}
                  </Disclaimer>
                  {renderFooter()}
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
          {...rest}
        >
          <FocusTrap focusTrapOptions={focusTrapOptions}>
            <div>
              {renderContent()}
              <div className={footerStyles}>{renderFooter()}</div>
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
  portalClassName: PropTypes.string,
  buttonText: PropTypes.string,
  onClose: PropTypes.func,
  onButtonClick: PropTypes.func,
  tooltipAlign: PropTypes.oneOf(Object.values(Align)),
  beaconAlign: PropTypes.oneOf(Object.values(Align)),
};

export default Guidecue;
