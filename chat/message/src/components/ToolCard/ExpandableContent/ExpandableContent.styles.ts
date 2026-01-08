import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

const LG_MARKDOWN_CODE_MAX_HEIGHT = 220;
const TRANSITION_DURATION = transitionDuration.slower;

const baseContentWrapperStyles = css`
  padding: 0 ${spacing[300]}px;
  display: grid;
  transition-property: grid-template-rows, opacity, padding, visibility;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;

  pre {
    max-height: ${LG_MARKDOWN_CODE_MAX_HEIGHT}px;
  }
`;

const expandedContentWrapperStyles = css`
  padding: ${spacing[300]}px;
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
`;

export const getContentWrapperStyles = ({
  className,
  isExpanded,
}: {
  className?: string;
  isExpanded: boolean;
}) =>
  cx(
    baseContentWrapperStyles,
    {
      [expandedContentWrapperStyles]: isExpanded,
    },
    className,
  );

export const innerContentWrapperStyles = css`
  overflow: hidden;
  min-height: 0;
`;
