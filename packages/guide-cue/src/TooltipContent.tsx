import React from 'react';
import { Options } from 'focus-trap';
import FocusTrap from 'focus-trap-react';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { Theme } from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';
import { Body, Disclaimer } from '@leafygreen-ui/typography';

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

  const focusTrapOptions: Options = {
    clickOutsideDeactivates: true,
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
        <FocusTrap focusTrapOptions={focusTrapOptions}>
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
