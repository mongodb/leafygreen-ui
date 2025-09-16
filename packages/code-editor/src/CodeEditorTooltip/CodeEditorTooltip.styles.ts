import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  shadow,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const TOOLTIP_WIDTH = 514;

export const getTooltipStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  border-radius: ${borderRadius[200]}px;
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  box-shadow: ${shadow[theme][100]};
  padding: ${spacing[100]}px;
  width: ${TOOLTIP_WIDTH}px;
`;

export const tooltipCodeStyles = css`
  border: none;
`;
