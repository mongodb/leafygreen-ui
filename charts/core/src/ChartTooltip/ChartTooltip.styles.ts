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

export const getRootStylesText = (theme: Theme) => `
  width: 261px;
  overflow-y: auto;
  background: ${
    color[theme].background[Variant.InversePrimary][InteractionState.Default]
  };
  color: ${color[theme].text[Variant.InversePrimary][InteractionState.Default]};
  padding: ${spacing[150]}px;
  border-radius: ${borderRadius[150]}px;
  font-family: ${fontFamilies.default};
  font-size: 12px;
  line-height: 20px;
  font-weight: ${fontWeights.regular};
`;
