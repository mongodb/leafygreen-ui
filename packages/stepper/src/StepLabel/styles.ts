import { palette } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import { StepStates } from '../types';

const completedMultipleStyles = (darkMode?: boolean) => css`
  color: ${darkMode ? palette.green.base : palette.green.dark2};
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-underline-position: under;
`;

const completedStyles = (darkMode?: boolean) => css`
  color: ${darkMode ? palette.green.base : palette.green.dark2};
`;

const currentStyles = (darkMode?: boolean) => css`
  color: ${darkMode ? palette.gray.light2 : palette.green.dark3};
`;

const upcomingStyles = (darkMode?: boolean) => css`
  color: ${darkMode ? palette.gray.light1 : palette.gray.dark1};
`;

const upcomingMultipleStyles = (darkMode?: boolean) => css`
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-underline-position: under;
  color: ${darkMode ? palette.gray.light1 : palette.gray.dark1};
`;

export const styles: (
  darkMode?: boolean,
) => Record<StepStates, string> = darkMode => ({
  [StepStates.CompletedMultiple]: completedMultipleStyles(darkMode),
  [StepStates.Completed]: completedStyles(darkMode),
  [StepStates.Current]: currentStyles(darkMode),
  [StepStates.Upcoming]: upcomingStyles(darkMode),
  [StepStates.UpcomingMultiple]: upcomingMultipleStyles(darkMode),
});
