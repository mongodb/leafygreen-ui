import React, { PropsWithChildren } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { StepStates, InternalStepProps } from './types';
import StepIcon from './StepIcon';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { useStepperContext } from './StepperContext';
import StepLabel from './StepLabel';
import { stepIconClassName } from './constants';

const Step = ({
  children,
  index,
  state,
  ariaLabel = `step${index || ''}`,
  shouldDisplayLine = true,
  iconSize = 20,
  className,
  ...rest
}: PropsWithChildren<InternalStepProps & React.HTMLProps<HTMLDivElement>>) => {
  const { isDarkMode } = useStepperContext();
  const isCurrent = state === StepStates.Current;
  const isCompleted =
    state === StepStates.Completed || state === StepStates.CompletedMultiple;

  const baseStyles = css`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    padding-bottom: ${spacing[1]}px;
    position: relative; // for the :after line

    &:focus-visible {
      outline: none;
      .${stepIconClassName} {
        // TODO: should use box-shadow utility for this.
        box-shadow: 0px 0px 0px 2px
            ${isDarkMode ? palette.black : palette.white},
          0px 0px 0px 4px ${palette.blue.light1};
      }
    }
  `;

  const lineStyles = css`
    &:after {
      content: '';
      height: 1px;
      width: 100%;
      position: absolute;
      top: ${iconSize / 2}px;
      left: 50%;
      z-index: 0;
      background-color: ${isDarkMode ? palette.gray.light1 : palette.gray.base};
    }
  `;

  const completedLineStyles = css`
    &:after {
      background-color: ${isDarkMode
        ? palette.green.base
        : palette.green.dark1};
    }
  `;

  return (
    <div
      className={cx(
        baseStyles,
        {
          [lineStyles]: shouldDisplayLine,
          [completedLineStyles]: isCompleted && shouldDisplayLine,
        },
        className,
      )}
      aria-label={ariaLabel}
      aria-current={isCurrent && 'step'}
      {...rest}
    >
      <StepIcon state={state} content={index} size={iconSize} />
      <StepLabel state={state}>{children}</StepLabel>
    </div>
  );
};

export default Step;
