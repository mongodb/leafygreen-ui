import React, { PropsWithChildren } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { StepStates, InternalStepProps } from './types';
import StepIcon from './StepIcon';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';
import { useStepperContext } from './StepperContext';

export const Step = function Step({
  children,
  index,
  state,
  ariaLabel = `step${index || ''}`,
  shouldDisplayLine = true,
  iconSize = 20,
  className,
  ...rest
}: PropsWithChildren<InternalStepProps & React.HTMLProps<HTMLDivElement>>) {
  const {
    isDarkMode,
    stepIconClassName,
    stepLabelClassName,
  } = useStepperContext();
  const isCurrent = state === StepStates.Current;

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

    ${shouldDisplayLine &&
    css`
      &:after {
        content: '';
        height: 1px;
        width: 100%;
        position: absolute;
        top: ${iconSize / 2}px;
        left: 50%;
        z-index: 0;
        background-color: ${isDarkMode
          ? palette.gray.light1
          : palette.gray.base};
      }
    `}
  `;

  const completedMultipleStyles = css`
    .${stepLabelClassName} {
      color: ${isDarkMode ? palette.green.base : palette.green.dark2};
      text-decoration-line: underline;
      text-decoration-style: dotted;
      text-underline-position: under;
    }

    ${shouldDisplayLine &&
    `
        &:after {
          background-color: ${
            isDarkMode ? palette.green.base : palette.green.dark1
          };
        }
      `}
  `;

  const completedStyles = css`
    .${stepLabelClassName} {
      color: ${isDarkMode ? palette.green.base : palette.green.dark2};
    }

    ${shouldDisplayLine &&
    `
        &:after {
          background-color: ${
            isDarkMode ? palette.green.base : palette.green.dark1
          };
        }
      `}
  `;

  const currentStyles = css`
    .${stepLabelClassName} {
      color: ${isDarkMode ? palette.white : palette.green.dark3};
    }
  `;

  const upcomingStyles = css`
    .${stepLabelClassName} {
      color: ${isDarkMode ? palette.gray.light1 : palette.gray.dark1};
    }
  `;

  const upcomingMultipleStyles = css`
    .${stepLabelClassName} {
      text-decoration-line: underline;
      text-decoration-style: dotted;
      text-underline-position: under;
      color: ${isDarkMode ? palette.gray.light1 : palette.gray.dark1};
    }
  `;

  const styles: Record<StepStates, string> = {
    [StepStates.CompletedMultiple]: completedMultipleStyles,
    [StepStates.Completed]: completedStyles,
    [StepStates.Current]: currentStyles,
    [StepStates.Upcoming]: upcomingStyles,
    [StepStates.UpcomingMultiple]: upcomingMultipleStyles,
  };

  return (
    <div
      className={cx(baseStyles, styles[state], className)}
      aria-label={ariaLabel}
      aria-current={isCurrent && 'step'}
      {...rest}
    >
      <StepIcon state={state} content={index} size={iconSize} />
      {/*
        TODO: Would prefer to use a centralized font-weight value directly in css so it's not dependent on a ternary operator.
        Currently using the <Body> component with the `weight` prop since this is currently the only way to use a reusable variable.
      */}
      <Body
        className={stepLabelClassName}
        weight={isCurrent ? 'medium' : 'regular'}
      >
        {children}
      </Body>
    </div>
  );
};

export default Step;
