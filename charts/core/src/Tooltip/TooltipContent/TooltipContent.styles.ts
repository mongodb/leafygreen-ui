import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

export const getContainerStyles = (theme: Theme) => css`
  width: 261px;
  background: ${color[theme].background[Variant.InversePrimary][
    InteractionState.Default
  ]};
  color: ${color[theme].text[Variant.InverseSecondary][
    InteractionState.Default
  ]};
  padding: ${spacing[150]}px;
  border-radius: ${borderRadius[150]}px;
  font-family: ${fontFamilies.default};
  font-size: 12px;
  line-height: 20px;
  font-weight: ${fontWeights.regular};
`;
