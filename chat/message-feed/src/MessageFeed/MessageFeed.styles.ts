import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, Side, spacing } from '@leafygreen-ui/tokens';

const baseWrapperStyles = css`
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const getWrapperStyles = ({
  className,
  hasBottomShadow,
  hasTopShadow,
  theme,
}: {
  className?: string;
  hasBottomShadow: boolean;
  hasTopShadow: boolean;
  theme: Theme;
}) =>
  cx(
    baseWrapperStyles,
    {
      [addOverflowShadow({ side: Side.Top, theme, isInside: true })]:
        hasTopShadow,
      [addOverflowShadow({ side: Side.Bottom, theme, isInside: true })]:
        hasBottomShadow,
    },
    className,
  );

export const scrollContainerStyles = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  position: relative;
  padding: 0 ${spacing[400]}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[400]}px;
`;

// Ensures the intercept element is visible and considered by the browser
export const interceptStyles = css`
  min-height: 1px;
`;
