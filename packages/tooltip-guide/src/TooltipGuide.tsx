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

interface TooltipGuideProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refEl: React.RefObject<HTMLElement>;
  numberofSteps: number;
  currentStep: number;
  /**
   * Whether the `Tooltip` will appear in dark mode.
   * @default: false
   */
  darkMode?: boolean;
  children?: React.ReactNode;
  title?: string;
  text?: string;
}

const tooltipStyles = css`
  padding: 28px 16px 16px;
`;

const beaconStyles = css`
  background: rgba(1, 107, 248, 0.51);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;
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

const bodyStyles = css`
  //TODO: font size?
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

// TODO: presets
// TODO: next callback?
// TODO: close callback?

/**
 * @param props.children Content to appear inside of Tooltip.
 * @param props.title Title to appear inside of Tooltip.
 * @param props.text Text to appear inside of Tooltip.
 * @param props.open Boolean to describe whether or not Tooltip is open.
 * @param props.setOpen Callback to change the open state of the Tooltip.
 * @param props.darkMode Whether the Tooltip will apepar in dark mode.
 * @param props.className Classname applied to .
 * @param props.refEl A reference to the element against which the beacon component will be positioned.
 * @param props.currentStep Current step to display.
 * @param props.numberOfSteps Used to display all steps.
 */

function TooltipGuide({
  open,
  setOpen,
  refEl,
  numberofSteps,
  currentStep,
  darkMode: darkModeProp,
  children,
  title,
  text,
}: TooltipGuideProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  // TODO: checks

  useEffect(() => {
    if (open) {
      // Adding a timeout to the tooltip so the tooltip is positioned correctly. Without the delay the tooltip can sometime shift when it is visible.
      setIsPopoverOpen(true);
      setTimeout(() => setIsTooltipOpen(true), 200);
    } else {
      // Adding a timeout to the popover because if we close both the tooltip and the popover at the same time the transition is not visible
      setIsTooltipOpen(false);
      setTimeout(() => setIsPopoverOpen(false), 200);
    }
  }, [open]);

  const stepText = currentStep === numberofSteps ? 'Finish' : 'Next';

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
        className={tooltipStyles}
      >
        <IconButton
          className={closeStyles}
          aria-label="Close Tooltip"
          onClick={() => setOpen(o => !o)}
        >
          <XIcon />
        </IconButton>
        <div className={contentStyles}>
          {title && (
            <Body className={cx(bodyThemeStyles[theme], bodyTitleStyles)}>
              <strong>{title}</strong>
            </Body>
          )}
          {text && <Body className={bodyThemeStyles[theme]}>{text}</Body>}
        </div>
        <div className={footerStyles}>
          <Disclaimer>
            {currentStep} of {numberofSteps}
          </Disclaimer>
          <Button variant="primary" onClick={() => setOpen(o => !o)}>
            {stepText}
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
  text: PropTypes.string,
};

export default TooltipGuide;
