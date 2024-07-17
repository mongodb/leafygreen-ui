import { css } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const innerStyles = css`
  overflow: hidden;
`;

export const getBaseStyles = (isCurrent = false) => css`
  display: grid;
  transition: grid-template-rows ${transitionDuration.slowest}ms ease-in-out;
  grid-template-rows: 0fr;
  margin-inline-start: -${spacing[200]}px;

  ${isCurrent &&
  css`
    grid-template-rows: 1fr;
  `}
`;

export const getWrapperStyles = (isCurrent = false) => css`
  padding-inline-start: ${spacing[200]}px;
  padding-block-end: 0;
  padding-block-start: ${spacing[200]}px;
  transition: padding-block-end 400ms ease;

  display: flex;
  gap: ${spacing[200]}px;

  ${isCurrent &&
  css`
    padding-block-end: ${spacing[200]}px; // Add padding in here so that hover states are not cut off by the overflow
  `}
`;
