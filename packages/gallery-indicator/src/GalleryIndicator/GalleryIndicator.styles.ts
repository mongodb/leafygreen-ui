import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing, transitionDuration } from '@leafygreen-ui/tokens';

const TRANSITION_DURATION_SLOW = transitionDuration.slower;
const TRANSITION_DURATION_DEFAULT = transitionDuration.default;
const DOT_SIZE = 6;
const ACTIVE_DOT_SIZE = 20;

export const getGalleryIndicatorStyles = ({
  className,
}: {
  className?: string;
}) =>
  cx(
    css`
      all: unset;
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: flex;
      gap: ${spacing[100]}px;
    `,
    className,
  );

export const getIndicatorStyles = ({
  theme,
  isActive,
}: {
  theme: Theme;
  isActive: boolean;
}) =>
  cx(
    css`
      &::after {
        content: '';
        display: block;
        width: ${DOT_SIZE}px;
        height: ${DOT_SIZE}px;
        background-color: ${theme === Theme.Light
          ? palette.gray.light2
          : palette.gray.dark2};
        border-radius: 50%;
        transition-property: background-color, width, border-radius;
        transition-duration: ${TRANSITION_DURATION_SLOW}ms,
          ${TRANSITION_DURATION_DEFAULT}ms, ${TRANSITION_DURATION_DEFAULT}ms;
        transition-timing-function: ease-in-out;
      }
    `,
    {
      [css`
        &::after {
          width: ${ACTIVE_DOT_SIZE}px;
          border-radius: 100px;
          background-color: ${color[theme].icon.secondary.default};
        }
      `]: isActive,
    },
  );
