import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@leafygreen-ui/tooltip';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';
import XIcon from '@leafygreen-ui/icon/dist/X';
import Button from '@leafygreen-ui/button';
import Popover from '@leafygreen-ui/popover';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

// TODO: other props
// alignment
// close callback
// button callback

interface TooltipGuideProps {
  /**
   * Determines if the `Tooltip` will appear as open or close.
   * @default: false
   */
  open: boolean;
  /**
   * Callback to change the open state of the Tooltip in consuming applications.
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Pass a reference to an element that the blue beacon should be centered against.
   */
  refEl: React.RefObject<HTMLElement>;
  /**
   * Used to display the number of steps.
   */
  numberOfSteps: number;
  /**
   * Used to display the current step.
   */
  currentStep: number;
  /**
   * Detrmiens whether the `Tooltip` will appear in dark mode.
   * @default: false
   */
  darkMode?: boolean;
  /**
   * Title to appear inside of Tooltip.
   */
  title: string;
  /**
   * Description to appear inside of Tooltip.
   */
  description: string;
  /**
   * ClassName to be applied to the tooltip element.
   */
  tooltipClassName?: string;
  /**
   * Text to appear inside the button
   */
  buttonText: string;
}

const tooltipStyles = css`
  padding: 28px 16px 16px;
`;

const beaconStyles = css`
  background: rgba(1, 107, 248, 0.51); //TODO: use transparentize
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    background: rgba(1, 107, 248, 0.17);
    width: 60px;
    height: 60px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;

    animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  @keyframes pulse-ring {
    0% {
      transform: translateX(-50%) translateY(-50%) scale(0.73);
    }
    100% {
      opacity: 0;
    }
  }

`;

const contentStyles = css`
  margin-bottom: 16px;
`;

const footerStyles = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const bodyThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
  `,
};

const bodyTitleStyles = css`
  + p {
    margin-top: 4px;
  }
`;

const closeStyles = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;

// TODO: reduce motion

/**
 * @param props.title Title to appear inside of Tooltip.
 * @param props.description Description to appear inside of Tooltip.
 * @param props.open Determines if the `Tooltip` will appear as open or close.
 * @param props.setOpen Callback to change the open state of the Tooltip in consuming applications.
 * @param props.darkMode Detrmiens whether the `Tooltip` will appear in dark mode.
 * @param props.className Classname applied to .
 * @param props.refEl Pass a reference to an element that the blue beacon should be centered against.
 * @param props.currentStep Used to display the current step.
 * @param props.numberOfSteps Used to display the number of steps.
 * @param props.tooltipClassName ClassName to be applied to the tooltip element.
 * @param props.buttonText Text to appear inside the button.
 */

function TooltipGuide({
  open,
  setOpen,
  refEl,
  numberOfSteps,
  currentStep,
  darkMode: darkModeProp,
  title,
  description,
  tooltipClassName,
  buttonText,
}: TooltipGuideProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  //TODO: use state object
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  // TODO: checks

  useEffect(() => {
    if (open) {
      // Adding a timeout to the tooltip so the tooltip is positioned correctly. Without the delay the tooltip can sometime shift when it is first visible.
      setIsPopoverOpen(true);
      setTimeout(() => setIsTooltipOpen(true), 200);
    } else {
      // Adding a timeout to the popover because if we close both the tooltip and the popover at the same time the transition is not visible
      setIsTooltipOpen(false);
      setTimeout(() => setIsPopoverOpen(false), 200);
    }
  }, [open]);

  // TODO: TRAP FOCUS!!!!!!!

  return (
    <Popover
      active={isPopoverOpen}
      refEl={refEl}
      align="center-horizontal"
      justify="middle"
    >
      <Tooltip
        darkMode={darkMode}
        open={isTooltipOpen}
        justify="middle"
        align="top"
        trigger={<div className={beaconStyles}></div>}
        className={cx(tooltipStyles, tooltipClassName)}
      >
        <IconButton
          className={closeStyles}
          aria-label="Close Tooltip"
          onClick={() => setOpen(o => !o)}
          darkMode={!darkMode}
        >
          <XIcon />
        </IconButton>
        <div className={contentStyles}>
          <Body className={cx(bodyThemeStyles[theme], bodyTitleStyles)}>
            <strong>{title}</strong>
          </Body>
          <Body className={bodyThemeStyles[theme]}>{description}</Body>
        </div>
        <div className={footerStyles}>
          {(!!currentStep && !!numberOfSteps) && (
            <Disclaimer>
              {currentStep} of {numberOfSteps}
            </Disclaimer>
          )}
          <Button
            variant="primary"
            onClick={() => setOpen(o => !o)}
            darkMode={!darkMode}
          >
            {buttonText}
          </Button>
        </div>
      </Tooltip>
    </Popover>
  );
}

TooltipGuide.displayName = 'TooltipGuide';

TooltipGuide.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
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
  description: PropTypes.string,
  tooltipClassName: PropTypes.string,
  buttonText: PropTypes.string,
};

export default TooltipGuide;
