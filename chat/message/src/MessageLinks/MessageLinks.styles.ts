import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const headerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

const baseIconStyles = css`
  transition: transform ${transitionDuration.slower}ms ease-in-out;
  transform: rotate(0deg);
`;

const expandedIconStyles = css`
  transform: rotate(180deg);
`;

export const getIconStyles = (isExpanded: boolean) =>
  cx(baseIconStyles, {
    [expandedIconStyles]: isExpanded,
  });

const baseLinksWrapperStyles = css`
  /* overflow: hidden; */
  padding-top: ${spacing[50]}px;
  transition-property: height, opacity, visibility;
  transition-duration: ${transitionDuration.slower}ms;
  transition-timing-function: ease-in-out;

  /* Default collapsed state */
  height: 0;
  opacity: 0;
  visibility: hidden;
`;

const getExpandedLinksWrapperStyles = (height: number) => css`
  height: ${height}px;
  opacity: 1;
  visibility: visible;
`;

export const getLinksWrapperStyles = ({
  isExpanded,
  height,
}: {
  isExpanded: boolean;
  height: number;
}) =>
  cx(baseLinksWrapperStyles, {
    [getExpandedLinksWrapperStyles(height)]: isExpanded,
  });
