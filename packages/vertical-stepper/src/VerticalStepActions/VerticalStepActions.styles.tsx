import { css, cx } from '@leafygreen-ui/emotion';
import {
  breakpoints,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

export const innerStyles = css`
  overflow: hidden;
`;

export const getBaseStyles = (isCurrent = false) =>
  cx(
    css`
      display: grid;
      transition: grid-template-rows ${transitionDuration.slowest}ms ease-in-out;
      grid-template-rows: 0fr;
      margin-inline-start: -${spacing[200]}px;
    `,
    {
      [css`
        grid-template-rows: 1fr;
      `]: isCurrent,
    },
  );

export const getWrapperStyles = (isCurrent = false) =>
  cx(
    css`
      padding-inline-start: ${spacing[200]}px;
      padding-block-end: 0;
      padding-block-start: ${spacing[200]}px;
      transition: padding-block-end 400ms ease;

      display: flex;
      gap: ${spacing[200]}px;

      @media (max-width: ${breakpoints.Tablet}px) {
        flex-direction: column;
      }
    `,
    {
      [css`
        padding-block-end: ${spacing[200]}px; // Add padding in here so that hover states are not cut off by the overflow
      `]: isCurrent,
    },
  );
