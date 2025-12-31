import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

export const getBaseContainerStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  padding: ${spacing[200]}px ${spacing[200]}px ${spacing[300]}px
    ${spacing[300]}px;
  display: flex;
  flex-direction: column;
`;

export const getContainerStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getBaseContainerStyles(theme), className);

export const upperRowStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const titleContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[150]}px;
`;

export const chipsContainerStyles = css`
  padding-top: ${spacing[300]}px;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[200]}px;
`;
