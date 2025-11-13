import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const getBaseTitleBarStyles = (theme: Theme) => css`
  width: 100%;
  border-bottom: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  background-color: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  padding: 14px ${spacing[400]}px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const getTitleBarStyles = ({
  className,
  theme,
}: {
  theme: Theme;
  className?: string;
}) => {
  return cx(getBaseTitleBarStyles(theme), className);
};
