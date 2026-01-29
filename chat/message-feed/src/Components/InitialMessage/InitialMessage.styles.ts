import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration, typeScales } from '@leafygreen-ui/tokens';

const baseOuterWrapperStyles = css`
  display: grid;
  grid-template-rows: 1fr;
  gap: ${spacing[200]}px;
`;

const transitionStyles = css`
  transform-origin: top left;
  transition-property: grid-template-rows, opacity, transform;
  transition-duration: ${transitionDuration.slower}ms;
  transition-timing-function: ease-out;
`;

const hiddenWrapperStyles = css`
  grid-template-rows: 0fr;
  opacity: 0;
  transform: scale(0.8);
`;

export const getWrapperStyles = ({ shouldHide }: { shouldHide: boolean }) =>
  cx(baseOuterWrapperStyles, transitionStyles, {
    [hiddenWrapperStyles]: shouldHide,
  });

export const titleStyles = css`
  font-size: ${typeScales.body2.fontSize}px;
  line-height: ${typeScales.body2.lineHeight}px;
`;

export const descriptionStyles = css`
  margin-block-end: ${spacing[400]}px;
`;

export const innerWrapperStyles = css`
  overflow: hidden;
`;
