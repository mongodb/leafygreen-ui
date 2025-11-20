import React, { useRef } from 'react';
import { Options } from 'focus-trap';
import FocusTrap from 'focus-trap-react';

import { Button } from '@leafygreen-ui/button';
import XIcon from '@leafygreen-ui/icon/dist/X';
import { IconButton } from '@leafygreen-ui/icon-button';
import { Theme } from '@leafygreen-ui/lib';
import { RenderMode, Tooltip } from '@leafygreen-ui/tooltip';
import { Body, Disclaimer } from '@leafygreen-ui/typography';

import { GuideCueProps } from '../GuideCue/GuideCue.types';

import {
  bodyThemeStyles,
  bodyTitleStyles,
  buttonStyles,
  contentStyles,
  footerStyles,
  getCloseButtonStyle,
  getTooltipStyles,
  stepStyles,
} from './GuideCueTooltip.styles';

const ariaLabelledby = 'guide-cue-label';
const ariaDescribedby = 'guide-cue-desc';

const getFocusTrapOptions = (
  buttonRef: React.RefObject<HTMLButtonElement>,
): Options => ({
  clickOutsideDeactivates: true,
  initialFocus: () => buttonRef.current || false,
  checkCanFocusTrap: async trapContainers => {
    const results = trapContainers.map(trapContainer => {
      return new Promise<void>(resolve => {
        const interval = setInterval(() => {
          if (getComputedStyle(trapContainer).opacity !== '0') {
            resolve();
            clearInterval(interval);
          }
        }, 5);
      });
    });
    // Return a promise that resolves when all the trap containers are able to receive focus
    return Promise.all(results).then(() => undefined);
  },
});

type GuideCueTooltipProps = Partial<GuideCueProps> & {
  theme: Theme;
  title: string;
  isStandalone: boolean;
  buttonText: string;
  onEscClose: () => void;
  handleButtonClick: () => void;
  handleCloseClick: () => void;
};

function GuideCueTooltip({
  darkMode,
  open,
  setOpen,
  tooltipJustify,
  tooltipAlign,
  refEl,
  theme,
  title,
  isStandalone,
  buttonText,
  numberOfSteps,
  currentStep,
  children,
  tooltipClassName,
  onEscClose,
  handleButtonClick,
  handleCloseClick,
  ...tooltipProps
}: GuideCueTooltipProps) {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Tooltip
        darkMode={darkMode}
        open={open}
        setOpen={setOpen} // setOpen is called when the `Esc` key is pressed. This behavior is handled inside the tooltip component.
        justify={tooltipJustify}
        align={tooltipAlign}
        refEl={refEl}
        className={getTooltipStyles({
          isStandalone,
          tooltipClassName,
        })}
        onClose={onEscClose}
        role="dialog"
        aria-labelledby={ariaLabelledby}
        renderMode={RenderMode.TopLayer}
        {...tooltipProps}
      >
        <FocusTrap focusTrapOptions={getFocusTrapOptions(primaryButtonRef)}>
          <div>
            {!isStandalone && (
              <IconButton
                className={getCloseButtonStyle(darkMode)}
                aria-label="Close Tooltip"
                onClick={handleCloseClick}
                darkMode={!darkMode}
              >
                <XIcon />
              </IconButton>
            )}
            <div className={contentStyles}>
              <Body
                id={ariaLabelledby}
                as="h2"
                className={bodyTitleStyles}
                darkMode={!darkMode}
              >
                <strong>{title}</strong>
              </Body>
              <Body
                as="div"
                className={bodyThemeStyles[theme]}
                id={ariaDescribedby}
              >
                {children}
              </Body>
            </div>
            <div className={footerStyles}>
              {!isStandalone && (
                <Disclaimer className={stepStyles[theme]}>
                  {currentStep} of {numberOfSteps}
                </Disclaimer>
              )}
              <Button
                ref={primaryButtonRef}
                variant="primary"
                onClick={() => handleButtonClick()}
                darkMode={!darkMode}
                className={buttonStyles}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </FocusTrap>
      </Tooltip>
    </>
  );
}

GuideCueTooltip.displayName = 'GuideCueTooltip';
export default GuideCueTooltip;
