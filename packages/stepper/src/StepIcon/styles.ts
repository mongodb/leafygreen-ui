import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';
import { Theme } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import { StepStates } from '../types';

export const baseStyles = (size: number) => css`
  width: ${size}px;
  height: ${size}px;
  box-sizing: content-box;
  margin-bottom: ${spacing[1]}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  transition: ${transitionDuration.slower}ms box-shadow ease;
  z-index: 1;

  svg {
    width: 100%;
  }
`;

// Light Mode Styles
const completedStyles = css`
  color: ${palette.white};
  border-color: ${palette.green.dark1};
  background-color: ${palette.green.dark1};
`;

const currentStyles = css`
  color: ${palette.green.dark2};
  background-color: ${palette.white};
  border-color: ${palette.green.dark1};
`;

const upcomingStyles = css`
  color: ${palette.gray.dark1};
  background-color: ${palette.white};
  border-color: ${palette.gray.dark1};
`;

// Dark Mode Styles
const darkCompletedStyles = css`
  color: ${palette.black};
  border-color: ${palette.green.base};
  background-color: ${palette.green.base};
`;

const darkCurrentStyles = css`
  color: ${palette.green.base};
  background-color: ${palette.black};
  border-color: ${palette.green.base};
`;

const darkUpcomingStyles = css`
  color: ${palette.gray.light1};
  background-color: ${palette.black};
  border-color: ${palette.gray.light1};
`;

export const styles = {
  [Theme.Dark]: {
    [StepStates.CompletedMultiple]: darkCompletedStyles,
    [StepStates.Completed]: darkCompletedStyles,
    [StepStates.Current]: darkCurrentStyles,
    [StepStates.Upcoming]: darkUpcomingStyles,
    [StepStates.UpcomingMultiple]: darkUpcomingStyles,
  },
  [Theme.Light]: {
    [StepStates.CompletedMultiple]: completedStyles,
    [StepStates.Completed]: completedStyles,
    [StepStates.Current]: currentStyles,
    [StepStates.Upcoming]: upcomingStyles,
    [StepStates.UpcomingMultiple]: upcomingStyles,
  },
};
