import React from 'react';
import FocusTrap from 'focus-trap-react';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { Theme } from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import { useIdAllocator } from '@leafygreen-ui/hooks';

import {
  bodyThemeStyles,
  bodyTitleStyles,
  buttonStyles,
  closeHoverStyles,
  closeStyles,
  contentStyles,
  footerStyles,
  stepStyles,
  tooltipMultistepStyles,
  tooltipStyles,
} from './styles';
import { GuideCueProps } from './types';

const ariaLabelledby = 'guide-cue-label';
const ariaDescribedby = 'guide-cue-desc';

type TooltipContentProps = Partial<GuideCueProps> & {
  theme: Theme;
  title: string;
  isStandalone: boolean;
  buttonText: string;
  onEscClose: () => void;
  handleButtonClick: () => void;
  handleCloseClick: () => void;
  usePortal?: boolean;
};

function TooltipContent({
  darkMode,
  open,
  setOpen,
  tooltipJustify,
  tooltipAlign,
  refEl,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
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
  usePortal = true,
  ...tooltipProps
}: TooltipContentProps) {
  const focusId = useIdAllocator({ prefix: 'guide-cue' });
  const focusTrapOptions = {
    clickOutsideDeactivates: true,
    // Without this check focus-trap cannot find a tabbable element. My guess is because of the tooltip animations focus-trap is looking for a tabbale item too early.
    checkCanFocusTrap: (trapContainers: Array<HTMLElement | SVGElement>) => {
      const results = trapContainers.map(() => {
        return new Promise<void>(resolve => {
          const interval = setInterval(() => {
            if (
              document.body.contains(document.getElementById(`#${focusId}`))
            ) {
              resolve();
              clearInterval(interval);
            }
          }, 5);
        });
      });
      // Return a promise that resolves when all the trap containers are able to receive focus
      return Promise.all(results);
    },
  };

  return (
    <>
      <Tooltip
        darkMode={darkMode}
        open={open}
        setOpen={setOpen} // setOpen is called when the `Esc` key is pressed. This behavior is handled inside the tooltip component.
        justify={tooltipJustify}
        align={tooltipAlign}
        refEl={refEl}
        className={cx(
          { [tooltipMultistepStyles]: !isStandalone },
          tooltipStyles,
          tooltipClassName,
        )}
        portalClassName={portalClassName}
        portalContainer={portalContainer}
        scrollContainer={scrollContainer}
        popoverZIndex={popoverZIndex}
        onClose={onEscClose}
        role="dialog"
        aria-labelledby={ariaLabelledby}
        usePortal={usePortal}
        {...tooltipProps}
      >
        {/* https://github.com/focus-trap/focus-trap-react/issues/720 */}
        {/* @ts-expect-error - checkCanFocusTrap throws a type error */}
        <FocusTrap focusTrapOptions={focusTrapOptions} active={open}>
          <div>
            {!isStandalone && (
              <IconButton
                className={cx(closeStyles, { [closeHoverStyles]: darkMode })}
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
                variant="primary"
                onClick={() => handleButtonClick()}
                darkMode={!darkMode}
                className={buttonStyles}
                id={focusId}
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

TooltipContent.displayName = 'TooltipContent';
export default TooltipContent;
