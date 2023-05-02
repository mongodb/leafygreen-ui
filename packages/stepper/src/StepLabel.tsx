import React from 'react';
import { PropsWithChildren } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Body } from '@leafygreen-ui/typography';

import { stepLabelClassName } from './constants';
import { useStepperContext } from './StepperContext';
import { StepLabelProps, StepStates } from './types';

const StepLabel = ({ children, state }: PropsWithChildren<StepLabelProps>) => {
  const isCurrent = state === StepStates.Current;
  const { isDarkMode } = useStepperContext();

  const completedMultipleStyles = css`
    color: ${isDarkMode ? palette.green.base : palette.green.dark2};
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-underline-position: under;
  `;

  const completedStyles = css`
    color: ${isDarkMode ? palette.green.base : palette.green.dark2};
  `;

  const currentStyles = css`
    color: ${isDarkMode ? palette.gray.light2 : palette.green.dark3};
  `;

  const upcomingStyles = css`
    color: ${isDarkMode ? palette.gray.light1 : palette.gray.dark1};
  `;

  const upcomingMultipleStyles = css`
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-underline-position: under;
    color: ${isDarkMode ? palette.gray.light1 : palette.gray.dark1};
  `;

  const styles: Record<StepStates, string> = {
    [StepStates.CompletedMultiple]: completedMultipleStyles,
    [StepStates.Completed]: completedStyles,
    [StepStates.Current]: currentStyles,
    [StepStates.Upcoming]: upcomingStyles,
    [StepStates.UpcomingMultiple]: upcomingMultipleStyles,
  };

  return (
    <Body
      className={cx(styles[state], stepLabelClassName)}
      weight={isCurrent ? 'medium' : 'regular'}
      as="div"
    >
      {children}
    </Body>
  );
};

export default StepLabel;
