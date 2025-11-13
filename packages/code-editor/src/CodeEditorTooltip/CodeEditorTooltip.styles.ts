import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  boxShadows,
  color,
  fontFamilies,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const MESSAGE_LINE_HEIGHT = 20;

export const getTooltipStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  border-radius: ${borderRadius[200]}px;
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  box-shadow: ${boxShadows[theme][1]};
  line-height: ${MESSAGE_LINE_HEIGHT}px;
  width: fit-content;
`;

export const tooltipMessageContainerStyles = css`
  padding: ${spacing[100]}px ${spacing[200]}px 0; // Bottom margin added by last message
`;

export const getTooltipMessageStyles = (
  theme: Theme,
  baseFontSize: number,
) => css`
  margin: 0 0 ${spacing[100]}px 0;
  font-family: ${fontFamilies.code};
  font-size: ${baseFontSize}px;
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};
`;

export const getTooltipLinksContainerStyles = (theme: Theme) => css`
  border-top: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  padding: ${spacing[100]}px ${spacing[200]}px;
`;

export const tooltipLinksListStyles = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const tooltipLinksListItemStyles = css`
  display: inline-block;
  margin-right: ${spacing[200]}px;
`;
