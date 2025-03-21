import React from 'react';
import { Options } from 'focus-trap';
import FocusTrap from 'focus-trap-react';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { Theme } from '@leafygreen-ui/lib';
import Tooltip, { RenderMode } from '@leafygreen-ui/tooltip';
import { Body, Disclaimer } from '@leafygreen-ui/typography';

import { GuideCueProps } from '../GuideCue/GuideCue.types';

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
} from './TooltipContent.styles';

const ariaLabelledby = 'guide-cue-label';
const ariaDescribedby = 'guide-cue-desc';

const focusTrapOptions: Options = {
  clickOutsideDeactivates: true,
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
};

type TooltipContentProps = Partial<GuideCueProps> & {
  theme: Theme;
  title: string;
  isStandalone: boolean;
  buttonText: string;
  onEscClose: () => void;
  handleButtonClick: () => void;
  handleCloseClick: () => void;
};

function TooltipContent({
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
}: TooltipContentProps) {
  const focusId = useIdAllocator({ prefix: 'guide-cue' });

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
        onClose={onEscClose}
        role="dialog"
        aria-labelledby={ariaLabelledby}
        renderMode={RenderMode.TopLayer}
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
