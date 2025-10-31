import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { gridAreas } from '../constants';

const getBaseContainerStyles = (theme: Theme) => css`
  grid-area: ${gridAreas.sideNav};
  background: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  border-right: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const getContainerStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getBaseContainerStyles(theme), className);
