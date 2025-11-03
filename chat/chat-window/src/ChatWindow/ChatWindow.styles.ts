import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  boxShadows,
  breakpoints,
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getSpaciousContainerStyles = (theme: Theme) => css`
  border-radius: ${borderRadius[200]}px;
  overflow: hidden;
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  box-shadow: ${boxShadows[theme][3]};
  background-color: ${theme === Theme.Dark
    ? palette.black
    : palette.gray.light3};
`;

export const getContainerStyles = ({
  className,
  isCompact,
  theme,
}: {
  className?: string;
  isCompact: boolean;
  theme: Theme;
}) =>
  cx(
    baseContainerStyles,
    {
      [getSpaciousContainerStyles(theme)]: !isCompact,
    },
    className,
  );

export const hiddenSpacerStyles = css`
  flex: 1;
`;

const baseInputBarWrapperStyles = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const compactInputBarWrapperStyles = css`
  padding: 0 ${spacing[400]}px ${spacing[400]}px;
`;

const spaciousInputBarWrapperStyles = css`
  padding: ${spacing[400]}px ${spacing[800]}px ${spacing[800]}px;
`;

const spaciousInputBarWrapperMobileStyles = css`
  padding-top: ${spacing[200]}px;
`;

export const getInputBarWrapperStyles = ({
  isCompact,
  isMobile,
}: {
  isCompact: boolean;
  isMobile: boolean;
}) =>
  cx(baseInputBarWrapperStyles, {
    [compactInputBarWrapperStyles]: isCompact,
    [spaciousInputBarWrapperStyles]: !isCompact,
    [spaciousInputBarWrapperMobileStyles]: !isCompact && isMobile,
  });

const baseInputBarStyles = css`
  width: 100%;
`;

const spaciousInputBarStyles = css`
  max-width: ${breakpoints.Tablet}px;
`;

export const getInputBarStyles = (isCompact: boolean) =>
  cx(baseInputBarStyles, {
    [spaciousInputBarStyles]: !isCompact,
  });
