import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip, { TooltipProps } from '@leafygreen-ui/tooltip';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';
import XIcon from '@leafygreen-ui/icon/dist/X';
import Button from '@leafygreen-ui/button';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import FocusTrap from 'focus-trap-react';

// Exclude these from tooltip (tooltip already extends popover props)
type ModifiedTooltipProps = Omit<
  TooltipProps,
  | 'active'
  | 'usePortal'
  | 'justify'
  | 'align'
  | 'refEl'
  | 'onClick'
  | 'trigger'
  | 'triggerEvent'
  | 'shouldClose'
  | 'className'
  | 'children'
  | 'open'
  | 'setOpen'
>;

interface TooltipGuideProps extends ModifiedTooltipProps {
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
   * Used to display the number of steps. If `numberOfSteps` is <= 1 then the step will not show
   * @default: 1
   */
  numberOfSteps?: number;
  /**
   * Used to display the current step.
   * @default: 1
   */
  currentStep?: number;
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
   * ClassName to be applied to the portal element.
   */
  portalClassName?: string;
  /**
   * Text to appear inside the button
   */
  buttonText: string;
  /**
   * Callback fired when dismiss button is clicked
   */
  onClose?: () => void;
  /**
   * Callback fired when 'next' button is clicked
   * TODO: better description
   */
  onButtonClick?: () => void;
  /**
   * Determines the alignment of the tooltip.
   * @default: 'top'
   */
  tooltipAlign?: Exclude<Align, 'center-vertical' | 'center-horizontal'>;
  /**
   * Determines the justification of the tooltip if it is a standalone tooltip.
   * @default: 'middle'
   */
  tooltipJustify?: Justify;
  /**
   * Determines the alignment of the beacon. This is only applied when `numberOfSteps` is greater than `1`.
   * @default: 'center-horizontal'
   */
  beaconAlign?: Align;
};

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
 * @param props.tooltipAlign Determines the alignment of the tooltip.
 * @param props.beaconAlign Determines the alignment of the beacon. This is only applied when `numberOfSteps` is greater than `1`.
 */

function TooltipGuide({
  open,
  setOpen,
  refEl,
  numberOfSteps = 1,
  currentStep = 1,
  darkMode: darkModeProp,
  title,
  description,
  onClose = () => {},
  onButtonClick = () => {},
  tooltipClassName,
  portalClassName,
  buttonText,
  tooltipAlign = Align.Top,
  tooltipJustify = Justify.Middle,
  beaconAlign = Align.CenterHorizontal,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  ...rest
}: TooltipGuideProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  // TODO: checks

  useEffect(() => {
    if (open) {
      // Adding a timeout to the tooltip so the tooltip is positioned correctly. Without the delay the tooltip can sometime shift when it is first visible. Only applies to multipstep tooltip.
      setPopoverOpen(true);
      setTimeout(() => setTooltipOpen(true), 400);
    } else {
      // Adding a timeout to the popover because if we close both the tooltip and the popover at the same time the transition is not visible. Only applies to multipstep tooltip.
      setTooltipOpen(false);
      setTimeout(() => setPopoverOpen(false), 200);
    }
  }, [open]);

  // Warning if current step is larger than number of steps

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleButtonClick = () => {
    setOpen(o => !o);
    onButtonClick();
  };

  const renderContent = () => (
    <div className={contentStyles}>
      <Body className={cx(bodyThemeStyles[theme], bodyTitleStyles)}>
        <strong>{title}</strong>
      </Body>
      <Body className={bodyThemeStyles[theme]}>{description}</Body>
    </div>
  );

  const renderFooter = () => (
    <Button
      variant="primary"
      onClick={() => handleButtonClick()}
      darkMode={!darkMode}
    >
      {buttonText}
    </Button>
  );

  return (
    <>
      {/* Multistep tooltip */}
      {numberOfSteps > 1 && (
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
            <Tooltip
              darkMode={darkMode}
              open={tooltipOpen}
              justify={Justify.Middle}
              align={tooltipAlign}
              trigger={<div className={beaconStyles}></div>}
              className={cx(tooltipStyles, tooltipClassName)}
              usePortal={false}
              {...rest}
            >
              <FocusTrap>
                <div>
                <IconButton
                  className={closeStyles}
                  aria-label="Close Tooltip"
                  onClick={() => handleClose()}
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
      {numberOfSteps <= 1 && (
        <Tooltip
          darkMode={darkMode}
          open={open}
          // setOpen={setOpen}
          justify={tooltipJustify}
          align={tooltipAlign}
          refEl={refEl}
          className={cx(tooltipStyles, tooltipClassName)}
          portalClassName={portalClassName}
          portalContainer={portalContainer}
          scrollContainer={scrollContainer}
          popoverZIndex={popoverZIndex}
          {...rest}
        >
          <FocusTrap>
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

TooltipGuide.displayName = 'TooltipGuide';

TooltipGuide.propTypes = {
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
  description: PropTypes.string,
  tooltipClassName: PropTypes.string,
  portalClassName: PropTypes.string,
  buttonText: PropTypes.string,
  onClose: PropTypes.func,
  onButtonClick: PropTypes.func,
  tooltipAlign: PropTypes.oneOf(Object.values(Align)),
  beaconAlign: PropTypes.oneOf(Object.values(Align)),
};

export default TooltipGuide;
