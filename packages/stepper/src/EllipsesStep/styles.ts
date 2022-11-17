import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { stepIconClassName } from '../constants';
import { StepStates } from '../types';
import { EllipsesStepStates } from './types';

// TODO: would be good to put these styles inside a baseStyles, but it is currently impossible because the <Tooltip> content is an iframe.
export const tooltipStyles = css`
  // TODO: this is an arbitrary value. It would be nice to have a separate component for <ol> that handles this spacing.
  padding-inline-start: ${spacing[4]}px;
`;

const completedMultipleStyles = (darkMode?: boolean) => css`
  &:hover .${stepIconClassName} {
    // TODO: use centralized box-shadow value
    box-shadow: 0px 0px 0px 3px
      ${darkMode ? palette.green.dark1 : palette.green.light2};
  }
`;

const upcomingMultipleStyles = (darkMode?: boolean) => css`
  &:hover .${stepIconClassName} {
    // TODO: use centralized box-shadow value
    box-shadow: 0px 0px 0px 3px
      ${darkMode ? palette.gray.dark2 : palette.gray.light2};
  }
`;

export const stepStyles: (
  darkMode?: boolean,
) => Record<EllipsesStepStates, string> = darkMode => ({
  [StepStates.CompletedMultiple]: completedMultipleStyles(darkMode),
  [StepStates.UpcomingMultiple]: upcomingMultipleStyles(darkMode),
});
