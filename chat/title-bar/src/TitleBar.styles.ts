import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { Align } from './TitleBar.types';

const getBaseTitleBarStyles = (theme: Theme) => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px ${spacing[400]}px;
  border-bottom: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  background-color: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
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

const baseContentContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[200]}px;
`;

const contentAlignmentStyles = css`
  margin: auto;
`;

export const getContentContainerStyles = ({ align }: { align: Align }) =>
  cx(baseContentContainerStyles, {
    [contentAlignmentStyles]: align === Align.Center,
  });
