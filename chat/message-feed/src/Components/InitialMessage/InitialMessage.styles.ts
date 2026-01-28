import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

const baseOuterWrapperStyles = css`
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr;
  gap: ${spacing[200]}px;
`;

const transitionStyles = css`
  transform-origin: bottom right;
  transition-property: grid-template-rows, opacity, transform;
  transition-duration: ${transitionDuration.slower}ms;
  transition-timing-function: ease-out;
`;

const hiddenWrapperStyles = css`
  grid-template-rows: 0fr;
  opacity: 0;
  transform: scale(0.8);
`;

export const getWrapperStyles = ({
  shouldHide,
  className,
}: {
  className?: string;
  shouldHide: boolean;
}) =>
  cx(
    baseOuterWrapperStyles,
    transitionStyles,
    {
      [hiddenWrapperStyles]: shouldHide,
    },
    className,
  );
