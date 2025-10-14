import { css, cx } from '@leafygreen-ui/emotion';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const transitionDurations = {
  expand: transitionDuration.slower,
  focusOrHover: transitionDuration.faster,
};

const containerStyles = css`
  width: 100%;
`;

export const getStyles = (className?: string) => cx(containerStyles, className);
